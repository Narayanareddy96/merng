import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const AuthRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" /> : <Outlet />;
};

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export {AuthRoute,ProtectedRoute};