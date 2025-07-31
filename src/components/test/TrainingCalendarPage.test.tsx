import { render, screen } from "@testing-library/react";
import TrainingCalendarPage from "../../pages/TrainingCalendarPage";
import { vi } from "vitest";

// ✅ Mock δεδομένα εκπαίδευσης
const mockTrainings = [
  {
    _id: "1",
    title: "Εκπαίδευση Α",
    start: "2025-08-01",
    end: "2025-08-03",
  },
];

// ✅ Mock axios για το endpoint /training/calendar
vi.mock("../../axios", () => ({
  default: {
    get: vi.fn((url: string) => {
      if (url === "/training/calendar") {
        return Promise.resolve({ data: mockTrainings });
      }
      return Promise.reject(new Error("Unknown endpoint"));
    }),
  },
}));

describe("TrainingCalendarPage", () => {
  it("renders calendar with training events", async () => {
    render(<TrainingCalendarPage />);

    // ✅ Έλεγχος τίτλου της σελίδας
    expect(
        await screen.findByRole("heading", {
          name: /Ημερολόγιο Εκπαιδεύσεων/i,
        })
    ).toBeInTheDocument();

    // ✅ Αξιόπιστος έλεγχος για το training event με τίτλο "Εκπαίδευση Α"
    expect(
        await screen.findByText((content) => content.includes("Εκπαίδευση Α"))
    ).toBeInTheDocument();
  });
});
