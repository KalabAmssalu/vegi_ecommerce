export interface MerchantType {
  trade_permit: string;
  user: string;
  address: string;
  isVerified: boolean;
  isBlocked: boolean;
  products?: string[];
  orders?: string[];
}
