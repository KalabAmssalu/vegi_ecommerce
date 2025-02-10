import toast from "react-hot-toast";
import axiosInstance from "../axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setPaymentData } from "../../slices/successSlice";

export const useCreatePayment = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: ["createPayment"],
    mutationFn: async (paymentData) => {
      try {
        const response = await axiosInstance.post("/payments", paymentData);
        // Redirect to Chapa payment page
        console.log("payment response", response.data);
        dispatch(setPaymentData(response.data));
        window.location.href = response.data.checkoutUrl;
        toast.success("Payment created successfully!");
        return response.data;
      } catch (error) {
        toast.error(
          `Error during payment creation: ${
            error.response?.data?.msg || error.message
          }`
        );
        throw error;
      }
    },
  });
};

export const useVerifyPayment = () => {
  return useMutation({
    mutationKey: ["verifyPayment"],
    mutationFn: async (tx_ref) => {
      if (!tx_ref) throw new Error("tx_ref is required for verification");

      try {
        const response = await axiosInstance.post(`/payments/verify/${tx_ref}`);
        console.log("Payment verified:", response.data);
        return response.data;
      } catch (error) {
        toast.error(
          `Error during payment verification: ${
            error.response?.data?.msg || error.message
          }`
        );
        throw error;
      }
    },
  });
};

export const useUpdateStatus = () => {
  return useMutation({
    mutationKey: ["updateStatus"],
    mutationFn: async ({ id, status }) => {
      if (!id) {
        throw new Error("Order ID is required");
      }
      console.log("id", id);
      console.log("status", status);
      const response = await axiosInstance.patch(`/orders/status/${id}`, {
        status,
      });

      console.log("response", response);
      return response.data;
    },
  });
};

export const useFetchMyOrders = () => {
  return useQuery({
    queryKey: ["myorders"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/orders/myorder`);
      return response.data;
    },
  });
};
export const useFetchMyOrdersByID = (id) => {
  return useQuery({
    queryKey: ["myordersdetail"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/orders/${id}`);
      return response.data;
    },
  });
};

export const useFetchMyDeliveryOrders = () => {
  return useQuery({
    queryKey: ["myDeliveryorders"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/deliverypersons/myorders`);
      return response.data;
    },
  });
};
