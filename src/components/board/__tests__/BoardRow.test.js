import React from "react";
import { render } from "@testing-library/react";
import BoardRow from "../BoardRow";

describe("<BoardRow />", () => {
  it("should render successfully", () => {
    const { container } = render(<BoardRow />);
    expect(container).toMatchSnapshot();
  });
});
