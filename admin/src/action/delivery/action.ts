"use server";

import { DeliveryPersonType } from "@/types/delivery-person/delivery";
import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function useAddDeliveryPerson(data: DeliveryPersonType) {
  try {
    const response = await axiosInstance.post("deliverypersons/", data);
    console.log("response", response.data);
    return {
      ok: true,
      message: "New Delivery Person added successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function useFetchAllDeliveryPersons() {
  try {
    const response = await axiosInstance.get("deliverypersons/");
    return {
      ok: true,
      message: "All Delivery Persons fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function useFetchDeliveryPersonById(id: string) {
  try {
    const response = await axiosInstance.get(`deliverypersons/${id}`);
    return {
      ok: true,
      message: "Delivery Person fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function useUpdateDeliveryPerson(id: string, data: DeliveryPersonType) {
  try {
    const response = await axiosInstance.put(`deliverypersons/${id}`, data);
    return {
      ok: true,
      message: "Delivery Person updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function useDeleteDeliveryPerson(id: string) {
  try {
    const response = await axiosInstance.delete(`deliverypersons/${id}`);
    return {
      ok: true,
      message: "Delivery Person deleted successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
