import React, { useState } from "react";
import { Bg } from "../../../../assets/images/Index";
import { useRegister } from "../../../../api/auth/action";
import { useNavigate } from "react-router-dom";

const SignupCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "customer",
  });

  const { mutate: registerUser, isPending, error } = useRegister();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData, {
      onSuccess: () => {
        navigate("/signUp");
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-contain"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center">
            {error.response?.data?.msg || "Something went wrong!"}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
              placeholder="First name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
              placeholder="Last name"
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
            placeholder="Example@gmail.com"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
            placeholder="Address"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
            placeholder="Password"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
            placeholder="+251 _ _ _ _ _ _ _ _"
          />
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2 font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-yellow-400 focus:ring-indigo-500"
            }`}
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupCustomer;
