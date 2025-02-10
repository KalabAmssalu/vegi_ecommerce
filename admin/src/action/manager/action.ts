"use server";

import { ManagerResponse, ManagerType } from "@/types/manager/manager";
import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function AddManager(data: ManagerType) {
  try {
    console.log("data", data);
    const response = await axiosInstance.post("managers/", data);
    console.log("response", response.data);
    return {
      ok: true,
      message: "New Manager added successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function FetchAllManagers() {
  try {
    const response = await axiosInstance.get("managers/");
    console.log("Manager response", response.data);
    return {
      ok: true,
      message: "All Managers fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function ToggleVerified({ id }: { id: string }) {
  try {
    const response = await axiosInstance.patch(`managers/verify/${id}`);
    return {
      ok: true,
      message: "Manager verification status updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function FetchManagerById(id: string) {
  try {
    const response = await axiosInstance.get(`managers/${id}`);
    return {
      ok: true,
      message: "Manager fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function UpdateManager({
  id,
  data,
}: {
  id: string;
  data: ManagerType;
}) {
  try {
    console.log("manager", data)
    const response = await axiosInstance.put(`managers/${id}`, data);
    return {
      ok: true,
      message: "Manager updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function DeleteManager(id: string) {
  try {
    const response = await axiosInstance.delete(`managers/${id}`);
    return {
      ok: true,
      message: "Manager deleted successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
