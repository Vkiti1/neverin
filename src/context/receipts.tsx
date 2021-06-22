import { createContext, useContext, FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { FReceipt, Receipts, FItem } from 'types/index'

interface Props {
  shopId: string
}

const receiptsContext = createContext<Receipts>({} as Receipts)

export const ReceiptsProvider: FC<Props> = ({ children, shopId }) => {
  const [orders, setOrders] = useState<FReceipt[]>([])
  const [receipts, setReceipts] = useState<FReceipt[]>([])
  const [guestOrder, setGuestOrder] = useState<FItem[]>([])

  const serveOrder = async (orderId: string) => {
    try {
      firebaseInstance
        .firestore()
        .collection('shops')
        .doc(shopId)
        .collection('receipts')
        .doc(orderId)
        .update({
          isServed: true,
        })
    } catch (err) {
      console.error(err)
    }
  }

  const deleteOrder = async (orderId: string) => {
    try {
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(shopId)
        .collection('receipts')
        .doc(orderId)
        .delete()
    } catch (err) {
      console.error(err)
    }
  }

  const updateOrder = async (orderId: string) => {
    try {
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(shopId)
        .collection('receipts')
        .doc(orderId)
        .update({
          isPaid: true,
        })
    } catch (err) {
      console.error(err)
    }
  }

  const postGuestOrder = async () => {}

  const addGuestOrder = (itemPrice: number, itemName: string) => {
    const index = guestOrder.findIndex((order) => order.name === itemName)

    if (index !== -1) {
      const copy = guestOrder.slice()
      copy[index].quantity += 1
      setGuestOrder(copy)
    } else {
      const order = {
        name: itemName,
        price: itemPrice,
        quantity: 1,
      }
      setGuestOrder([...guestOrder, order])
    }
  }

  useEffect(() => {
    const unsubscribe = firebaseInstance
      .firestore()
      .collection('shops')
      .doc(shopId)
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
      value={{
        orders,
        receipts,
        shopId,
        updateOrder,
        deleteOrder,
        serveOrder,
        guestOrder,
        addGuestOrder,
      }}
    >
      {children}
    </receiptsContext.Provider>
  )
}

export const useReceipts = () => useContext(receiptsContext)
