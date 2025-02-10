// src/hooks/useAddProduct.js

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const addProduct = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  // Ensure the endpoint matches your API
  const response = await axiosInstance.post("/products", formData, config);
  return response.data;
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: addProduct, // The function to call for the mutation
  });
};

export const useFetchMyProducts = () => {
  return useQuery({
    queryKey: ["myproducts"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products/myproducts");
      return response.data;
    },
  });
};

export const useFetchAllProducts = () => {
  return useQuery({
    queryKey: ["Allproducts"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products");
      return response.data;
    },
  });
};

export const useFetchMyProductsById = (id) => {
  return useQuery({
    queryKey: ["myproducts", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/myproducts/${id}`);
      return response.data;
    },
  });
};
export const useFetchProductsById = (id) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async ({ id }) => {
      if (!id) {
        throw new Error("Product ID is required");
      }

      const response = await axiosInstance.delete(`/products/${id}`);
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["myproducts"] });
      }
      console.log("response", response);
      return response.data;
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: async ({ id, data }) => {
      if (!id) {
        throw new Error("Product ID is required");
      }
      console.log("data", data);
      const response = await axiosInstance.patch(`/products/${id}`, data);
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["myproducts"] });
      }
      console.log("response", response);
      return response.data;
    },
  });
};
