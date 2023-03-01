import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("Calculator App", () => {
  test("should render properly", async () => {
    render(<App />);
    expect(
      await screen.findByRole("button", { name: "C" })
    ).toBeInTheDocument();
  });

  test("should be able to add properly", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "5" }));

    fireEvent.click(await screen.findByRole("button", { name: "+" }));

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "7" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByText("23 + 27 = 50")).toBeInTheDocument();
  });
});
