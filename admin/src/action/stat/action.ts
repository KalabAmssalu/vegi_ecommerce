"use server";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function fetchDashboardStat() {
  try {
    const response = await axiosInstance.get("stat/dashboard");
    return {
      ok: true,
      message: "Dashboard Stat fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
