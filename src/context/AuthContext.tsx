import React, { createContext, useContext, useEffect, useState } from "react";

// Τύπος για το context
interface AuthContextType {
    token: string | null;
    role: string | null;
    email: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

// Δημιουργία context με default τιμές
const AuthContext = createContext<AuthContextType>({
    token: null,
    role: null,
    email: null,
    isLoading: true,
    login: async () => {},
    logout: () => {},
});

// Πάροχος
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Αρχική φόρτωση από localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        const storedEmail = localStorage.getItem("email");

        setToken(storedToken && storedToken !== "undefined" ? storedToken : null);
        setRole(storedRole && storedRole !== "undefined" ? storedRole : null);
        setEmail(storedEmail && storedEmail !== "undefined" ? storedEmail : null);
        setIsLoading(false);
    }, []);

    // 🔐 Login – κάνε POST στο backend για token
    const login = async (email: string, password: string) => {
        const response = await fetch("http://localhost:5001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", data.email);

        setToken(data.token);
        setRole(data.role);
        setEmail(data.email);
    };

    // 🔓 Logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");

        setToken(null);
        setRole(null);
        setEmail(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, email, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook για χρήση σε components
const useAuth = () => useContext(AuthContext);
export default useAuth;
