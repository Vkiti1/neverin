import { createContext, FC, useContext, useState, useEffect } from 'react'
import { useFirebase } from 'context/firebase-instance'
import firebase from 'firebase'

interface AuthContext {
  login: () => Promise<void>
  logout: () => Promise<void>
  user: firebase.User
}

const authContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState(null)

  const firebaseInstance = useFirebase()

  const login = async () => {
    try {
      await firebaseInstance
        .auth()
        .signInWithEmailAndPassword('test@test.com', 'test1234')
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

  useEffect(() => {
    const unsubscribe = firebaseInstance.auth().onAuthStateChanged(setUser)

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <authContext.Provider value={{ logout, login, user }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
