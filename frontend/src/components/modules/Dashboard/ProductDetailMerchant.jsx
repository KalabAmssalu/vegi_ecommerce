import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { FaEdit, FaTrash } from "react-icons/fa";

import Back from "../../common/Back";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import { ChevronLeft, Star } from "lucide-react";
import toast from "react-hot-toast";
import {
  useDeleteProduct,
  useFetchMyProductsById,
  useUpdateProduct,
} from "../../../api/product/action";

const ProductDetailMerchant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useFetchMyProductsById(id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product]);

  // Handle edit mode toggle
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedProduct({ ...product });
    }
  };

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save changes
  const handleSaveChanges = () => {
    // Create an object with only the changed fields
    const updatedFields = {};
  
    // Check for modified fields and add them to the updatedFields object
    if (editedProduct?.name !== product?.name) updatedFields.name = editedProduct?.name;
    if (editedProduct?.category?.name !== product?.category?.name) updatedFields.category = editedProduct?.category;
    if (editedProduct?.description !== product?.description) updatedFields.description = editedProduct?.description;
    if (editedProduct?.price !== product?.price) updatedFields.price = editedProduct?.price;
    if (editedProduct?.quantity !== product?.quantity) updatedFields.quantity = editedProduct?.quantity;
  
    // Only update if there are any modified fields
    if (Object.keys(updatedFields).length > 0) {
      // Call your API to update the product with only the changed fields
      updateProduct({ id, data: updatedFields });
  
      // Optional: Notify the user about the successful update
      toast.success("Product updated successfully!");
    } else {
      // If no fields were changed, notify the user
      toast.info("No changes were made.");
    }
  
    // Exit editing mode
    setIsEditing(false);
  };
  

  // Handle delete product
  const handleDeleteProduct = () => {
    toast.success("Product deleted successfully!");
    deleteProduct({ id });
    navigate("/product"); // Redirect to products page after deletion
  };

  const handleImageChange = (e) => {
    // Handle image change (you can implement this logic if required)
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (isError) {
    return <div>Error fetching product details</div>;
  }

  if (!product) {
    return <div>No product details available</div>; // Or some other fallback UI
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <Back title={"Product Detail"} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            to="/product"
            className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
        </div>

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-2xl shadow-sm p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-xl">
              {isEditing ? (
                <div className="flex flex-col space-y-4">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${editedProduct.imageUrl}`}
                    alt={editedProduct.name}
                    className="w-full h-[400px] object-cover rounded-xl"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-600"
                  />
                </div>
              ) : (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${product?.imageUrl}`}
                  alt={product?.name}
                  className="w-full h-[500px] object-cover rounded-xl"
                />
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="category"
                    value={editedProduct?.category?.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {product?.category?.name}
                  </span>
                )}

                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProduct?.name}
                    onChange={handleInputChange}
                    className="w-full mt-4 text-4xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <h1 className="mt-4 text-4xl font-bold text-gray-900">
                    {product?.name}
                  </h1>
                )}

                <div className="mt-4 flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-sm text-gray-500">(128 reviews)</span>
                </div>

                {isEditing ? (
                  <textarea
                    name="description"
                    value={editedProduct?.description}
                    onChange={handleInputChange}
                    className="w-full mt-6 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="mt-6 text-gray-600 leading-relaxed">
                    {product?.description}
                  </p>
                )}

                <div className="mt-8">
                  {isEditing ? (
                    <input
                      type="text"
                      name="price"
                      value={editedProduct?.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900">
                        ${product?.price}
                      </span>
                      <span className="ml-2 text-gray-500">per kg</span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-10">
                {isEditing ? (
                  <div className="flex flex-col space-y-4">
                    <input
                      type="number"
                      name="quantity"
                      value={editedProduct?.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={handleSaveChanges}
                      className="w-full px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-6"></div>
                )}
              </div>
            </div>
          </div>

          {/* Edit and Delete Buttons */}
          <div className="mt-8 flex space-x-4">
            <button
              onClick={toggleEditMode}
              className="flex items-center px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <FaEdit className="w-5 h-5 mr-2" />
              {isEditing ? "Cancel Edit" : "Edit Product"}
            </button>
            <button
              onClick={handleDeleteProduct}
              className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaTrash className="w-5 h-5 mr-2" />
              Delete Product
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailMerchant;
