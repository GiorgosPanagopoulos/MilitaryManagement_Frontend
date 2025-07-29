import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AdminPage from "../../pages/AdminPage";
import { AuthContext } from "../../context/AuthContext";

describe("Admin Page", () => {
    it("renders χωρίς σφάλματα και περιέχει τίτλο", async () => {
        const mockContext = {
            token: "mock-token",
            role: "admin",
            email: "admin@example.com",
            isLoading: false,
            login: vi.fn(),
            logout: vi.fn(),
        };

        render(
            <AuthContext.Provider value={mockContext}>
                <AdminPage />
            </AuthContext.Provider>
        );

        // Ελέγχει ότι εμφανίζεται ο τίτλος της σελίδας
        await waitFor(() =>
            expect(screen.getByText(/Πίνακας Χρηστών/i)).toBeInTheDocument()
        );
    });
});
