import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../slices/whishlistSlice";
import { addToCart } from "../../slices/cartSlice";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <Header />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground">
              Start adding some items to your wishlist!
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Heart className="h-6 w-6 text-accent" />
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <span className="text-muted-foreground ml-2">
            ({wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="group bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${item.imageUrl}`}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-primary font-bold text-lg">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-muted-foreground">
                      {item.rating}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </button>
                  <button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
