import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Button from "./Button";
describe("Button component", () => {
  test("should be in the document", () => {
    const { getByTestId } = render(<Button data-testid="button" />);
    const buttonElement = getByTestId("button");
    expect(buttonElement).toBeInTheDocument();
  });
});
