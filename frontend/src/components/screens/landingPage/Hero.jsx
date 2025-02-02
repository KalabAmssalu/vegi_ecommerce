import React from "react";
import { vegi2, Vegi6 } from "../../../assets/images/Index";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center  pt-16 ">
      <div className="text-center pt-10">
        <h1 className="text-4xl mb-5 font-bold font-serif">
          Welcome to Atklt Tera
        </h1>
        <p className="text-2xl mb-8 font-medium">
          We're Farmers, purveyors, and eaters of organically grown food.
        </p>
        {
          <Link
            to="/product"
            className="bg-primary text-white py-2 px-4 no-underline rounded text-lg hover:bg-amber-400"
          >
            Browse our shop
          </Link>
        }
      </div>
      <div className="flex justify-center gap-5 mt-10 mb-40">
        <img
          src={Vegi6}
          alt="Fresh Vegetables 1"
          className="w-72 h-auto rounded-lg p-2.5"
        />
        <img
          src={vegi2}
          alt="Fresh Vegetables 2"
          className="w-72 h-auto rounded-lg p-2.5"
        />
      </div>
    </div>
  );
};

export default Hero;
