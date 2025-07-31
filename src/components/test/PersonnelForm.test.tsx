import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PersonnelForm from "../personnel/PersonnelForm";

describe("PersonnelForm", () => {
  it("renders all input fields", () => {
    render(<PersonnelForm onSubmit={vi.fn()} />);

    expect(screen.getByPlaceholderText("Όνομα")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Επώνυμο")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Βαθμός")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Αρ. Μητρώου")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Τηλέφωνο")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Μονάδα")).toBeInTheDocument();
  });

  it("submits form with correct data", async () => {
    const mockSubmit = vi.fn().mockResolvedValue({ id: "123" });

    render(<PersonnelForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Όνομα"), {
      target: { value: "Νίκος" },
    });
    fireEvent.change(screen.getByPlaceholderText("Επώνυμο"), {
      target: { value: "Παπαδόπουλος" },
    });
    fireEvent.change(screen.getByPlaceholderText("Βαθμός"), {
      target: { value: "Ανθυποπλοίαρχος" },
    });
    fireEvent.change(screen.getByPlaceholderText("Αρ. Μητρώου"), {
      target: { value: "PN12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("Τηλέφωνο"), {
      target: { value: "6981234567" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "nikos@test.gr" },
    });
    fireEvent.change(screen.getByPlaceholderText("Μονάδα"), {
      target: { value: "Διοίκηση" },
    });

    fireEvent.click(screen.getByText("Αποθήκευση"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: "Νίκος",
            lastName: "Παπαδόπουλος",
            rank: "Ανθυποπλοίαρχος",
            serviceNumber: "PN12345",
            phone: "6981234567",
            email: "nikos@test.gr",
            unit: "Διοίκηση",
          })
      );
    });
  });
});

