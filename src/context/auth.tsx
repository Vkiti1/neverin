import { createContext, FC, useContext, useState, useEffect } from 'react'
import { useFirebase } from 'context/firebase-instance'
import firebase from 'firebase'
import { AuthContext } from 'types'

const authContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider: FC = ({ children }) => {
  const firebaseInstance = useFirebase()
  const [user, setUser] = useState<firebase.User>()
  const [anonUser, setAnonUser] = useState<firebase.User>()

  const login = async (email: string, password: string) => {
    try {
      const newUser = await firebaseInstance
        .auth()
        .signInWithEmailAndPassword(email, password)
      setUser(newUser.user)
      return newUser.user
    } catch (err) {
      console.error(err)
    }
  }

  const logout = async () => {
    try {
      await firebaseInstance.auth().signOut()
      setUser(null)
    } catch (err) {
      console.error(err)
    }
  }

  const anonUserAuth = async () => {
    try {
      const newAnonUser = await firebaseInstance.auth().signInAnonymously()
      setAnonUser(newAnonUser.user)
      return newAnonUser.user
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <authContext.Provider
      value={{ logout, login, user, anonUserAuth, anonUser }}
    >
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
