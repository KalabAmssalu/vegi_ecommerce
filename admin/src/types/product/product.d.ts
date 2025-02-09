type Merchant = {
  _id: string;
  trade_permit: string;
  user: string;
  address: string;
  isVerified: boolean;
  isBlocked: boolean;
  products: any[]; // Replace 'any' with the actual product type if available
  createdAt: string;
  updatedAt: string;
  __v: number;
  orders: any[]; // Replace 'any' with the actual order type if available
};

type Category = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ProductType = {
  _id: string;
  merchant: Merchant;
  name: string;
  description: string;
  category: Category;
  price: number;
  quantity: number;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};


export type ProductsubmissionType = {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: File;
};
