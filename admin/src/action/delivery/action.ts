"use server";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";
import { Deliveryusertype } from "@/types/delivery-person/delivery";

export async function AddDeliveryPerson(data: Deliveryusertype) {
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

export async function FetchAllDeliveryPersons() {
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

export async function FetchDeliveryPersonById(id: string) {
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

export async function UpdateDeliveryPerson(id: string, data: Deliveryusertype) {
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

export async function BlockDeliveryPerson({ id }: { id: string }) {
  try {
    const response = await axiosInstance.put(`deliverypersons/block/${id}`);

    return {
      ok: true,
      message: "Delivery Person blocked successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function DeleteDeliveryPerson({ id }: { id: string }) {
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
