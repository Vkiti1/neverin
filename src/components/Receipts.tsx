import { FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Grid, GridItem } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'

interface Props {
  id: string
}

interface Receipt {
  isPaid: boolean
  note: string
  order: Items[]
  timestamp: Date
  total: number
  table: number
}

interface Items {
  name: string
  price: number
  quantity: number
}

export const Receipts: FC<Props> = ({ id }) => {
  const [receipts, setReceipts] = useState<Receipt[]>([])
  useEffect(() => {
    console.log(id)
    const fetchReceipts = async () => {
      try {
        const receiptArray: Receipt[] = []
        await firebaseInstance
          .firestore()
          .collection('shops')
          .doc(id)
          .collection('receipts')
          .onSnapshot((querySnapshot) => {
            querySnapshot.docs.forEach((change) => {
              const changeData = change.data()
              receiptArray.push({
                isPaid: changeData.isPaid,
                timestamp: changeData.timestamp.toDate(),
                note: changeData.note,
                total: changeData.total,
                order: changeData.order,
                table: changeData.table,
              })
            })
          })
        setReceipts(receiptArray)
        console.log(receipts)
      } catch (err) {
        console.error(err)
      } finally {
      }
    }
    fetchReceipts()
  }, [])

  return (
    <Grid
      templateColumns='repeat(3, 1fr)'
      autoRows='auto'
      gap={2}
      h='200px'
      w='500px'
    >
      {receipts.map((receipt) => {
        return (
          <>
            <GridItem colSpan={3}>
              Time: {receipt.timestamp.toLocaleString()}
            </GridItem>
            <GridItem colSpan={3}>Table: {receipt.table}</GridItem>
            <GridItem colSpan={3}>Note: {receipt.note}</GridItem>
            <GridItem colSpan={3}>
              Paid: {receipt.isPaid ? 'paid' : 'not paid'}
            </GridItem>
            <GridItem colSpan={3}>
              {receipt.order.map((item) => {
                return (
                  <Grid templateColumns='repeat(3,1fr)'>
                    <GridItem>Item: {item.name}</GridItem>
                    <GridItem>Price: {item.price}</GridItem>
                    <GridItem>Quantity: {item.quantity}</GridItem>
                  </Grid>
                )
              })}
            </GridItem>
            <GridItem colSpan={3} colStart={2}>
              Total: {receipt.total}
            </GridItem>
          </>
        )
      })}
    </Grid>
  )
}
