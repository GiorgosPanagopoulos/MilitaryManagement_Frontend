import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export default function AdminRoute({ children }: Props) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token || role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
