import { UserType } from "../common";

export interface ManagerResponse {
  _id: string;
  isBlocked: boolean;
  user: UserType;
}

export interface ManagerType {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }