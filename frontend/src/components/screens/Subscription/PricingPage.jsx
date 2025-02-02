import React from "react";
import PricingCard from "./PricingCard";

const plans = [
  {
    plan: "Basic",
    price: "9.99",
    features: [
      "10 Kg Onion's",
      "5 Kg Tomato's",
      "2 Kg Garlic ",

      "1 kg Carrot's",
      "1 Kg Berbere",
      "1 Kg Bannana, Apples & Grapes",
    ],
    planType: "basic",
  },
  {
    plan: "Standard",
    price: "19.99",
    features: [
      "15 Kg Onion's",
      "7 Kg Tomato's",
      "3 Kg Garlic",

      "1 Kg Red paper",
      "2 Kg Berbere and shiro",
      "2 Kg Bannana, Apples & Grapes",
    ],
    planType: "standard",
  },
  {
    plan: "Premium",
    price: "29.99",
    features: [
      "15 Kg Onion's & 2 Kg Green Onion",
      "10 Kg Tomato's ",
      "3 Kg Garlic  ",

      "1 Kg Red paper & Salt",
      "2 Kg Berbere, shiro & Turmeric ",
      "3 Kg Bannana, Apples & Grapes",
    ],
    planType: "premium",
  },
];

const PricingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="p-8 rounded-lg shadow-lg my-8">
        <div className="flex justify-center mb-8 text-4xl text-black font-bold">
          Monthly subscription plan
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.planType}
              plan={plan.plan}
              price={plan.price}
              features={plan.features}
              planType={plan.planType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
