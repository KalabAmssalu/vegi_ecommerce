import {
  FetchAllOrders,
  FetchMyOrdersByID,
  fetchRecentOrders,
} from "@/action/order/action";
import { OrderType } from "@/types/order/order";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFetchRecentOrders = () => {
  return useQuery<any[]>({
    queryKey: ["recentorders"],
    queryFn: async () => {
      try {
        const data = await fetchRecentOrders();
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  });
};

export const useFetchMyOrders = () => {
  return useQuery<OrderType[]>({
    queryKey: ["allorders"],
    queryFn: async () => {
      try {
        const data = await FetchAllOrders();
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  });
};

export const useFetchMyOrdersByID = (id: string) => {
  return useQuery<OrderType>({
    queryKey: ["myordersdetail"],
    queryFn: async () => {
      try {
        const data = await FetchMyOrdersByID(id);
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  });
};
