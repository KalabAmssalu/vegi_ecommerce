import {
  AddDeliveryPerson,
  BlockDeliveryPerson,
  DeleteDeliveryPerson,
  FetchAllDeliveryPersons,
  FetchDeliveryPersonById,
} from "@/action/delivery/action";

import useToastMutation from "@/hooks/useToastMutation";
import { Deliveryusertype } from "@/types/delivery-person/delivery";
import { DeliveryPersonResponse } from "@/types/delivery-person/delivery-person";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSetDeliveryPerson = () => {
  const queryClient = useQueryClient();
  return useToastMutation<Deliveryusertype>(
    "addDeliveryPerson",
    AddDeliveryPerson,
    "Delivery Person creating ...",
    {
      onSuccess: (data, variables) => {
        // 'data' contains the response from the server
        // 'variables' contains the broker data you passed in
        console.log("Delivery data", data);
        console.log("New Delivery Data:", variables);

        queryClient.invalidateQueries({ queryKey: ["Deliverys"] });
        // Example: Display a message with the broker name
      },
      onError: (error) => {
        console.error("Error creating Delivery:", error.response.data);
      },
    }
  );
};

export const useFetchDelivery = () => {
  return useQuery<DeliveryPersonResponse[]>({
    queryKey: ["Deliverys"],
    queryFn: async () => {
      try {
        const data = await FetchAllDeliveryPersons();
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  });
};

export const useFetchDeliveryById = (id: string, isEdit?: boolean) => {
  return useQuery<DeliveryPersonResponse>({
    queryKey: ["Delivery", id],
    queryFn: async () => {
      try {
        const data = await FetchDeliveryPersonById(id);
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
    enabled: isEdit,
  });
};

export const useBlockDelivery = () => {
  const queryClient = useQueryClient();
  return useToastMutation<{ id: string }>(
    "blockDelivery",
    BlockDeliveryPerson,
    "Delivery blocking ...",
    {
      onSuccess: (data, variables) => {
        // 'data' contains the response from the server
        // 'variables' contains the broker data you passed in
        console.log("delivery data", data);
        console.log("New delivery Data:", variables);

        queryClient.invalidateQueries({ queryKey: ["Deliverys"] });
        // Example: Display a message with the broker name
      },
      onError: (error) => {
        console.error("Error creating delivery:", error.response.data);
      },
    }
  );
};

export const useDeleteDelivery = () => {
  const queryClient = useQueryClient();
  return useToastMutation<{ id: string }>(
    "deleteDelivery",
    DeleteDeliveryPerson,
    "Delivery deleting ...",
    {
      onSuccess: (data, variables) => {
        // 'data' contains the response from the server
        // 'variables' contains the broker data you passed in
        console.log("Delivery data", data);
        console.log("New Delivery Data:", variables);

        queryClient.invalidateQueries({ queryKey: ["Deliverys"] });
        // Example: Display a message with the broker name
      },
      onError: (error) => {
        console.error("Error deleting Delivery:", error.response.data);
      },
    }
  );
};
