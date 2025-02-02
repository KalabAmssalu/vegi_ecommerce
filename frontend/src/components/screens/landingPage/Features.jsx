import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShieldAlt, FaTags } from "react-icons/fa";
import { Vegi4 } from "../../../assets/images/Index";

const Features = () => {
  return (
    <div
      className="min-h-screen py-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${Vegi4})` }}
    >
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-8">Our Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Delivery System */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <CiDeliveryTruck className="text-primary text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Delivery System</h2>
            <p className="text-gray-700">
              We offer a reliable and fast delivery system to ensure your
              products reach you on time, every time.
            </p>
          </div>
          {/* Safe Payment using Chapa */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaShieldAlt className="text-primary text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Safe Payment using Chapa
            </h2>
            <p className="text-gray-700">
              Experience secure and hassle-free payments with Chapa, ensuring
              your transactions are always safe.
            </p>
          </div>
          {/* Best Prices Offers */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaTags className="text-primary text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Best Prices Offers</h2>
            <p className="text-gray-700">
              Enjoy the best prices and amazing offers on a wide range of
              products, making shopping with us economical.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
