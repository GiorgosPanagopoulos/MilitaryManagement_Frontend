import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useAuth from "../../context/AuthContext";
import { AuthContext } from "../../context/AuthContext";

describe("useAuth Hook", () => {
    it("επιστρέφει τις τιμές του AuthContext", () => {
        const mockLogin = vi.fn();
        const mockLogout = vi.fn();

        const mockContext = {
            token: "mock-token",
            role: "admin",
            email: "admin@example.com",
            isLoading: false,
            login: mockLogin,
            logout: mockLogout,
        };

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <AuthContext.Provider value={mockContext}>{children}</AuthContext.Provider>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        expect(result.current.token).toBe("mock-token");
        expect(result.current.role).toBe("admin");
        expect(result.current.email).toBe("admin@example.com");
        expect(result.current.isLoading).toBe(false);
        expect(result.current.login).toBe(mockLogin);
        expect(result.current.logout).toBe(mockLogout);
    });
});
