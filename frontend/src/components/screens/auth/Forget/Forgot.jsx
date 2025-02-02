import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bg } from "../../../../assets/images/Index";
const Forgot = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Forgot Password Email:", email);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-contain"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="example@gmail.com"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-medium text-white bg-primary rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Reset Link
          </button>
          <p className="text-sm text-center text-gray-600">
            Remembered your password?{" "}
            <Link to="/signUp" className="text-sky-500 hover:text-indigo-800">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
