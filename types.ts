// Product type definition
export type Product = {
  id: string
  name: string
  description: string
  fullDescription?: string
  price: number
  oldPrice?: number
  category: string
  inventory: number
  rating: number
  reviews: number
  colors: string[]
  images: string[]
  features: string[]
  specifications?: {
    size?: string
    coverage?: string
    dryTime?: string
    finish?: string
    application?: string
    use?: string
  }
  createdAt: string
}

// Order type definition
export type Order = {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  paymentMethod: string
  createdAt: string
}

// Order item type definition
export type OrderItem = {
  productId: string
  name: string
  price: number
  quantity: number
  color?: string
}

// Address type definition
export type Address = {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
}
