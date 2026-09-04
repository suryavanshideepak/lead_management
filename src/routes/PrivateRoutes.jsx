import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Component />;
};

export default PrivateRoute;