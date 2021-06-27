import { MouseEventHandler } from 'react'

interface Receipts {
  orders: Receipt[]
  receipts: Receipt[]
  shopId: string
  updateOrder: (orderId: string) => Promise<void>
  deleteOrder: (orderId: string) => Promise<void>
  serveOrder: (orderId: string) => Promise<void>
  guestOrder: FItem[]
  addGuestOrder: (itemPrice: number, itemName: string) => void
  increaseQuantity: (index: number) => void
  decreaseQuantity: (index: number) => void
  submitGuestOrder: () => Promise<void>
  cancelGuestOrder: () => void
  addNote: ChangeEventHandler<HTMLInputElement>
}

interface FReceipt {
  id: string
  isPaid: boolean
  note: string
  order: FItem[]
  timestamp: Date
  total: number
  table: number
  isServed: boolean
}

interface FItem {
  name: string
  price: number
  quantity: number
}

interface Category {
  name: string
  items: Items
}

interface Items {
  [key: string]: {
    code: string
    image: string
    price: number
  }
}

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

export { Receipts, FReceipt, FItem, Category, Items, FShop, IShop }
