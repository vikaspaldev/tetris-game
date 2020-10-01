import React from "react";
import { render } from "@testing-library/react";
import BrickController from "../BrickController";

describe("<BrickController />", () => {
  it("should render successfully", () => {
    const { container } = render(<BrickController canPlayGame={true} />);
    expect(container).toMatchSnapshot();
  });
});
