// src/api/axiosInstance.js

import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api", // replace with your backend API URL
  timeout: 10000, // request timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add the JWT token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");

    // Assuming you're storing the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error scenarios (e.g., token expiration, network errors)
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login or handle token refresh
        console.log("Unauthorized, redirecting to login...");
        // Add your logic for redirecting to login or refreshing the token
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
