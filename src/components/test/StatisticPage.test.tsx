import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, beforeAll, vi, expect } from "vitest";
import StatisticsPage from "../../pages/StatisticsPage";

// ✅ Mock για ResizeObserver
beforeAll(() => {
    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});

describe("StatisticsPage", () => {
    beforeAll(() => {
        global.fetch = vi.fn().mockImplementation((url: string) => {
            if (url.includes("/stats/personnel-by-unit")) {
                return Promise.resolve({
                    ok: true,
                    json: () =>
                        Promise.resolve([
                            { name: "Μονάδα Α", value: 5 },
                            { name: "Μονάδα Β", value: 3 },
                        ]),
                });
            }

            if (url.includes("/stats/personnel-by-rank")) {
                return Promise.resolve({
                    ok: true,
                    json: () =>
                        Promise.resolve([
                            { name: "Ανθυποπλοίαρχος", value: 4 },
                            { name: "Σημαιοφόρος", value: 2 },
                        ]),
                });
            }

            if (url.includes("/stats/training-participation")) {
                return Promise.resolve({
                    ok: true,
                    json: () =>
                        Promise.resolve([
                            { training: "Εκπαίδευση Α", participants: 2, averageScore: 85 },
                            { training: "Εκπαίδευση Β", participants: 1, averageScore: 75 },
                        ]),
                });
            }

            return Promise.reject(new Error("Unhandled request"));
        });
    });

    it("renders all chart titles correctly", async () => {
        render(<StatisticsPage />);

        await waitFor(() => {
            // ✅ Ελέγχουμε βάση του actual DOM που παρέχει το component
            expect(
                screen.getByText("Προσωπικό ανά Μονάδα")
            ).toBeInTheDocument();

            expect(
                screen.getByText("Προσωπικό ανά Βαθμό")
            ).toBeInTheDocument();

            expect(
                screen.getByText("Συμμετοχές & Μ.Ο. Βαθμολογίας Εκπαίδευσης")
            ).toBeInTheDocument();
        });
    });
});
