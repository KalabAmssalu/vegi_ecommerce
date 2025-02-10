import { useState } from "react";
import {
  useFetchMyDeliveryOrders,
  useUpdateStatus,
} from "../../../api/order/action";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-emerald-100 text-emerald-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const DeliveryListTable = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const { data: deliveries } = useFetchMyDeliveryOrders();

  const openDialog = (delivery) => {
    setSelectedDelivery(delivery);
    setIsDelivered(delivery.status === "delivered");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedDelivery(null);
    setIsDialogOpen(false);
  };

  const { mutate: updateStatus } = useUpdateStatus();

  const handleStatusUpdate = () => {
    const newStatus = isDelivered ? "delivered" : "pending";
    updateStatus({ id: selectedDelivery._id, status: newStatus });
    closeDialog();
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="px-6 py-4 text-sm font-medium text-gray-600">
                  Order ID
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-600">
                  Customer
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deliveries?.map((delivery) => (
                <tr
                  key={delivery._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {delivery._id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {delivery.delivery_address.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        delivery.status
                      )}`}
                    >
                      {delivery.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button
                      onClick={() => openDialog(delivery)}
                      className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Delivery Details
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Order ID
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedDelivery?._id}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Email
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedDelivery?.delivery_address.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer address
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedDelivery?.delivery_address.street}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedDelivery?.products[0].product.name}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Mark as Delivered
                </label>
                <button
                  onClick={() => setIsDelivered(!isDelivered)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isDelivered ? "bg-emerald-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isDelivered ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={closeDialog}
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryListTable;
