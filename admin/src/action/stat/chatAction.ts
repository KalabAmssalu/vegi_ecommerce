"use server";
import axiosInstance from "@/action/axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function bulkUpload(data: any) {
  try {
    const response = await axiosInstance.post("/chats/bulk", data);
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

export async function getFAQ(id: string) {
  try {
    const response = await axiosInstance.get(`/chats/${id}`);
    return {
      ok: true,
      message: "FAQ fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function updateFAQ(id: string, data: any) {
  try {
    const response = await axiosInstance.put(`/chats/${id}`, data);
    return {
      ok: true,
      message: "FAQ updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function deleteFAQ(ids: string[]) {
  try {
    const response = await axiosInstance.delete("/chats/bulk", {
      data: { ids }, // Send the array of ids in the request body
    });
    return {
      ok: true,
      message: "FAQ deleted successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function listFaqs() {
  try {
    const response = await axiosInstance.get("/chats");
    return {
      ok: true,
      message: "FAQs fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
