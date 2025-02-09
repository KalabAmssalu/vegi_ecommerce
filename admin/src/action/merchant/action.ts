"use server";

import { MerchantType } from "@/types/merchant/merchant";
import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function useAddMerchant(data: MerchantType) {
  try {
    const response = await axiosInstance.post("merchants/", data);
    console.log("response", response.data);
    return {
      ok: true,
      message: "New merchant added successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function useFetchAllMerchants() {
  try {
    const response = await axiosInstance.get("merchants/");
    return {
      ok: true,
      message: "All merchants fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function useFetchMerchantById(id: string) {
  try {
    const response = await axiosInstance.get(`merchants/${id}`);
    return {
      ok: true,
      message: "Merchant fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function useUpdateMerchant(id: string, data: MerchantType) {
  try {
    const response = await axiosInstance.put(`merchants/${id}`, data);
    return {
      ok: true,
      message: "Merchant updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function useDeleteMerchant(id: string) {
  try {
    const response = await axiosInstance.delete(`merchants/${id}`);
    return {
      ok: true,
      message: "Merchant deleted successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
