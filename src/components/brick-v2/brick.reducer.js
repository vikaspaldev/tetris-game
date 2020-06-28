import { actions } from "./brick.constants";
import { reducerWithLogger } from "./../../utils/reducerWithLogger";
import { getActiveBrick } from "./brick.utils";

const onMoveLeft = (prevGrid, data) => {
  return [...prevGrid];
};

const onMoveDown = (prevGrid, data) => {
  const updatedGrid = [...prevGrid];

  const activeBrick = getActiveBrick(updatedGrid);
  const { row, col } = activeBrick;
  updatedGrid[row + 1][col] = activeBrick;
  updatedGrid[row][col] = null;

  activeBrick.row += 1;

  return updatedGrid;
};

const onMoveRight = (prevGrid, data) => {
  return [...prevGrid];
};

const onMoveStraightDown = (prevGrid, data) => {
  return [...prevGrid];
};

const onAddBrick = (prevGrid, brickData) => {
  return [...prevGrid].map((brickRows, rowIndex) => {
    return [...brickRows].map((brick, colIndex) => {
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
  const actionToFuncMapping = {
    [actions.ADD_BRICK]: onAddBrick,
    [actions.MOVE_LEFT]: onMoveLeft,
    [actions.MOVE_DOWN]: onMoveDown,
    [actions.MOVE_RIGHT]: onMoveRight,
    [actions.MOVE_STRAIGHT_DOWN]: onMoveStraightDown,
  };

  const func = actionToFuncMapping[action.type];

  if (!func) {
    throw new Error("Action not supported");
  }

  return func(prevGrid, action.data);
});
