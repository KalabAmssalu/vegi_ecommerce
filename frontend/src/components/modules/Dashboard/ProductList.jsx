import { Eye } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchMyProducts } from "../../../api/product/action";

const ProductListTable = () => {
  const navigate = useNavigate();

  const { data: products } = useFetchMyProducts();

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
                  Image
                </th>
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
              {products &&
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/${product.imageUrl}`}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </td>
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
                        onClick={() => handleViewDetails(product._id)}
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
