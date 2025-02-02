import React from "react";
import { Link } from "react-router-dom";
import {
  Vegetables2,
  Vegi6,
  Grocery,
  Shop,
} from "../../../assets/images/Index";

const MonthlySubscription = () => {
  return (
    <div className="bg-[#e0f7fa] py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <div className="flex items-center justify-center flex-1">
          <img
            src={Grocery}
            alt="Groceries Image 1"
            className="w-60 h-60 object-contain"
          />
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-lg font-semibold text-gray-700">
            Fresh & Convenient
          </h2>
          <h1 className="text-4xl font-bold text-gray-800 my-4">
            Subscribe Monthly for Fresh Groceries
          </h1>
          <p className="text-gray-600 mb-8">
            Ensure your pantry is always stocked with fresh produce and
            groceries. Subscribe to our monthly plan and enjoy regular
            deliveries of the finest organic products right to your doorstep!
          </p>
          <Link
            to="/Subscription"
            className="inline-block bg-teal-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-teal-700"
          >
            Subscribe Now
          </Link>
        </div>
        <div className="flex items-center justify-center flex-1 mt-6 md:mt-0">
          <img
            src={Shop}
            alt="Groceries Image 2"
            className="w-80 h-64 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default MonthlySubscription;
