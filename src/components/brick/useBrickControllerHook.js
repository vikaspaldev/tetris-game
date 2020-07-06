import { useEffect, useReducer } from "react";
import { reducer } from "./brick.reducer";
import { actions } from "./brick.constants";
import { getActiveBrick, initGrid } from "./brick.utils";
import { randomNumber } from "../../utils/helperMethods";
import { BOARD_SIZE, COLORS, SPEED } from "../../utils/constants";
import { useInterval } from "../../utils/hooks/useInterval";

export const useBrickControllerHook = canPlayGame => {
  const [grid, dispatch] = useReducer(reducer, initGrid());

  const moveDown = activeBrick => {
    dispatch({
      type: actions.MOVE_DOWN,
      data: activeBrick,
    });
  };

  const addBrick = () => {
    const row = 0;
    const col = randomNumber(0, BOARD_SIZE.col);

    if (grid[row][col] !== null) {
      dispatch({
        type: actions.GAME_OVER,
      });
    }

    const colorIndex = randomNumber(0, COLORS.length);
    const bgColor = COLORS[colorIndex];

    const brick = {
      row,
      col,
      bgColor,
    };

    dispatch({
      type: actions.ADD_BRICK,
      data: brick,
    });
  };

  const moveStraightDown = () => {
    dispatch({
      type: actions.MOVE_STRAIGHT_DOWN,
    });
  };

  const moveLeft = () => {
    dispatch({
      type: actions.MOVE_LEFT,
    });
  };

  const moveRight = () => {
    dispatch({
      type: actions.MOVE_RIGHT,
    });
  };

  useEffect(() => {
    const keyboardListener = e => {
      const mapping = {
        ArrowDown: {
          params: undefined,
          func: moveStraightDown,
        },
        ArrowLeft: {
          params: undefined,
          func: moveLeft,
        },
        ArrowRight: {
          params: undefined,
          func: moveRight,
        },
      };
      const obj = mapping[e.key];
      if (obj) {
        const { params, func } = obj;
        func(params);
      }
    };

    if (canPlayGame) {
      window.addEventListener("keyup", keyboardListener);
    }
    return () => {
      if (canPlayGame) {
        window.removeEventListener("keyup", keyboardListener);
      }
    };
  }, [canPlayGame]);

  useInterval(() => {
    if (!canPlayGame) {
      return;
    }
    const activeBrick = getActiveBrick(grid);

    const shouldMoveDown =
      activeBrick &&
      grid[activeBrick.row + 1] !== undefined &&
      grid[activeBrick.row + 1][activeBrick.col] === null;

    if (shouldMoveDown) {
      moveDown(activeBrick);
    } else {
      addBrick();
    }
  }, SPEED);

  return {
    grid,
  };
};
