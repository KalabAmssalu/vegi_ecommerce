"use server";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function FetchAllOrders() {
  try {
    const response = await axiosInstance.get("orders/");
    return {
      ok: true,
      message: "My Orders fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
export async function fetchRecentOrders() {
  try {
    console.log("orders fetch recent");
    const response = await axiosInstance.get("orders/recent");

    return {
      ok: true,
      message: "My Orders fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function FetchMyOrdersByID(id: string) {
  try {
    const response = await axiosInstance.get(`orders/${id}`);
    return {
      ok: true,
      message: "My Orders fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function UpdateOrder(id: string, data: any) {
  try {
    const response = await axiosInstance.put(`orders/${id}`, data);
    return {
      ok: true,
      message: "Order updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function DeleteOrder(id: string) {
  try {
    const response = await axiosInstance.delete(`orders/${id}`);
    return {
      ok: true,
      message: "Order deleted successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function SetDeliveryOrder({
  id,
  data,
}: {
  id: string;
  data: string;
}) {
  try {
    const response = await axiosInstance.patch(`orders/delivery/${id}`, {
      deliveryPerson: data,
    });
    return {
      ok: true,
      message: "Order updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
