import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../src/context/AuthContext"; // ✅ σωστό path

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const { token } = useAuth(); // Παίρνουμε το token από το context
  const location = useLocation();

  // Αν δεν υπάρχει token, κάνε redirect στο /login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}