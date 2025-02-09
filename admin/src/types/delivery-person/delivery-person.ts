import { UserType } from "../common";

export interface DeliveryPersonResponse {
  _id: string;
  isBlocked: boolean;
  user: UserType;
}
