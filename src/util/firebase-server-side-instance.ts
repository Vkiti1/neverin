import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCnWiabUKizgkn2xsOuKhpvMzGaDSrAVWU',
  authDomain: 'neverin-7e235.firebaseapp.com',
  projectId: 'neverin-7e235',
  storageBucket: 'neverin-7e235.appspot.com',
  messagingSenderId: '744169039399',
  appId: '1:744169039399:web:3d348ee5153b7588ef9002',
  measurementId: 'G-9DPVYP3MY8',
}

export const firebaseInstance =
  firebase.apps.length < 1
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()
