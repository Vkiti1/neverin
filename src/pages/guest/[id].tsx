import { GetServerSideProps, NextPage } from 'next'
import { GuestMenu } from 'components/GuestMenu'
import { GuestHeader } from 'components/GuestHeader'
import { ReceiptsProvider } from 'context/receipts'
import { useAuth } from 'context/auth'
import { useEffect } from 'react'

interface Props {
  shopId: string
  table: number
}
const GuestPage: NextPage<Props> = ({ shopId, table }) => {
  const { anonUserAuth } = useAuth()

  useEffect(() => {
    const signIn = async () => {
      const user = await anonUserAuth()
      console.log(user)
      return user
    }
    const unsubscribe = signIn()
  }, [])

  return (
    <ReceiptsProvider shopId={shopId} table={table}>
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
