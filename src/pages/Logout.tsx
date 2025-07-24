import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout(); // Καθαρισμός auth state μέσω context
    toast.info("Αποσυνδεθήκατε");
    navigate("/login");
  }, [logout, navigate]);

  return null;
}