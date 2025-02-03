import React, { useState } from "react";
import { Bg } from "../../../../assets/images/Index";
import { flattenFormData } from "../../../../lib/flattendData";
import { useMerchantRegister } from "../../../../api/auth/action";
import { useNavigate } from "react-router-dom";

const Signup_merchant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    trade_permit: null,
    role: "merchant",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // Store the actual File object
      }));
    }
  };

  const { mutate: registerMerchant } = useMerchantRegister();
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = flattenFormData(formData); // Flatten form data properly

    registerMerchant(data, {
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
          Create a Merchant Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2">
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="First name"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="example@gmail.com"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="+251 _ _ _ _ _ _ _ _"
              />
            </div>
            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Address"
              />
            </div>
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload trade permit
            </label>
            <input
              type="file"
              name="trade_permit"
              onChange={handleFileUpload}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-medium text-white bg-primary rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup_merchant;
