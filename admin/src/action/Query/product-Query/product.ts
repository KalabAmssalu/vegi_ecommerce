import axiosInstance from "@/action/axiosInstance";
import {
  AddProduct,
  DeleteProduct,
  fetchAllCategories,
  fetchAllProducts,
  FetchMyProductsById,
  UpdateProduct,
} from "@/action/product/action";
import useToastMutation from "@/hooks/useToastMutation";
import { ProductsubmissionType, ProductType } from "@/types/product/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSetProduct = () => {
  return useToastMutation<FormData>(
    "addProduct",
    AddProduct,
    "product creating ...",
    {
      onSuccess: (data, variables) => {
        // 'data' contains the response from the server
        // 'variables' contains the broker data you passed in
        console.log("product data", data);
        console.log("New product Data:", variables);

        // queryClient.invalidateQueries({ queryKey: ["brokers"] });
        // Example: Display a message with the broker name
      },
      onError: (error) => {
        console.error("Error creating product:", error.response.data);
      },
    }
  );
};

export const useFetchProduct = () => {
  return useQuery<ProductType[]>({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const data = await fetchAllProducts();
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  });
};
export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetchAllCategories();
      return response.data;
    },
  });
};
export const useFetchProductById = (id: string, isEdit?: boolean) => {
  return useQuery<ProductsubmissionType>({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        const data = await FetchMyProductsById(id);
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
    enabled: isEdit,
  });
};

export const useUpdateProduct = () => {
  return useToastMutation<{ id: string; data: FormData }>(
    "updateProduct",
    UpdateProduct,
    "product updating ...",
    {
      onSuccess: (data, variables) => {
        console.log("product data", data);
        console.log("New product Data:", variables);
      },
      onError: (error) => {
        console.error("Error updating product:", error.response.data);
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useToastMutation<{ id: string }>(
    "deleteProduct",
    DeleteProduct,
    "product deleting ...",
    {
      onSuccess: (data, variables) => {
        // 'data' contains the response from the server
        // 'variables' contains the broker data you passed in
        console.log("product data", data);
        console.log("New product Data:", variables);

        queryClient.invalidateQueries({ queryKey: ["products"] });
        // Example: Display a message with the broker name
      },
      onError: (error) => {
        console.error("Error deleting product:", error.response.data);
      },
    }
  );
};
