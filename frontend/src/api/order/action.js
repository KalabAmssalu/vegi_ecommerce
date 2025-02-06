import toast from "react-hot-toast";
import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
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
        console.log("payment response",response.data);
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
