import React from "react";
import ReactDOM from "react-dom";

const TestComponent = () => <div>Test Component</div>;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TestComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
