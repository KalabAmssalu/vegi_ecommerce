import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchMerchantMyOrders } from "../../../api/merchant/action";
import Footer from "../../common/Footer/Footer";

const OrderList = () => {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useFetchMerchantMyOrders();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isError) {
      if (error?.response?.data?.msg === "Merchant not found") {
        setErrorMessage("Your merchant account could not be found.");
      } else if (error?.response?.data?.message === "No orders found") {
        setErrorMessage("No orders have been placed yet.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  }, [isError, error]);

  if (isLoading) {
    return <div className="text-gray-500 min-h-screen">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="text-red-500 min-h-screen">{errorMessage}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-start justify-center min-h-screen ">
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
              {orders?.map((order) =>
                order.products?.map((product, index) => (
                  <tr key={product._id || index}>
                    <td className="py-2 px-4 border-b text-center">
                      {product.product.name} {/* Access product name */}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      ${product.product.price.toFixed(2)}{" "}
                      {/* Access product price */}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {product.quantity} {/* Quantity in the order */}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <Link
                        to={`/order/${order._id}`} // Use order ID for the link
                        className="text-blue-500 hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
