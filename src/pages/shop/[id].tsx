import { GetServerSideProps, NextPage } from 'next'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Header } from 'components/admin/Header'
import { Orders } from 'components/admin/Orders'
import { ReceiptsProvider } from 'context/receipts'
import { FShop, IShop } from 'types/index'

interface Props {
  shop: IShop
}

const Shop: NextPage<Props> = ({ shop }) => {
  return (
    <>
      <ReceiptsProvider shopId={shop.id}>
        <Header shopName={shop.name} />
        <Orders />
      </ReceiptsProvider>
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
