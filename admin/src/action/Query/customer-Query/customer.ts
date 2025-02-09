import axiosInstance from "@/action/axiosInstance";
import {
  DeactivateCustomer,
  FetchAllCustomers,
  FetchCustomerById,
} from "@/action/customer/action";
import useToastMutation from "@/hooks/useToastMutation";
import { CustomerType } from "@/types/customer/customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export const useFetchAllCustomers = () => {
  return useQuery<CustomerType[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      try {
        const data = await FetchAllCustomers();
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  });
};

export const useFetchCustomerById = (id: string) => {
  return useQuery<any>({
    queryKey: ["customerbyid"],
    queryFn: async () => {
      try {
        const data = await FetchCustomerById(id);
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  });
};

export const useDeactivateCustomer = () => {
  const queryClient = useQueryClient();
  return useToastMutation(
    "addProduct",
    DeactivateCustomer,
    "product creating ...",
    {
      onSuccess: (data, variables) => {
        // 'data' contains the response from the server
        // 'variables' contains the broker data you passed in
        console.log("product data", data);
        console.log("New product Data:", variables);

        queryClient.invalidateQueries({ queryKey: ["customerbyid"] });
        // Example: Display a message with the broker name
      },
      onError: (error) => {
        console.error("Error creating product:", error.response.data);
      },
    }
  );
};
