import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, beforeEach, vi } from "vitest";

// Κάνουμε mock το AuthContext
vi.mock("../../context/AuthContext", () => {
    return {
        __esModule: true,
        default: () => ({
            token: "mock-token",
            role: "admin",
            email: "admin@example.com",
            logout: vi.fn(),
            isLoading: false,
        }),
    };
});

import Navbar from "../navbar/Navbar";

describe("Navbar component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("προβάλλει το email του χρήστη", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const emailElements = screen.getAllByText(/admin@example.com/i);
        expect(emailElements.length).toBeGreaterThan(0); // ή .toHaveLength(2) αν θες ακριβή έλεγχο
    });

    it("προβάλλει τα βασικά links", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByText(/Προσωπικό/i)).toBeInTheDocument();
        expect(screen.getByText(/Εκπαίδευση/i)).toBeInTheDocument();
        expect(screen.getByText(/Στατιστικά/i)).toBeInTheDocument();
        expect(screen.getByText(/Ημερολόγιο/i)).toBeInTheDocument();
        expect(screen.getByText(/Αποσύνδεση/i)).toBeInTheDocument();
        expect(screen.getByText(/Διαχείριση/i)).toBeInTheDocument();
    });
});
