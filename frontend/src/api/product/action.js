// src/hooks/useAddProduct.js

import { useMutation } from "@tanstack/react-query";
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
