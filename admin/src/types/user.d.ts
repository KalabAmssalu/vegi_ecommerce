export type AuthResponse = {
  id: string;
  role: "admin" | "manager"; // Adjust if more roles exist
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  token: string;
};

export type UserType = {
  id: string;
  role: "admin" | "manager";
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
};
