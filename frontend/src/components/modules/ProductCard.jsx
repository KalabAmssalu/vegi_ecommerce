import { Eye, Heart, ListCollapse, Search, ShoppingCart } from "lucide-react";
import { cn } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { toggleWishlist } from "../../slices/whishlistSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product, onQuickView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product._id);
  const isAuthenticated = useSelector((state) => state.user.token);
  const isAuth = isAuthenticated;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleDetailview = () => {
    navigate("/product/" + product._id);
  };

  return (
    <div className="relative bg-white border rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${product.imageUrl}`}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        {/* Floating Wishlist & Quick View Buttons */}
        <div className="flex justify-end absolute top-4 right-4 gap-4">
          <button
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"
            onClick={() => onQuickView(product)}
          >
            <Eye className="h-5 w-5 text-gray-600" />
          </button>
          <button
            className={cn(
              "bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition",
              isInWishlist && "text-red-500 hover:text-red-600"
            )}
            onClick={handleToggleWishlist}
          >
            <Heart
              className="h-5 w-5"
              fill={isInWishlist ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-bold text-xl">
            ${product.price}
          </span>
          <div className="flex items-center text-yellow-500 text-sm">
            ★ <span className="ml-1">{product?.rating}</span>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      {isAuth && (
        <div className="p-4 grid grid-cols-3 gap-2">
          <button
            className="col-span-2 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
          <button
            className="col-span-1 w-full flex items-center justify-center gap-2 bg-green-300 text-black py-2 rounded-lg hover:bg-green-700 transition"
            onClick={handleDetailview}
          >
            <ListCollapse className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};
