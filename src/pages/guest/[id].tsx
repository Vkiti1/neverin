import { GetServerSideProps, NextPage } from 'next'
import { GuestMenu } from 'components/GuestMenu'
import { GuestHeader } from 'components/GuestHeader'
import { ReceiptsProvider } from 'context/receipts'

interface Props {
  shopId: string
  table: number
}
const GuestPage: NextPage<Props> = ({ shopId, table }) => {
  return (
    <ReceiptsProvider shopId={shopId}>
      <GuestHeader />
      <GuestMenu shopId={shopId} />
    </ReceiptsProvider>
  )
}

export default GuestPage

interface Params {
  [key: string]: string
  id: string
}

interface Query {
  [key: string]: string
  id: string
  table: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
  query,
}) => {
  const { table } = query as Query

  return {
    props: {
      shopId: params.id,
      table: parseInt(table),
    },
  }
}
