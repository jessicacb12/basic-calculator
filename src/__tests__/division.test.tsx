import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("Calculator > Division Operator", () => {
  test("should be able to division properly", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "0" }));

    fireEvent.click(await screen.findByRole("button", { name: "÷" }));

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "50 ÷ 25 = 2"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });

  test("should be able to calculate initial negative value properly", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "-" }));
    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "0" }));

    fireEvent.click(await screen.findByRole("button", { name: "÷" }));

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "-50 ÷ 25 = -2"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });

  test("should be able to calculate later negative value properly", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "0" }));

    fireEvent.click(await screen.findByRole("button", { name: "÷" }));

    fireEvent.click(await screen.findByRole("button", { name: "-" }));
    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "50 ÷ -25 = -2"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });
});
