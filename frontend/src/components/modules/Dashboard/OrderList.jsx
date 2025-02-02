// src/components/OrderList.js
import React from "react";
import { Link } from "react-router-dom";
import { orders } from "../../../constant/OrderConstant";

const OrderList = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg mx-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Order List
        </h2>
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b text-center">
                  {order.productName}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  ${order.price.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {order.quantity}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <Link
                    to={`/order/${order.id}`}
                    className="text-blue-500 hover:underline"
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

export default OrderList;
