import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.info("Αποσυνδεθήκατε");
    navigate("/login");
  }, [navigate]);

  return null;
}
