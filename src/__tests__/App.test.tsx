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

  test("should be able to perform addition properly", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "3" }));

    fireEvent.click(await screen.findByRole("button", { name: "+" }));

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "7" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "23 + 27 = 50"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });

  test("should be able to perform substraction properly", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "3" }));

    fireEvent.click(await screen.findByRole("button", { name: "-" }));

    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "7" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "23 - 27 = -4"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });

  test("should be able to perform multiplication properly", async () => {
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

  test("should be able to perform division properly", async () => {
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

  test("should be able to prioritize multiplication and division before other calculations", async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: "5" }));
    fireEvent.click(await screen.findByRole("button", { name: "+" }));
    fireEvent.click(await screen.findByRole("button", { name: "3" }));

    fireEvent.click(await screen.findByRole("button", { name: "x" }));

    fireEvent.click(await screen.findByRole("button", { name: "4" }));
    fireEvent.click(await screen.findByRole("button", { name: "÷" }));
    fireEvent.click(await screen.findByRole("button", { name: "2" }));
    fireEvent.click(await screen.findByRole("button", { name: "=" }));

    expect(await screen.findByTestId("calculator-screen")).toHaveTextContent(
      "5 + 3 x 4 ÷ 2 = 11"
    );

    fireEvent.click(await screen.findByRole("button", { name: "C" }));
    expect(
      await screen.findByTestId("calculator-screen")
    ).toBeEmptyDOMElement();
  });
});
