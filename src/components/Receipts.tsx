import { FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Text, Flex } from '@chakra-ui/layout'

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
    const fetchReceipts = async () => {
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
    }

    fetchReceipts()
  }, [])

  return (
    <div>
      {receipts.map((receipt) => {
        return receipt.isPaid ? (
          <div>
            <Text>Orders</Text>
            <Flex direction='column'>
              <Text>{receipt.timestamp.toLocaleString()}</Text>
              {receipt.order.map((item) => {
                return (
                  <>
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.quantity}</Text>
                  </>
                )
              })}
              <Text>{receipt.note}</Text>
              <Text>{receipt.table}</Text>
              <Text>{receipt.total}</Text>
            </Flex>
          </div>
        ) : (
          <div>not paid</div>
        )
      })}
    </div>
  )
}
