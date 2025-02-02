import React, { useState } from "react";
import { Carrot, Onion, vegi1 } from "../../../assets/images/Index";

const CartItems = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Heirloom tomato",
      price: 5.99,
      weight: "1 lb",
      quantity: 1,
      image: Onion,
    },
    {
      id: 2,
      name: "Organic ginger",
      price: 6.5,
      weight: "0.5 lb",
      quantity: 2,
      image: Carrot,
    },
  ]);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shipping = 3.99;
    const tax = 2.0;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  };

  const totals = calculateTotal();

  return (
    <div
      className="flex justify-center items-center min-h-screen "
      style={{ backgroundImage: `url(${vegi1})` }}
    >
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Cart Items</h2>
        <p className="text-lg text-gray-600 mb-8">Fresh — August 21, 2023</p>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="  md:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">{item.weight}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} / lb
                  </p>
                </div>
                <div className="text-lg font-medium text-gray-800">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className=" gap-4 md:w-1/3 p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Order summary
            </h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">
                ${totals.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800">
                ${totals.shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-800">${totals.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl mb-4">
              <span>Total</span>
              <span>${totals.total.toFixed(2)}</span>
            </div>
            <button className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Continue to payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
