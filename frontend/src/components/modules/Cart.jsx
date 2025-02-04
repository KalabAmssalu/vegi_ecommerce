import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../slices/cartSlice";
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "../../lib/utils";
import Header from "../common/Header/Header";
import Back from "../common/Back";
import Footer from "../common/Footer/Footer";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <Back title="Cart" />
        <div className="container mx-auto px-4 ">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Link
              to="/product"
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Products
            </Link>
          </div>
          <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
          <div className="text-center py-12">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Back title="Cart" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-4 mb-4 bg-white rounded-lg shadow-sm"
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${item.imageUrl}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-primary font-bold mt-1">
                    {formatCurrency(item.price)}
                  </p>

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      variant="ghost"
                      size="icon"
                      className="ml-auto text-red-500 hover:text-red-600"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <button className="w-full">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
