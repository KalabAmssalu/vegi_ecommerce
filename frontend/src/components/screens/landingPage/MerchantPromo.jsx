import React from "react";
import { Link } from "react-router-dom";
import { Vegetables2, Vegi6 } from "../../../assets/images/Index";
const MerchantPromo = () => {
  return (
    <div className="bg-[#f0f4c3] py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <div className="flex items-center justify-center flex-1">
          <img
            src={Vegi6}
            alt="Merchant Promo 1"
            className="w-56 h-56 object-contain"
          />
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-lg font-semibold text-gray-700">
            Organic & Garden Fresh
          </h2>
          <h1 className="text-4xl font-bold text-gray-800 my-4">
            Want to sell your quality products?
          </h1>
          <p className="text-gray-600 mb-8">
            Join our platform and reach a wider audience with your fresh and
            organic products. Apply now to become a merchant!
          </p>
          <Link
            to="/signUp"
            className="inline-block bg-primary text-white py-2 px-4 rounded-lg text-md hover:bg-yellow-400"
          >
            Apply Now
          </Link>
        </div>
        <div className="flex items-center justify-center flex-1 mt-6 md:mt-0">
          <img
            src={Vegetables2}
            alt="Merchant Promo 2"
            className="w-56 h-56 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MerchantPromo;
