import React from "react";
import { useBrickControllerHook } from "./useBrickControllerHook";
import { BrickComponent } from "../brick/BrickComponent";

const BrickController = ({ canPlayGame }) => {
  const { grid } = useBrickControllerHook(canPlayGame);

  return <BrickComponent grid={grid} />;
};

export default BrickController;
