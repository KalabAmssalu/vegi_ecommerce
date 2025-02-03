import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaRedo } from "react-icons/fa";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";

const CustomerOrderList = () => {
  // Sample order data
  const orders = [
    {
      id: 1,
      orderNumber: "ORD123456",
      date: "2023-10-15",
      status: "Delivered",
      total: "$99.99",
      items: [
        {
          id: 1,
          name: "Wireless Bluetooth Earbuds",
          quantity: 1,
          price: "$99.99",
        },
      ],
    },
    {
      id: 2,
      orderNumber: "ORD789012",
      date: "2023-10-10",
      status: "In Transit",
      total: "$199.99",
      items: [
        {
          id: 2,
          name: "Smartwatch Pro",
          quantity: 1,
          price: "$199.99",
        },
      ],
    },
    {
      id: 3,
      orderNumber: "ORD345678",
      date: "2023-10-05",
      status: "Pending",
      total: "$49.99",
      items: [
        {
          id: 3,
          name: "Wireless Charging Pad",
          quantity: 1,
          price: "$49.99",
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-2xl font-semibold p-6 bg-green-800 text-white">
            My Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "In Transit"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-4">
                        <Link
                          to={`/myorders/${order.id}`}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <FaEye className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => console.log("Reorder:", order.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <FaRedo className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerOrderList;
