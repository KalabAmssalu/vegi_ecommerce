"use server";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function useFetchPayment() {
  try {
    const response = await axiosInstance.get("payments/");
    console.log("response", response.data);
    return {
      ok: true,
      message: "get payments successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function useFetchPaymentById(id: string) {
  try {
    const response = await axiosInstance.get(`payments/${id}`);
    return {
      ok: true,
      message: "get payments by id successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function useUpdatePayment(id: string, data: any) {
  try {
    const response = await axiosInstance.put(`payments/${id}`, data);
    return {
      ok: true,
      message: "update payment successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function useDeletePayment(id: string) {
  try {
    const response = await axiosInstance.delete(`payments/${id}`);
    return {
      ok: true,
      message: "delete payment successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
