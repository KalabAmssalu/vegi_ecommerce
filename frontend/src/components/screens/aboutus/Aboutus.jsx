import React from "react";
import { Danat, Etsub, Gabi, Reyan } from "../../../assets/images/Index";

const AboutUs = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
        About Us
      </h1>
      <div className="mb-12 bg-orange-50 p-10">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
          Our Company
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Welcome to our company! We are dedicated to providing the best quality
          organic and fresh produce directly from farms to your table. Our
          mission is to promote healthy eating habits and support local farmers.
        </p>
      </div>
      <div className="mb-12 bg-red-50 p-10">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
          Our Mission
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Our mission is to deliver the highest quality organic products to our
          customers while supporting sustainable farming practices. We believe
          in the importance of healthy eating and are committed to making fresh,
          organic produce accessible to everyone.
        </p>
      </div>
      <div className="mb-16 bg-orange-50 p-10">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
          Our Values
        </h2>
        <ul className="list-disc list-inside text-gray-600 leading-relaxed">
          <li>Quality: We prioritize quality above all else.</li>
          <li>
            Sustainability: We support eco-friendly and sustainable practices.
          </li>
          <li>
            Community: We are committed to supporting local farmers and
            communities.
          </li>
          <li>
            Integrity: We conduct our business with honesty and transparency.
          </li>
        </ul>
      </div>
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <img
              src={Danat}
              alt="Team Member 1"
              className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-700">Danat Tewodros</h3>
            <p className="text-gray-600">CEO</p>
          </div>
          <div className="text-center">
            <img
              src={Gabi}
              alt="Team Member 2"
              className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-700">
              Gebrelua Theodros
            </h3>
            <p className="text-gray-600">COO</p>
          </div>
          <div className="text-center">
            <img
              src={Etsub}
              alt="Team Member 3"
              className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-700">Etsubdink Fikru</h3>
            <p className="text-gray-600">CTO</p>
          </div>
          <div className="text-center">
            <img
              src={Reyan}
              alt="Team Member 4"
              className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-700">Reyan Geragn</h3>
            <p className="text-gray-600">CFO</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
