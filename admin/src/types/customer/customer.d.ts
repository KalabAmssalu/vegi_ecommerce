export type CustomerType = {
  _id: string;
  user: UserType;
  isBlocked: boolean;
  orderHistory: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UserType = {
  _id: string;
  role: "customer";
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};
