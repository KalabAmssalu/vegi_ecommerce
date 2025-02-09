import { FetchAllMerchants, ToggleVerified } from "@/action/merchant/action";
import useToastMutation from "@/hooks/useToastMutation";
import { Merchant } from "@/types/merchant/merchant";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFetchAllMerchants = () => {
  return useQuery<Merchant[]>({
    queryKey: ["allmerchants"],
    queryFn: async () => {
      try {
        const data = await FetchAllMerchants();
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  });
};

export const useToggleVerified = () => {
  const queryClient = useQueryClient();
  return useToastMutation<{ id: string }>(
    "toggleVerified",
    ToggleVerified,
    "Merchant verification status updated",
    {
      onSuccess: (data, variables) => {
        // 'data' contains the response from the server
        // 'variables' contains the broker data you passed in
        console.log("Merchant verification status updated", data);
        console.log("New merchant verification status:", variables);

        queryClient.invalidateQueries({ queryKey: ["allmerchants"] });
        // Example: Display a message with the broker name
      },
      onError: (error) => {
        console.error(
          "Error toggling merchant verification:",
          error.response.data
        );
      },
    }
  );
};
