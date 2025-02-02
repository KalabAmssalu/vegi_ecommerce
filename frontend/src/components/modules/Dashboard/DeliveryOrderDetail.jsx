// src/components/OrderDetail.js
import React from "react";
import { useParams, Link } from "react-router-dom";

const orders = [
  {
    id: 1,
    productName: "Heirloom Tomato",
    price: 5.99,
    quantity: 3,
    createdAt: "2024-07-19",
    customer: "John Doe",
    total: 27.44,
    status: "Pending",
  },
  {
    id: 2,
    productName: "Organic Ginger",
    price: 6.5,
    quantity: 2,
    createdAt: "2024-07-20",
    customer: "Jane Smith",
    total: 15.99,
    status: "Delivered",
  },
  {
    id: 3,
    productName: "Organic Ginger",
    price: 6.5,
    quantity: 2,
    createdAt: "2024-07-21",
    customer: "Alice Johnson",
    total: 33.43,
    status: "Pending",
  },
];

const OrderDetail = () => {
  const { id } = useParams();
  const order = orders.find((order) => order.id === parseInt(id));

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Order Not Found
          </h2>
          <Link to="/delivery-list" className="text-blue-500 hover:underline">
            Back to Delivery List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Order Detail
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order ID
            </label>
            <p className="mt-1 text-gray-900">{order.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created At
            </label>
            <p className="mt-1 text-gray-900">{order.createdAt}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Customer
            </label>
            <p className="mt-1 text-gray-900">{order.customer}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <p className="mt-1 text-gray-900">{order.productName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <p className="mt-1 text-gray-900">${order.price.toFixed(2)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <p className="mt-1 text-gray-900">{order.quantity}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total
            </label>
            <p className="mt-1 text-gray-900">
              ${(order.price * order.quantity).toFixed(2)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <p className="mt-1 text-gray-900">{order.status}</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/delivery-list" className="text-blue-500 hover:underline">
            Back to Delivery List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
