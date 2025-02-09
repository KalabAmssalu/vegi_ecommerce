"use client";
import AddProduct from "@/components/modules/products/AddProduct";
import { useParams } from "next/navigation";
import React from "react";

const Addpage = () => {
  const { id } = useParams();

  // Ensure the id is a string, parse if it's an array
  const productId = Array.isArray(id) ? id[0] : id;

  if (!productId) {
    return <div>No valid product ID provided</div>;
  }

  return <AddProduct isEdit={true} id={productId} />;
};

export default Addpage;
