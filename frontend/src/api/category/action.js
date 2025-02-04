import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response.data;
    },
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: async (categoryData) => {
      try {
        const response = await axiosInstance.post("/categories", categoryData);
        toast.success("Category created successfully!");
        return response.data;
      } catch (error) {
        toast.error(
          `Error during category creation: ${
            error.response?.data?.msg || error.message
          }`
        );
        throw error;
      }
    },
  });
};
