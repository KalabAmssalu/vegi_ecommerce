import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { bulkUpload, deleteFAQ, listFaqs } from "../stat/chatAction";
import useToastMutation from "@/hooks/useToastMutation";

export const useGetFaqsQuery = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const response = await listFaqs();
      return response.data;
    },
  });
};

export const useBulkUploadFaqsMutation = () => {
  return useToastMutation("addFAQ", bulkUpload, "FAQ uploading ...", {
    onSuccess: (data, variables) => {
      // 'data' contains the response from the server
      // 'variables' contains the broker data you passed in
      console.log("product data", data);
      console.log("New product Data:", variables);

      // Example: Display a message with the broker name
    },
    onError: (error) => {
      console.error("Error creating product:", error.response.data);
    },
  });
};

export const useDeleteFAQMutation = () => {
  return useToastMutation("deleteFAQ", deleteFAQ, "FAQ deleting ...", {
    onSuccess: (data, variables) => {
      // 'data' contains the response from the server
      // 'variables' contains the broker data you passed in
      console.log("product data", data);
      console.log("New product Data:", variables);

      // Example: Display a message with the broker name
    },
    onError: (error) => {
      console.error("Error creating product:", error.response.data);
    },
  });
};
