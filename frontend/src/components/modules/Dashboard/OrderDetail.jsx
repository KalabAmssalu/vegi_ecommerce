import React from "react";
import {
  FaUser,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaShippingFast,
  FaCog,
  FaClock,
} from "react-icons/fa";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import { useParams } from "react-router-dom";
import { useFetchMyOrdersByID } from "../../../api/order/action";

const OrderDetail = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useFetchMyOrdersByID(id);
  console.log("order", order);

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <span className="text-lg font-semibold text-gray-700">Loading...</span>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <span className="text-lg font-semibold text-red-500">
          Error fetching order details
        </span>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-2xl font-semibold p-6 bg-green-800 text-white">
            Delivery Order Details
          </h2>
          <div className="p-6 space-y-8">
            <h3 className="text-xl font-semibold flex items-center space-x-2">
              <FaTruck className="text-gray-600" />
              <span>Order Information</span>
            </h3>
            <div className="mt-4 space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Total Amount:</span>{" "}
                {order.totalAmount} {/* You can format it if necessary */}
              </p>
              <p>
                <span className="font-medium">Order Date:</span>{" "}
                {new Date(order.orderDate).toLocaleString()}{" "}
                {/* Formatting the date */}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded-full ${
                    order.status === "confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>
          </div>

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
                  {order.customer.user.firstName +
                    " " +
                    order.customer.user.lastName}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {order.customer.user.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {order.customer.user.phoneNumber}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {order.customer.user.address}
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
                {order.products.map((product, index) => (
                  <div key={index}>
                    <p>
                      <span className="font-medium">Product Name:</span>{" "}
                      {product.product.name}
                    </p>
                    <p>
                      <span className="font-medium">Description:</span>{" "}
                      {product.product.description}
                    </p>
                    <p>
                      <span className="font-medium">Quantity:</span>{" "}
                      {product.quantity}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span>{" "}
                      {product.price}
                    </p>
                    <hr className="my-4" />
                  </div>
                ))}
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
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Tracking Number:</span>{" "}
                  {order.delivery_address.city}
                </p>
                <p>
                  <span className="font-medium">Estimated Delivery:</span>{" "}
                  {order.delivery_address.country}
                </p>
                <p>
                  <span className="font-medium">Delivered On:</span>{" "}
                  {order.delivery_address.street}
                </p>
              </div>
            </div>

            {/* Delivery Confirmation */}
            <div className="">
              {order.status === "pending" && (
                <div className="flex items-center justify-center p-6 bg-yellow-50 rounded-lg">
                  <FaClock className="w-8 h-8 text-yellow-600" />

                  <p className="ml-2 text-yellow-700 font-semibold">
                    Your order is pending and awaiting confirmation.
                  </p>
                </div>
              )}

              {order.status === "confirmed" && (
                <div className="flex items-center justify-center p-6 bg-blue-50 rounded-lg">
                  <FaCheckCircle className="w-8 h-8 text-blue-600" />
                  <p className="ml-2 text-blue-700 font-semibold">
                    Your order has been confirmed.
                  </p>
                </div>
              )}

              {order.status === "processed" && (
                <div className="flex items-center justify-center p-6 bg-orange-50 rounded-lg">
                  <FaCog className="w-8 h-8 text-orange-600" />
                  <p className="ml-2 text-orange-700 font-semibold">
                    Your order is being processed.
                  </p>
                </div>
              )}

              {order.status === "shipped" && (
                <div className="flex items-center justify-center p-6 bg-teal-50 rounded-lg">
                  <FaShippingFast className="w-8 h-8 text-teal-600" />
                  <p className="ml-2 text-teal-700 font-semibold">
                    Your order has been shipped.
                  </p>
                </div>
              )}

              {order.status === "delivered" && (
                <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg">
                  <FaCheckCircle className="w-8 h-8 text-green-600" />
                  <p className="ml-2 text-green-700 font-semibold">
                    Your order has been successfully delivered!
                  </p>
                </div>
              )}

              {order.status === "cancelled" && (
                <div className="flex items-center justify-center p-6 bg-red-50 rounded-lg">
                  <FaTimesCircle className="w-8 h-8 text-red-600" />
                  <p className="ml-2 text-red-700 font-semibold">
                    Your order has been cancelled.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetail;
