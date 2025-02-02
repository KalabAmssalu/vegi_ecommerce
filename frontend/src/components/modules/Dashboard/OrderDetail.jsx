// src/components/OrderDetail.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { orders } from "../../../constant/OrderConstant";
import { MoveLeft } from "lucide-react";

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
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            Back to Orders
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
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="text-blue-500 hover:underline p-4 flex gap-2 items-center justify-center"
          >
            <MoveLeft />
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
