import React from "react";
import { useLocation } from "react-router-dom";

const Back = ({ title }) => {
  const location = useLocation();
  return (
    <>
      <section
        className="relative w-full h-[25vh] bg-[url('/src/assets/images/cart-page-header-img.jpg')] bg-cover bg-center text-white text-center flex flex-col justify-center items-center"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="relative z-10">{title}</h1>
        <h2 className="relative z-10">
          Home / Pages / {location.pathname.split("/")[1]}
        </h2>
      </section>
      <div className="my-8"></div>
    </>
  );
};

export default Back;
