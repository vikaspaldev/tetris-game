import React from "react";
import { render } from "@testing-library/react";
import BrickBlock from "../BrickBlock";

describe("<BrickBlock />", () => {
  it("should render successfully", () => {
    const { container } = render(<BrickBlock row={2} col={1} />);
    expect(container).toMatchSnapshot();
  });
});
