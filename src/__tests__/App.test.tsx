import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Calculator App", () => {
  test("should render properly", async () => {
    render(<App />);
    expect(
      await screen.findByRole("button", { name: "C" })
    ).toBeInTheDocument();
  });
});
