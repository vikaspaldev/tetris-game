import React from "react";
import { render } from "@testing-library/react";
import { BrickComponent } from "../BrickComponent";

describe("<BrickComponent />", () => {
  it("should render successfully", () => {
    const grid = [[{ row: 0, col: 1, bgColor: "red" }]];
    const { container } = render(<BrickComponent grid={grid} />);
    expect(container).toMatchSnapshot();
  });

  it("should not render empty brick", () => {
    const grid = [[null]];
    const { container } = render(<BrickComponent grid={grid} />);
    expect(container).toMatchSnapshot();
  });
});
