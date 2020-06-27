import React from "react";
import { useBrickControllerHook } from "./useBrickControllerHook";
import { BrickComponent } from "../brick/BrickComponent";

const BrickController = ({ canPlayGame }) => {
  const { grid } = useBrickControllerHook(canPlayGame);

  if (!grid) {
    return null;
  }

  return <BrickComponent grid={grid} />;
};

export default BrickController;
