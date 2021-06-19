interface Receipts {
  orders: Receipt[]
  receipts: Receipt[]
  id: string
  updateOrder: (orderId: string) => Promise<void>
  deleteOrder: (orderId: string) => Promise<void>
  serveOrder: (orderId: string) => Promise<void>
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
  [key: string]: number
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
