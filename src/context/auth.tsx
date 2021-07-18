import { createContext, FC, useContext, useState, useEffect } from 'react'
import { useFirebase } from 'context/firebase-instance'
import firebase from 'firebase'
import { AuthContext } from 'types'

const authContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider: FC = ({ children }) => {
  const firebaseInstance = useFirebase()
  const [user, setUser] = useState<firebase.User>(
    firebaseInstance.auth().currentUser
  )
  const [anonUser, setAnonUser] = useState<firebase.User>(
    firebaseInstance.auth().currentUser
  )

  const login = async (email: string, password: string) => {
    try {
      const newUser = await firebaseInstance
        .auth()
        .signInWithEmailAndPassword(email, password)
      return newUser.user
    } catch (err) {
      console.error(err)
    }
  }

  const logout = async () => {
    try {
      await firebaseInstance.auth().signOut()
    } catch (err) {
      console.error(err)
    }
  }

  const anonUserSignIn = async () => {
    try {
      const newAnonUser = await firebaseInstance.auth().signInAnonymously()
      setAnonUser(newAnonUser.user)
      return newAnonUser.user
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const unsubscribe = firebaseInstance.auth().onAuthStateChanged(setUser)
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <authContext.Provider
      value={{ logout, login, user, anonUserSignIn, anonUser }}
    >
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
