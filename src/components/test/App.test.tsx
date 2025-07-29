import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "../../App";

describe("App component", () => {
    it("κάνει render χωρίς σφάλμα", () => {
        render(<App />);
    });
});
