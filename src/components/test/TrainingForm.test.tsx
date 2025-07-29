import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TrainingForm from "../../components/training/TrainingForm";

describe("TrainingForm", () => {
    it("συμπληρώνει τη φόρμα και καλεί το onSubmit", async () => {
        const mockOnSubmit = vi.fn();
        const personnelList = [
            { id: "1", name: "Γιώργος Παπαδόπουλος" },
            { id: "2", name: "Μαρία Νικολάου" },
        ];

        render(<TrainingForm onSubmit={mockOnSubmit} personnelList={personnelList} />);

        fireEvent.change(screen.getByPlaceholderText("Περιγραφή Εκπαίδευσης"), {
            target: { value: "Νέα Εκπαίδευση" },
        });

        fireEvent.change(screen.getByPlaceholderText("Τοποθεσία"), {
            target: { value: "Σαλαμίνα" },
        });

        // Επιλέγουμε με βάση name τα input[type="date"]
        const fromInput = document.querySelector('input[name="from"]') as HTMLInputElement;
        const toInput = document.querySelector('input[name="to"]') as HTMLInputElement;

        fireEvent.change(fromInput, { target: { value: "2025-08-01" } });
        fireEvent.change(toInput, { target: { value: "2025-08-10" } });

        fireEvent.change(screen.getByPlaceholderText("Βαθμολογία (0-100)"), {
            target: { value: "85" },
        });

        // ✅ Διορθωμένος τρόπος για select multiple
        const select = screen.getByLabelText("Προσωπικό που έχει διέλθει:") as HTMLSelectElement;
        const options = Array.from(select.options);

        options.forEach((option) => {
            if (["1", "2"].includes(option.value)) {
                option.selected = true;
            }
        });

        fireEvent.change(select); // δεν περνάμε target.options!

        fireEvent.click(screen.getByRole("button", { name: /Αποθήκευση/i }));

        await waitFor(() =>
            expect(mockOnSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                    description: "Νέα Εκπαίδευση",
                    location: "Σαλαμίνα",
                    from: "2025-08-01",
                    to: "2025-08-10",
                    success_rate: 85,
                    personnel: ["1", "2"],
                }),
                expect.anything()
            )
        );
    });
});

