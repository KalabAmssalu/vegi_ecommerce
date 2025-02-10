import { useState } from "react";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../lib/utils";
import { useCreatePayment } from "../../api/order/action";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    paymentMethod: "chapa",
  });

  const { items, total } = useSelector((state) => state.cart);
  const shippingCost = 5.0; // Example shipping cost
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate: createPayment } = useCreatePayment();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      products: items,
      amount: total,
      currency: "ETB",
      ...formData,
    };
    createPayment(data, {
      onSuccess: (data) => {},
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(data);
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 mb-10 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Checkout</h2>

        {/* Order Summary */}
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>

          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-700">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <hr className="my-2" />

          <div className="flex justify-between text-gray-700">
            <span>Delivery Fee</span>
            <span>{formatCurrency(shippingCost)}</span>
          </div>
          <hr className="my-2" />

          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(total + shippingCost)}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
              required
            />
          </div>

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
              required
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            >
              <option value="chapa">Chapa</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Place Order & Pay
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
