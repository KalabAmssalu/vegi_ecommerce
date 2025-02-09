"use server";

import exp from "constants";
import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";
import { CustomerType } from "@/types/customer/customer";

export async function AddCustomer(data: CustomerType) {
  try {
    const response = await axiosInstance.post("customers/", data);
    console.log("response", response.data);
    return {
      ok: true,
      message: "New customer added successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function FetchAllCustomers() {
  try {
    const response = await axiosInstance.get("customers/");
    console.log("customer", response.data);

    return {
      ok: true,
      message: "All customers fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function FetchCustomerById(id: string) {
  try {
    const response = await axiosInstance.get(`customers/${id}`);
    return {
      ok: true,
      message: "Customer fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function UpdateCustomer(id: string, data: CustomerType) {
  try {
    const response = await axiosInstance.put(`customers/${id}`, data);
    return {
      ok: true,
      message: "Customer updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function DeleteCustomer(id: string) {
  try {
    const response = await axiosInstance.delete(`customers/${id}`);
    return {
      ok: true,
      message: "Customer deleted successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function DeactivateCustomer(id: string) {
  try {
    const response = await axiosInstance.put(`customers/deactivate/${id}`);
    return {
      ok: true,
      message: "Customer deactivated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
