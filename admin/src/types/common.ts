export type UserType = {
  id: string
  role: "admin" | "manager"
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
}

export type ProductType = {
  _id: string
  merchant: Merchant
  name: string
  description: string
  category: Category
  price: number
  quantity: number
  imageUrl: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

// You may need to define the Category type if it's not already defined elsewhere
type Category = {
  // Define the properties of the Category type
  id: string
  name: string
}

// You may need to define the Merchant type if it's not already defined elsewhere
type Merchant = {
  // Define the properties of the Merchant type
  _id: string
  name: string
}

