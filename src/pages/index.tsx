import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import firebase from 'firebase'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const HomePage: NextPage = () => {
  const [user, setUser] = useState(null)

  const firebaseConfig = {
    apiKey: 'AIzaSyCnWiabUKizgkn2xsOuKhpvMzGaDSrAVWU',
    authDomain: 'neverin-7e235.firebaseapp.com',
    projectId: 'neverin-7e235',
    storageBucket: 'neverin-7e235.appspot.com',
    messagingSenderId: '744169039399',
    appId: '1:744169039399:web:3d348ee5153b7588ef9002',
    measurementId: 'G-9DPVYP3MY8',
  }

  if (firebase.apps.length < 0) {
    firebase.initializeApp(firebaseConfig)
  }

  const login = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword('test@test.com', 'test1234')
    } catch (err) {
      console.error(err)
    }
  }

  const logout = async () => {
    try {
      await firebase.auth().signOut()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((newUser) => setUser(newUser))

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      <Box>
        <Button onClick={user ? logout : login}>
          {user ? 'signOut' : 'signIn'}
        </Button>
      </Box>
    </>
  )
}

export default HomePage
