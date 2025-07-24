import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password); // 🔁 καλούμε login από το context
      toast.success("Επιτυχής σύνδεση");
      navigate("/");
    } catch (err) {
      console.error("❌ Login error:", err);
      toast.error("Λάθος στοιχεία");
    }
  };

  return (
      <div className="flex justify-center mt-10">
        <form onSubmit={handleLogin} className="p-6 border rounded w-96 shadow">
          <h2 className="text-xl font-bold mb-4">Σύνδεση</h2>
          <input
              type="email"
              placeholder="Email"
              className="input w-full mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <input
              type="password"
              placeholder="Κωδικός"
              className="input w-full mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Είσοδος
          </button>
        </form>
      </div>
  );
}