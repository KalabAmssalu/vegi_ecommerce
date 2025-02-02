// src/components/DeliveryList.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialDeliveries = [
  {
    id: 1,
    createdAt: "2024-07-19",
    customer: "John Doe",
    total: 27.44,
    status: "Pending",
  },
  {
    id: 2,
    createdAt: "2024-07-20",
    customer: "Jane Smith",
    total: 15.99,
    status: "Delivered",
  },
  {
    id: 3,
    createdAt: "2024-07-21",
    customer: "Alice Johnson",
    total: 33.43,
    status: "Pending",
  },
];

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState(initialDeliveries);

  const handleStatusChange = (id) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, status: "Delivered" } : delivery
      )
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Delivery List
        </h2>
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Customer</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td className="py-2 px-4 border-b text-center">
                  {delivery.id}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {delivery.createdAt}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {delivery.customer}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  ${delivery.total.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {delivery.status}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {delivery.status === "Pending" && (
                    <button
                      onClick={() => handleStatusChange(delivery.id)}
                      className="text-white bg-primary hover:bg-blue-700 px-3 py-1 rounded"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  <Link
                    to={`/order/${delivery.id}`}
                    className="ml-4 text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryList;
