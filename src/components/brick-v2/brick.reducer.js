import { actions } from "./brick.constants";
import { reducerWithLogger } from "./../../utils/reducerWithLogger";

const onMoveLeft = (prevGrid, data) => {
  return [...prevGrid];
};

const onMoveRight = (prevGrid, data) => {
  return [...prevGrid];
};

const onMoveStraightDown = (prevGrid, data) => {
  return [...prevGrid];
};

const onAddBrick = (prevGrid, brickData) => {
  return [...prevGrid].map((brickRows, rowIndex) => {
    return brickRows.map((brick, colIndex) => {
      if (brickData.row === rowIndex && brickData.col === colIndex) {
        return {
          ...brickData,
          isActive: true,
        };
      }
      if (!brick) {
        return brick;
      }
      return {
        ...brick,
        isActive: false,
      };
    });
  });
};

export const reducer = reducerWithLogger((prevGrid, action) => {
  switch (action.type) {
    case actions.ADD_BRICK:
      return onAddBrick(prevGrid, action.data);
    case actions.MOVE_LEFT:
      return onMoveLeft(prevGrid, action.data);
    case actions.MOVE_RIGHT:
      return onMoveRight(prevGrid, action.data);
    case actions.MOVE_STRAIGHT_DOWN:
      return onMoveStraightDown(prevGrid, action.data);
    default:
      throw new Error("Unsupported dispatch action");
  }
});
