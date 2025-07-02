import React, { useState } from "react";
import axios from "../axios"; // ✅ Βεβαιώσου ότι υπάρχει το αρχείο axios.ts
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// ✅ Τύπος για την απάντηση του login
interface LoginResponse {
  token: string;
  role: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      console.log("✅ Login response:", res.data); // <-- Εδώ βλέπεις αν επιστρέφει σωστά

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      toast.success("Επιτυχής σύνδεση");
      navigate("/");
    } catch (err) {
      console.error(err);
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
