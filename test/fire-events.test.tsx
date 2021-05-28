import { useState } from "react";
import { render, fireEvent } from "@app/test/test-utils";
import Button from "@app/components/atoms/Button";

interface Props {
  handleClick?: () => void;
}
const TestDom = ({ handleClick }: Props) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span data-tid="count">{count}</span>
      <Button
        type="primary"
        data-tid="button"
        onClick={() => {
          if (handleClick) handleClick();
          setCount(count + 1);
        }}
      >
        +
      </Button>
    </div>
  );
};

describe("Firing Events tests", () => {
  test("onClick test", () => {
    const handleClick = jest.fn();
    const { getByTid, debug } = render(
      <Button data-tid="button" onClick={handleClick}>
        버튼
      </Button>
    );
    const button = getByTid("button");
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test("count plus test", () => {
    const handleClick = jest.fn();
    const { getByTid, debug } = render(<TestDom handleClick={handleClick} />);
    const button = getByTid("button");
    const count = getByTid("count");
    expect(handleClick).toHaveBeenCalledTimes(0);
    expect(count.innerHTML).toBe("0");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(count.innerHTML).toBe("1");
  });
});
