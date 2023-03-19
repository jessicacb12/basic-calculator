import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("Calculator > Multiplication Operator", () => {
  test("should be able to multiply properly", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "3" }));

    fireEvent.click(await screen.findByRole("button", { name: "x" }));

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "7" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "23 x 27 = 621"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });

  test("should be able to calculate initial negative value properly", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "-" }));
    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "3" }));

    fireEvent.click(await screen.findByRole("button", { name: "x" }));

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "7" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "-23 x 27 = -621"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });

  test("should be able to calculate later negative value properly", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "3" }));

    fireEvent.click(await screen.findByRole("button", { name: "x" }));

    fireEvent.click(await screen.findByRole("button", { name: "-" }));
    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "7" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "23 x -27 = -621"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });
});
