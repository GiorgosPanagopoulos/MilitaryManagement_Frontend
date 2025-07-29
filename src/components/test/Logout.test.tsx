import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import Logout from "../../pages/Logout";
import { MemoryRouter } from "react-router-dom";
import * as AuthContextModule from "../../context/AuthContext";

// ✅ Mock το useNavigate
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

// ✅ Mock το useAuth
vi.mock("../../context/AuthContext");

describe("Logout component", () => {
    const mockLogout = vi.fn();

    beforeEach(() => {
        (AuthContextModule as any).default = () => ({
            logout: mockLogout,
        });
    });

    it("καλεί logout() και κάνει redirect", async () => {
        render(
            <MemoryRouter>
                <Logout />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(mockLogout).toHaveBeenCalled();
        });
    });
});
