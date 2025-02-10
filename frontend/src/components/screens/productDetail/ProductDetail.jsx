import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart, addToCartWithQuantity } from "../../../slices/cartSlice";
import Back from "../../common/Back";
import Header from "../../common/Header/Header";
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";
import Footer from "../../common/Footer/Footer";
import { useFetchProductsById } from "../../../api/product/action";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product } = useFetchProductsById(id);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (type === "increase") {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCartWithQuantity({ ...product, quantity }));
    toast.success("Added to cart successfully!");
  };

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
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${product?.imageUrl}`}
                alt={product?.name}
                className="w-full h-[500px] object-cover product-image"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {product?.category?.name}
                </span>
                <h1 className="mt-4 text-4xl font-bold text-gray-900">
                  {product?.name}
                </h1>
                <div className="mt-4 flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-sm text-gray-500">(128 reviews)</span>
                </div>
                <p className="mt-6 text-gray-600 leading-relaxed">
                  {product?.description}
                </p>
                <div className="mt-8">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product?.price}
                  </span>
                  <span className="ml-2 text-gray-500">per kg</span>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="quantity-input"
                    />
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
