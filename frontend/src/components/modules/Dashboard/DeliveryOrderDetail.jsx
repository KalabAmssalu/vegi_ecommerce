import React, { useState } from "react";
import { FaUser, FaBox, FaTruck, FaCheckCircle, FaEdit } from "react-icons/fa";

const DeliveryPersonOrderDetail = () => {
  // Sample data for the delivery order
  const [order, setOrder] = useState({
    orderId: "ORD123456",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (123) 456-7890",
      address: "123 Main St, New York, NY, 10001",
    },
    product: {
      name: "Wireless Bluetooth Earbuds",
      description: "High-quality wireless earbuds with noise cancellation.",
      quantity: 2,
      price: "$99.99",
    },
    delivery: {
      status: "In Transit",
      trackingNumber: "TRK123456",
      estimatedDelivery: "2023-10-15",
      deliveredOn: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(order.delivery.status);

  // Handle status update
  const handleStatusUpdate = (e) => {
    e.preventDefault();
    setOrder({
      ...order,
      delivery: {
        ...order.delivery,
        status: newStatus,
        deliveredOn: newStatus === "Delivered" ? new Date().toISOString().split("T")[0] : "",
      },
    });
    setIsEditing(false);
    console.log("Updated Order:", order);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-semibold p-6 bg-gray-800 text-white">
          Order Details (Delivery Person View)
        </h2>
        <div className="p-6 space-y-8">
          {/* Customer Details Section */}
          <div>
            <h3 className="text-xl font-semibold flex items-center space-x-2">
              <FaUser className="text-gray-600" />
              <span>Customer Details</span>
            </h3>
            <div className="mt-4 space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Name:</span> {order.customer.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {order.customer.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {order.customer.phone}
              </p>
              <p>
                <span className="font-medium">Address:</span> {order.customer.address}
              </p>
            </div>
          </div>

          {/* Product Details Section */}
          <div>
            <h3 className="text-xl font-semibold flex items-center space-x-2">
              <FaBox className="text-gray-600" />
              <span>Product Details</span>
            </h3>
            <div className="mt-4 space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Product Name:</span> {order.product.name}
              </p>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {order.product.description}
              </p>
              <p>
                <span className="font-medium">Quantity:</span> {order.product.quantity}
              </p>
              <p>
                <span className="font-medium">Price:</span> {order.product.price}
              </p>
            </div>
          </div>

          {/* Delivery Details Section */}
          <div>
            <h3 className="text-xl font-semibold flex items-center space-x-2">
              <FaTruck className="text-gray-600" />
              <span>Delivery Details</span>
            </h3>
            <div className="mt-4 space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded-full ${
                    order.delivery.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.delivery.status === "In Transit"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.delivery.status}
                </span>
              </p>
              <p>
                <span className="font-medium">Tracking Number:</span>{" "}
                {order.delivery.trackingNumber}
              </p>
              <p>
                <span className="font-medium">Estimated Delivery:</span>{" "}
                {order.delivery.estimatedDelivery}
              </p>
              {order.delivery.deliveredOn && (
                <p>
                  <span className="font-medium">Delivered On:</span>{" "}
                  {order.delivery.deliveredOn}
                </p>
              )}
            </div>

            {/* Edit Delivery Status */}
            <div className="mt-4">
              {isEditing ? (
                <form onSubmit={handleStatusUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Update Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
                  >
                    <FaCheckCircle className="mr-2" />
                    Update Status
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700"
                >
                  <FaEdit className="mr-2" />
                  Edit Delivery Status
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPersonOrderDetail;