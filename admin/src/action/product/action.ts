"use server";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function AddProduct(data: FormData) {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log("data", data);
    const response = await axiosInstance.post("products/create", data, config);
    console.log("response", response.data);
    return {
      ok: true,
      message: "New Product added successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function fetchAllProducts() {
  try {
    const response = await axiosInstance.get("products/");
    console.log("response", response.data);
    return {
      ok: true,
      message: "All Products fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
export async function fetchAllCategories() {
  try {
    const response = await axiosInstance.get("/categories");
    console.log("response", response.data);
    return {
      ok: true,
      message: "All Categories fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function FetchMyProducts() {
  try {
    const response = await axiosInstance.get("products/myproducts");
    return {
      ok: true,
      message: "My Products fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function FetchMyProductsById(id: string) {
  try {
    const response = await axiosInstance.get(`products/${id}`);
    return {
      ok: true,
      message: "My Products fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function UpdateProduct({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) {
  try {
    const response = await axiosInstance.put(`products/${id}`, data);
    return {
      ok: true,
      message: "Product updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function DeleteProduct({ id }: { id: string }) {
  try {
    const response = await axiosInstance.delete(`products/${id}`);
    return {
      ok: true,
      message: "Product deleted successfully",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
