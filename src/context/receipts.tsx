import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useEffect,
  useState,
  MouseEventHandler,
} from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { FReceipt, FItem, Receipts } from 'types/index'

interface Props {
  id: string
}

const receiptsContext = createContext<Receipts>({} as Receipts)

export const ReceiptsProvider: FC<Props> = ({ children, id }) => {
  const [orders, setOrders] = useState<FReceipt[]>([])
  const [receipts, setReceipts] = useState<FReceipt[]>([])

  const orderUpdate = async (orderId) => {
    const updatedOrders = orders
    const index = updatedOrders.findIndex((order) => order.id === orderId)

    updatedOrders[index].isPaid = true
    delete updatedOrders[index].id
    try {
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(id)
        .collection('receipts')
        .doc(orderId)
        .set(updatedOrders[index])
      updatedOrders[index].id = orderId
      setReceipts(updatedOrders)
    } catch (err) {
      setOrders(orders)
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
          .filter((change) => change.data().isPaid)
          .map((change) => {
            const changeData = change.data()
            return {
              id: change.id,
              isPaid: changeData.isPaid,
              timestamp: changeData.timestamp.toDate(),
              note: changeData.note,
              total: changeData.total,
              order: changeData.order,
              table: changeData.table,
            }
          })
        const orders = querySnapshot.docs
          .filter((change) => !change.data().isPaid)
          .map((change) => {
            const changeData = change.data()
            return {
              id: change.id,
              isPaid: changeData.isPaid,
              timestamp: changeData.timestamp.toDate(),
              note: changeData.note,
              total: changeData.total,
              order: changeData.order,
              table: changeData.table,
            }
          })
        setOrders(orders)
        setReceipts(receipts)
      })
    return () => unsubscribe()
  }, [])

  return (
    <receiptsContext.Provider value={{ orders, receipts, id, orderUpdate }}>
      {children}
    </receiptsContext.Provider>
  )
}

export const useReceipts = () => useContext(receiptsContext)