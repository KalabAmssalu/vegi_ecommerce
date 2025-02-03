import React from "react";
import { FaUser, FaBox, FaTruck, FaCheckCircle } from "react-icons/fa";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";

const OrderDetail = () => {
  // Sample data for the delivery order
  const order = {
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
      status: "Delivered",
      trackingNumber: "TRK123456",
      estimatedDelivery: "2023-10-15",
      deliveredOn: "2023-10-14",
    },
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-2xl font-semibold p-6 bg-green-800 text-white">
            Delivery Order Details
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
                  <span className="font-medium">Name:</span>{" "}
                  {order.customer.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {order.customer.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {order.customer.phone}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {order.customer.address}
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
                  <span className="font-medium">Product Name:</span>{" "}
                  {order.product.name}
                </p>
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {order.product.description}
                </p>
                <p>
                  <span className="font-medium">Quantity:</span>{" "}
                  {order.product.quantity}
                </p>
                <p>
                  <span className="font-medium">Price:</span>{" "}
                  {order.product.price}
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
                <p>
                  <span className="font-medium">Delivered On:</span>{" "}
                  {order.delivery.deliveredOn}
                </p>
              </div>
            </div>

            {/* Delivery Confirmation */}
            <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg">
              <FaCheckCircle className="w-8 h-8 text-green-600" />
              <p className="ml-2 text-green-700 font-semibold">
                Your order has been successfully delivered!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetail;
