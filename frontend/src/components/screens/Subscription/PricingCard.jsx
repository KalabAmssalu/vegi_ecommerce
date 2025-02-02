// src/components/PricingCard.js
import { Award, Bookmark } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const PricingCard = ({ plan, price, features = [], planType }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/subscription", { state: { plan: planType, price } });
  };

  return (
    <div className="relative bg-gradient-to-b from-primary to-green-200 text-black rounded-lg p-8 shadow-2xl hover:bg-gradient-to-t hover:from-primary hover:to-green-200 hover:cursor-pointer">
      <Bookmark className="absolute top-0 right-0 text-white" size={35} />
      <h2 className="text-3xl font-bold mb-4 text-white">{plan}</h2>
      <p className="text-4xl font-bold mb-4 text-white">${price}/month</p>
      <ul className="mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2 ">
            <span className="mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={handleGetStarted}
        className="w-full py-2 bg-white text-primary  font-bold rounded-lg hover:bg-gray-100"
      >
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;
