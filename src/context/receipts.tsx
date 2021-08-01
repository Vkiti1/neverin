import { createContext, useContext, FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { FReceipt, Receipts, FItem } from 'types/index'
import { ChangeEventHandler } from 'react'
import firebase from 'firebase'
import { useRouter } from 'next/router'

interface Props {
  shopId: string
  table?: number
}

const receiptsContext = createContext<Receipts>({} as Receipts)

export const ReceiptsProvider: FC<Props> = ({ children, shopId, table }) => {
  const [orders, setOrders] = useState<FReceipt[]>([])
  const [receipts, setReceipts] = useState<FReceipt[]>([])
  const [guestOrder, setGuestOrder] = useState<FItem[]>([])
  const [note, setNote] = useState<string>('')
  const router = useRouter()

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

  const decreaseQuantity = (index: number) => {
    const order = guestOrder.slice()

    order[index].quantity -= 1

    if (order[index].quantity <= 0) {
      order.splice(index, 1)
    }

    setGuestOrder(order)
  }

  const increaseQuantity = (index: number) => {
    const order = guestOrder.slice()

    order[index].quantity += 1

    setGuestOrder(order)
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

  const submitGuestOrder = async () => {
    if (guestOrder.length <= 0) {
      return
    }
    const total = guestOrder.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity
    }, 0)

    try {
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(shopId)
        .collection('receipts')
        .doc()
        .set({
          isPaid: false,
          isServed: false,
          note: note,
          order: guestOrder,
          table: table,
          timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
          total: total,
        })
    } catch (err) {
      console.error(err)
    } finally {
      setGuestOrder([])
      setNote('')
      router.push('/')
    }
  }

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

  const cancelGuestOrder = () => {
    setGuestOrder([])
    setNote('')
  }

  const addNote: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNote(e.target.value)
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
        increaseQuantity,
        decreaseQuantity,
        submitGuestOrder,
        cancelGuestOrder,
        addNote,
        note,
        table,
      }}
    >
      {children}
    </receiptsContext.Provider>
  )
}

export const useReceipts = () => useContext(receiptsContext)
