// src/hooks/useAddProduct.js

import { useMutation, useQuery } from "@tanstack/react-query";
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
