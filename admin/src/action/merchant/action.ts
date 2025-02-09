"use server";

import { Merchant } from "@/types/merchant/merchant";
import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function AddMerchant(data: Merchant) {
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

export async function FetchAllMerchants() {
  try {
    const response = await axiosInstance.get("merchants/");
    console.log("merchant response", response.data);
    return {
      ok: true,
      message: "All merchants fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function ToggleVerified({ id }: { id: string }) {
  try {
    const response = await axiosInstance.patch(`merchants/verify/${id}`);
    return {
      ok: true,
      message: "Merchant verification status updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function FetchMerchantById(id: string) {
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

export async function UpdateMerchant(id: string, data: Merchant) {
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

export async function DeleteMerchant(id: string) {
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
