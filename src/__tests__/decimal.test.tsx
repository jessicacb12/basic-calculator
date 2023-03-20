import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("Calculator > Decimal Point", () => {
  test("should not be input in the beginning of calculation", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "." }));

    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });

  test("should not be input in the beginning of a number", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "+" }));
    fireEvent.click(await screen.findByRole("button", { name: "." }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "5 +"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });

  test("should not exist more than 1 in a number", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "." }));
    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "." }));
    fireEvent.click(await screen.findByRole("button", { name: "+" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "5.5 +"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });

  test("should be deleted if it exists at the end of a number", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "." }));
    fireEvent.click(await screen.findByRole("button", { name: "+" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "5 +"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });

  test("should work properly in calculation", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "4" }));
    fireEvent.click(await screen.findByRole("button", { name: "." }));
    fireEvent.click(await screen.findByRole("button", { name: "5" }));

    fireEvent.click(await screen.findByRole("button", { name: "+" }));

    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "4.5 + 5 = 9.5"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });
});
