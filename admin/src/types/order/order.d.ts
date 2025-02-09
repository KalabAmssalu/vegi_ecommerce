export type Address = {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  email: string;
};

export type Product = {
  product: {
    _id: string;
    merchant: string;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  quantity: number;
  price: number;
  _id: string;
};


export type Customer = {
  _id: string;
  user: string;
  isBlocked: boolean;
  orderHistory: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type OrderType = {
  delivery_address: Address;
  payment_status: boolean;
  _id: string;
  customer: Customer;
  products: Product[];
  totalAmount: number;
  status: string;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
