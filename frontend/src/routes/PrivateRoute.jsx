import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.token)?.length > 0;

  return isAuthenticated ? children : <Navigate to="/signUp" />;
};

export default PrivateRoute;
