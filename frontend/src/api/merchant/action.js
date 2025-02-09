import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useFetchMerchantMyOrders = () => {
  return useQuery({
    queryKey: ["myorders"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/merchants/myorders`);
      return response.data;
    },
  });
};
