import React from "react";
import { Navigate } from "react-router";

export const PrivateRouter = ({ children }) => {
  const isLogin = Boolean(localStorage.getItem("accessToken"));
  return isLogin ? children : <Navigate to="/login" replace />;
};
