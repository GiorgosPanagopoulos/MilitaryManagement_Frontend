import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TrainingList from "../training/TrainingList";
import { Training } from "../../types/Training";

describe("TrainingList", () => {
    const mockTrainings: Training[] = [
        {
            id: "1",
            description: "Βασική Εκπαίδευση",
            location: "Σαλαμίνα",
            from: "2025-01-01",
            to: "2025-01-10",
            personnel: ["101", "102"],
            success_rate: 85,
        },
    ];

    const personnelMap = {
        "101": "Ανθλχίας Παπαδόπουλος",
        "102": "Σημ/τής Γεωργίου",
    };

    const onEdit = vi.fn();
    const onDelete = vi.fn();

    beforeEach(() => {
        render(
            <TrainingList
                trainings={mockTrainings}
                personnelMap={personnelMap}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );
    });

    it("εμφανίζει τις εκπαιδεύσεις", () => {
        expect(screen.getByText("Βασική Εκπαίδευση")).toBeInTheDocument();
        expect(screen.getByText("Σαλαμίνα")).toBeInTheDocument();
        expect(screen.getByText("2025-01-01 έως 2025-01-10")).toBeInTheDocument();
    });

    it("εμφανίζει λεπτομέρειες προσωπικού όταν γίνει expand", () => {
        fireEvent.click(screen.getByText("Λεπτομέρειες"));

        expect(screen.getByText("Ανθλχίας Παπαδόπουλος")).toBeInTheDocument();
        expect(screen.getByText("Σημ/τής Γεωργίου")).toBeInTheDocument();
        expect(screen.getByText("Βαθμολογία:")).toBeInTheDocument();
    });

    it("καλεί onEdit όταν πατηθεί το κουμπί Επεξεργασία", () => {
        fireEvent.click(screen.getByText("Επεξεργασία"));
        expect(onEdit).toHaveBeenCalledWith(mockTrainings[0]);
    });

    it("καλεί onDelete όταν πατηθεί το κουμπί Διαγραφή", () => {
        fireEvent.click(screen.getByText("Διαγραφή"));
        expect(onDelete).toHaveBeenCalledWith("1");
    });

    it("κάνει αναζήτηση", () => {
        fireEvent.change(screen.getByPlaceholderText(/Αναζήτηση/i), {
            target: { value: "Βασική" },
        });
        expect(screen.getByText("Βασική Εκπαίδευση")).toBeInTheDocument();
    });
});
