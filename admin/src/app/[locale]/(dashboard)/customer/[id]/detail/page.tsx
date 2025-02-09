"use client";
import CustomerDashboard from "@/components/modules/customer/CustomerDetail";
import { useParams } from "next/navigation";
import React from "react";

const CustomerDetailPage = () => {
  const { id } = useParams();
  const customerId = Array.isArray(id) ? id[0] : id;

  if (!customerId) {
    return <div>No valid customer ID provided</div>;
  }
  return (
    <div>
      <CustomerDashboard id={customerId} />
    </div>
  );
};

export default CustomerDetailPage;
