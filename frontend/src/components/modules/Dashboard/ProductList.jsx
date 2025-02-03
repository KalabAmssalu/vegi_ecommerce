import { Eye } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductListTable = () => {
    const navigate = useNavigate();
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Earbuds",
      description: "High-quality wireless earbuds with noise cancellation.",
      price: "$99.99",
      quantity: 50,
    },
    {
      id: 2,
      name: "Smartwatch Pro",
      description: "Fitness tracking, heart rate monitoring, and more.",
      price: "$199.99",
      quantity: 30,
    },
    {
      id: 3,
      name: "Wireless Charging Pad",
      description: "Fast wireless charging for all Qi-enabled devices.",
      price: "$49.99",
      quantity: 100,
    },
  ];

  // Handle view details action
  const handleViewDetails = (productId) => {
    navigate(`/myproducts/${productId}`);
    console.log("View details for product ID:", productId);
    // Navigate to the product details page (e.g., using React Router)
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-semibold p-6 bg-gray-800 text-white">
          Product List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 max-w-xs">
                    {product.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleViewDetails(product.id)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
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

export default ProductListTable;