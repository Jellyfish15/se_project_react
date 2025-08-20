import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuthorized, children }) {
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
