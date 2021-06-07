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

interface Params {
  [key: string]: string
  id: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const result = await firebaseInstance
    .firestore()
    .collection('shops')
    .doc(params.id)
    .get()

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
