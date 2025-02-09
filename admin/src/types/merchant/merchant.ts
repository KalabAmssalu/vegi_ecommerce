import type { UserType, ProductType } from "./common"

export interface Merchant {
  _id: string
  trade_permit: string
  user: UserType
  address?: string
  isVerified: boolean
  isBlocked: boolean
  products: ProductType[]
  orders: any[] // You may want to define a proper Order type
}

