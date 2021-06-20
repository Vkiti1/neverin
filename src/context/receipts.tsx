import { createContext, useContext, FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { FReceipt, Receipts } from 'types/index'

interface Props {
  id: string
}

const receiptsContext = createContext<Receipts>({} as Receipts)

export const ReceiptsProvider: FC<Props> = ({ children, id }) => {
  const [orders, setOrders] = useState<FReceipt[]>([])
  const [receipts, setReceipts] = useState<FReceipt[]>([])

  const serveOrder = async (orderId) => {
    try {
      firebaseInstance
        .firestore()
        .collection('shops')
        .doc(id)
        .collection('receipts')
        .doc(orderId)
        .update({
          isServed: true,
        })
    } catch (err) {
      console.error(err)
    }
  }

  const deleteOrder = async (orderId) => {
    try {
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(id)
        .collection('receipts')
        .doc(orderId)
        .delete()
    } catch (err) {
      console.error(err)
    }
  }

  const updateOrder = async (orderId) => {
    try {
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(id)
        .collection('receipts')
        .doc(orderId)
        .update({
          isPaid: true,
        })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const unsubscribe = firebaseInstance
      .firestore()
      .collection('shops')
      .doc(id)
      .collection('receipts')
      .onSnapshot((querySnapshot) => {
        const receipts = querySnapshot.docs
          .filter((docs) => docs.data().isPaid)
          .map((doc) => {
            const docData = doc.data()
            return {
              id: doc.id,
              isPaid: docData.isPaid,
              isServed: docData.isServed,
              timestamp: docData.timestamp.toDate(),
              note: docData.note,
              total: docData.total,
              order: docData.order,
              table: docData.table,
            }
          })
        const orders = querySnapshot.docs
          .filter((docs) => !docs.data().isPaid)
          .map((doc) => {
            const docData = doc.data()
            return {
              id: doc.id,
              isPaid: docData.isPaid,
              isServed: docData.isServed,
              timestamp: docData.timestamp.toDate(),
              note: docData.note,
              total: docData.total,
              order: docData.order,
              table: docData.table,
            }
          })
        setOrders(orders)
        setReceipts(receipts)
      })
    return () => unsubscribe()
  }, [])

  return (
    <receiptsContext.Provider
      value={{ orders, receipts, id, updateOrder, deleteOrder, serveOrder }}
    >
      {children}
    </receiptsContext.Provider>
  )
}

export const useReceipts = () => useContext(receiptsContext)
