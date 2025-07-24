/*import { useState, useEffect } from "react";

interface AuthState {
    token: string | null;
    role: string | null;
    email: string | null;
}

export default function useAuth() {
    const [auth, setAuth] = useState<AuthState>({
        token: null,
        role: null,
        email: null,
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const email = localStorage.getItem("email");

        setAuth({
            token: token && token !== "undefined" ? token : null,
            role: role && role !== "undefined" ? role : null,
            email: email && email !== "undefined" ? email : null,
        });

        setIsLoading(false);
    }, []);

    return { ...auth, isLoading };
}

 */