import { GetServerSideProps, NextPage } from 'next'
import firebase from 'firebase'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { AuthButton } from 'components/AuthButton'

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
  return (
    <>
      <AuthButton />
      {shop.name}
    </>
  )
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
