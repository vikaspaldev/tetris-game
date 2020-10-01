import React, { useState } from "react";
import { useInterval } from "../useInterval";
import { render, waitFor } from "@testing-library/react";

const TestComponent = ({ delay }) => {
  const [counter, setCounter] = useState(0);

  useInterval(() => {
    setCounter(counter + 1);
  }, [delay]);

  return <div>Counter: {counter}</div>;
};

describe("useInterval", () => {
  it.skip("should render with 100ms delay", async () => {
    const { getByText } = render(<TestComponent delay={100} />);
    expect(getByText(/Counter: /i).textContent).toBe("Counter: 0");

    await waitFor(
      () => {
        expect(getByText(/Counter: /i).textContent).toBe("Counter: 1");
      },
      { interval: 100 },
    );
  });

  it("should not trigger callback when delay is not passed", async () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText(/Counter: /i).textContent).toBe("Counter: 0");

    await waitFor(
      () => {
        expect(getByText(/Counter: /i).textContent).toBe("Counter: 1");
      },
      { interval: 100 },
    );
  });
});
