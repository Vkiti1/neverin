import { createContext, FC, useContext } from 'react'
import firebase from 'firebase'

const firebaseContext = createContext<firebase.app.App>({} as firebase.app.App)

const firebaseConfig = {
  apiKey: 'AIzaSyCnWiabUKizgkn2xsOuKhpvMzGaDSrAVWU',
  authDomain: 'neverin-7e235.firebaseapp.com',
  projectId: 'neverin-7e235',
  storageBucket: 'neverin-7e235.appspot.com',
  messagingSenderId: '744169039399',
  appId: '1:744169039399:web:3d348ee5153b7588ef9002',
  measurementId: 'G-9DPVYP3MY8',
}

export const FirebaseProvider: FC = ({ children }) => {
  const firebaseInstance =
    firebase.apps.length < 1
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app()

  return (
    <firebaseContext.Provider value={firebaseInstance}>
      {children}
    </firebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(firebaseContext)
