import { Eye } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DeliveryListTable = () => {
  // Sample data for the table
  const navigate = useNavigate();
  const deliveries = [
    {
      id: 1,
      trackingNumber: "TRK123456",
      customerName: "John Doe",
      deliveryAddress: "123 Main St, New York, NY",
      status: "Delivered",
      deliveryDate: "2023-10-15",
    },
    {
      id: 2,
      trackingNumber: "TRK789012",
      customerName: "Jane Smith",
      deliveryAddress: "456 Elm St, Los Angeles, CA",
      status: "In Transit",
      deliveryDate: "2023-10-16",
    },
    {
      id: 3,
      trackingNumber: "TRK345678",
      customerName: "Alice Johnson",
      deliveryAddress: "789 Oak St, Chicago, IL",
      status: "Pending",
      deliveryDate: "2023-10-17",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-semibold p-6 bg-gray-800 text-white">
          Delivery List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {delivery.trackingNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {delivery.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {delivery.deliveryAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        delivery.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : delivery.status === "In Transit"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {delivery.deliveryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => {
                        // Handle detail view action
                        navigate(`/delivery-order/${delivery.id}`);
                        console.log("View details for:", delivery.trackingNumber);
                      }}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryListTable;