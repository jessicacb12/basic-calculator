import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("Calculator App", () => {
  test("should render properly", async () => {
    render(<App />);
    expect(
      await screen.findByRole("button", { name: "C" })
    ).toBeInTheDocument();
  });

  test("should be able to delete character properly", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "1" }));
    fireEvent.click(await screen.findByRole("button", { name: "←" }));

    fireEvent.click(await screen.findByRole("button", { name: "2" }));

    fireEvent.click(await screen.findByRole("button", { name: "+" }));
    fireEvent.click(await screen.findByRole("button", { name: "←" }));
    fireEvent.click(await screen.findByRole("button", { name: "x" }));

    fireEvent.click(await screen.findByRole("button", { name: "3" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "2 x 3 = 6"
    );
    fireEvent.click(await screen.findByRole("button", { name: "←" }));
    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "2 x 3 = 6"
    );
  });
});
