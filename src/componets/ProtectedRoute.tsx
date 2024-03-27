import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isStaff, children }: any) => {
  if (!isStaff) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
