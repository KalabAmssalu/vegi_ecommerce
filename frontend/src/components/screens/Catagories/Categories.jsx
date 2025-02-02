import React from "react";

import { Link } from "react-router-dom";
import { Catagory } from "../../../constant/landingConstant";

const Categories = () => {
  return (
    <div className="container mx-auto py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-20">
        Choose Your Featured Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ml-32 mr-32">
        {Catagory.map((category) => (
          <Link
            key={category.id}
            to={category.Link}
            className="bg-lime-100 p-4 rounded-lg shadow-md text-center cursor-pointer transform transition duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={category.Image}
                alt={category.name}
                className="w-44 h-44 mx-auto mb-4 relative "
              />
            </div>
            <div className="flex items-center justify-center mb-2">
              {category.Icon}
              <h3 className="text-lg font-semibold ml-2">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
