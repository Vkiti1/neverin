import { GetServerSideProps, NextPage } from 'next'
import { useAuth } from 'context/auth'
import firebase from 'firebase'
import { firebaseInstance } from 'util/firebase-server-side-instance'

interface FShop {
  location: firebase.firestore.GeoPoint
  name: string
  numberOfTables: number
  oib: string
  waiters: string[]
}

interface IShop {
  location: { lat: number; long: number }
  name: string
  numberOfTables: number
  oib: string
  waiters: string[]
}

interface Props {
  shop: IShop
}

const Shop: NextPage<Props> = ({ shop }) => {
  const { user } = useAuth()
  return <div>{user ? shop.name : 'odjebi'}</div>
}

export default Shop

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const result = await firebaseInstance
    .firestore()
    .collection('shops')
    .doc('6ohDiz1prA3nmMxF310m')
    .get()

  console.log(result)

  const newShop = result.data() as FShop

  return {
    props: {
      shop: {
        ...newShop,
        location: {
          lat: newShop.location.latitude,
          long: newShop.location.longitude,
        },
      },
    },
  }
}
