import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../src/context/AuthContext";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const { token, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Έλεγχος σύνδεσης...</p>
          </div>
        </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
