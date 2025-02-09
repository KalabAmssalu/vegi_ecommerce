// src/hooks/useAuth.js

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slices/UserSlice";

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (userData) => {
      try {
        const response = await axiosInstance.post("/auth/login", userData);
        toast.success("Login successful!");
        if (response.data?.data) {
          dispatch(loginSuccess(response.data.data)); // Dispatching action with user data
        }
        const token = response.data.token;
        localStorage.setItem("jwt", token);
        return response.data;
      } catch (error) {
        toast.error(
          `Error during login : ${error.response?.data?.msg || error.message}`
        );

        const errorMessage = error.response?.data?.message || error.message;
        toast.error(`Error during login: ${errorMessage}`);
        throw error;
      }
    },
  });
};

// Register Mutation
export const useRegister = () => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: async (userData) => {
      try {
        const response = await axiosInstance.post("/customers", userData);
        toast.success("Register successful!");
        console.log("response.data", response.data);

        return response.data;
      } catch (error) {
        toast.error(
          `Error during login API call: ${
            error.response?.data?.msg || error.message
          }`
        );
        throw error;
      }
    },
  });
};

export const useMerchantRegister = () => {
  return useMutation({
    mutationKey: ["MerchantSignUp"],
    mutationFn: async (userData) => {
      try {
        console.log("Merchant SignUp Data:", userData);

        const response = await axiosInstance.post("/merchants", userData, {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure form-data format
          },
        });

        toast.success("Merchant registered successfully!");
        console.log("Merchant Signup Response:", response.data);

        return response.data;
      } catch (error) {
        toast.error(
          `Error during merchant signup: ${
            error.response?.data?.msg || error.message
          }`
        );
        throw error;
      }
    },
  });
};

// Get User Query
export const useGetUser = () => {
  return useQuery(["user"], async () => {
    const response = await axiosInstance.get("/auth/user");
    return response.data;
  });
};

// Update User Mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(async (userData) => {
    const response = await axiosInstance.put("/auth/user", userData);
    queryClient.invalidateQueries(["user"]); // Invalidate the user query to refresh data
    return response.data;
  });
};
