import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

export const AuthRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" /> : <Outlet />;
};
