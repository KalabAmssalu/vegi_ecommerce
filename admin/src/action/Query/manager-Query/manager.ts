import {
  AddManager,
  DeleteManager,
  FetchAllManagers,
  FetchManagerById,
  UpdateManager,
} from "@/action/manager/action";
import useToastMutation from "@/hooks/useToastMutation";
import { ManagerResponse } from "@/types/manager/manager";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export const useFetchAllManager = () => {
  return useQuery<ManagerResponse[]>({
    queryKey: ["manager"],
    queryFn: async () => {
      try {
        const data = await FetchAllManagers();
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  });
};

export const useFetchManagerById = (id: string) => {
  return useQuery<any>({
    queryKey: ["managerbyid"],
    queryFn: async () => {
      try {
        const data = await FetchManagerById(id);
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  });
};

export const useUpdateManager = () => {
  const queryClient = useQueryClient();
  return useToastMutation("addManager", UpdateManager, "Manager creating ...", {
    onSuccess: (data, variables) => {
      // 'data' contains the response from the server
      // 'variables' contains the broker data you passed in
      console.log("Manager data", data);
      console.log("New Manager Data:", variables);

      queryClient.invalidateQueries({ queryKey: ["manager"] });
      // Example: Display a message with the broker name
    },
    onError: (error) => {
      console.error("Error creating Manager:", error.response.data);
    },
  });
};

export const useDeleteManager = () => {
  const queryClient = useQueryClient();
  return useToastMutation(
    "deleteManager",
    DeleteManager,
    "Manager deleting ...",
    {
      onSuccess: (data, variables) => {
        // 'data' contains the response from the seorver
        // 'variables' contains the broker data you passed in
        console.log("Manager data", data);
        console.log("New Manager Data:", variables);

        queryClient.invalidateQueries({ queryKey: ["manager"] });
        // Example: Display a message with the broker name
      },
      onError: (error) => {
        console.error("Error creating Manager:", error.response.data);
      },
    }
  );
};
export const useAddManager = () => {
  const queryClient = useQueryClient();
  return useToastMutation("addManager", AddManager, "Manager creating ...", {
    onSuccess: (data, variables) => {
      // 'data' contains the response from the server
      // 'variables' contains the broker data you passed in
      console.log("Manager data", data);
      console.log("New Manager Data:", variables);

      queryClient.invalidateQueries({ queryKey: ["manager"] });
      // Example: Display a message with the broker name
    },
    onError: (error) => {
      console.error("Error creating Manager:", error.response.data);
    },
  });
};
