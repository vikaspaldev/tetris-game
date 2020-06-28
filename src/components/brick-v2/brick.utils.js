import { BOARD_SIZE } from "./../../utils/constants";

export const initGrid = () => {
  const { row, col } = BOARD_SIZE;
  const grid = [];
  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    grid[rowIndex] = [];
    for (let colIndex = 0; colIndex < col; colIndex++) {
      grid[rowIndex][colIndex] = null;
    }
  }
  return grid;
};

export const getActiveBrick = grid => {
  let activeBrick;

  grid.forEach(rows => {
    rows.forEach(brick => {
      if (!activeBrick && brick && brick.isActive) {
        activeBrick = brick;
      }
    });
  });

  return activeBrick;
};
