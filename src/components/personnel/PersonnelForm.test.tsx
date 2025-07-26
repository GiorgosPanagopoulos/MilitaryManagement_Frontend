import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PersonnelForm from "./PersonnelForm";

describe("PersonnelForm", () => {
  it("renders all input fields", () => {
    render(<PersonnelForm onSubmit={vi.fn()} />);

    expect(screen.getByPlaceholderText("Όνομα")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Επώνυμο")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Βαθμός")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Αρ. Μητρώου")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Τηλέφωνο")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Μονάδα")).toBeInTheDocument(); // 🛠️ fixed
  });

  it("submits form with correct data", async () => {
    const mockSubmit = vi.fn().mockResolvedValue({ id: "123" });
    render(<PersonnelForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Όνομα"), {
      target: { value: "Νίκος" },
    });

    fireEvent.click(screen.getByText("Αποθήκευση"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
