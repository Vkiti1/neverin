import { GetServerSideProps, NextPage } from 'next'
import firebase from 'firebase'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { AuthButton } from 'components/AuthButton'
import { AdminMenu } from 'components/AdminMenu'
//import { Receipts } from 'components/Receipts'

interface FShop {
  location: firebase.firestore.GeoPoint
  name: string
  numberOfTables: number
  oib: string
  waiters: string[]
}

interface IShop {
  id: string
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
      <AdminMenu id={shop.id} />
      {/* <Receipts id={shop.id} /> */}
      <AuthButton />
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
  const shopQueryResult = await firebaseInstance
    .firestore()
    .collection('shops')
    .doc(params.id)
    .get()

  const newShop = shopQueryResult.data() as FShop

  return {
    props: {
      shop: {
        id: params.id,
        ...newShop,
        location: {
          lat: newShop.location.latitude,
          long: newShop.location.longitude,
        },
      },
    },
  }
}
