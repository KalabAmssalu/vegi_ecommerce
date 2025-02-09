import {
  FetchAllOrders,
  FetchMyOrdersByID,
  fetchRecentOrders,
  SetDeliveryOrder,
} from "@/action/order/action";
import useToastMutation from "@/hooks/useToastMutation";
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

export const useUpdateDeliveryOrder = () => {
  return useToastMutation<{ id: string; data: string }>(
    "addProduct",
    SetDeliveryOrder,
    "product creating ...",
    {
      onSuccess: (data, variables) => {
        // 'data' contains the response from the server
        // 'variables' contains the broker data you passed in
        console.log("delivery order data", data);
        console.log("New delivery order Data:", variables);

        // queryClient.invalidateQueries({ queryKey: ["brokers"] });
        // Example: Display a message with the broker name
      },
      onError: (error) => {
        console.error("Error creating delivery order:", error.response.data);
      },
    }
  );
};
