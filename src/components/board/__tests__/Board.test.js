import React from "react";
import { render } from "@testing-library/react";
import Board from "../Board";

describe("<Board />", () => {
  it("should render successfully", () => {
    const { container } = render(<Board />);
    expect(container).toMatchSnapshot();
  });
});
