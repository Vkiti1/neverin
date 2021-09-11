import { createContext, FC, useContext, useState, useEffect } from 'react'
import { useFirebase } from 'context/firebase-instance'
import firebase from 'firebase'
import { AuthContext } from 'types'

const authContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider: FC = ({ children }) => {
  const firebaseInstance = useFirebase()
  const [user, setUser] = useState<firebase.User>()

  const login = async (email: string, password: string) => {
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      const newUser = await firebaseInstance
        .auth()
        .signInWithEmailAndPassword(email, password)
      setUser(newUser.user)
      return newUser.user
    } catch (err) {
      alert('Provided E-mail or password were incorrect, please try again')
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

  const loginAnonymously = async () => {
    try {
      await firebaseInstance.auth().signInAnonymously()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const unsubscribe = firebaseInstance.auth().onAuthStateChanged(setUser)
    return () => unsubscribe()
  }, [firebaseInstance])

  return (
    <authContext.Provider value={{ logout, login, user, loginAnonymously }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
