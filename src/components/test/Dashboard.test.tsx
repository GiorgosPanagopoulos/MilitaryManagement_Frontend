import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

describe("Dashboard Page", () => {
    it("renders χωρίς σφάλματα", () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        // Ελέγχουμε ότι υπάρχουν τα κουμπιά/sections με βάση τα labels τους
        expect(screen.getAllByText(/Προσωπικό/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Εκπαίδευση/i)).toBeInTheDocument();
        expect(screen.getByText(/Στατιστικά/i)).toBeInTheDocument();
        expect(screen.getByText(/Ημερολόγιο/i)).toBeInTheDocument();
    });
});
