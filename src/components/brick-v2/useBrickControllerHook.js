import { useEffect, useReducer, useCallback } from "react";
import { reducer } from "./brick.reducer";
import { actions } from "./brick.constants";
import { initGrid } from "./brick.utils";
import { randomNumber } from "../../utils/helperMethods";
import { BOARD_SIZE, COLORS } from "../../utils/constants";

export const useBrickControllerHook = canPlayGame => {
  const [grid, dispatch] = useReducer(reducer, initGrid());

  const addBrick = useCallback(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keyboardListender = e => {
    switch (e.key) {
      case "ArrowDown":
        dispatch({
          type: actions.MOVE_STRAIGHT_DOWN,
        });
        break;
      case "ArrowLeft":
        dispatch({
          type: actions.MOVE_LEFT,
        });
        break;
      case "ArrowRight":
        dispatch({
          type: actions.MOVE_RIGHT,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (canPlayGame) {
      addBrick();
      window.addEventListener("keyup", keyboardListender);
    }
    return () => {
      if (canPlayGame) {
        window.removeEventListener("keyup", keyboardListender);
      }
    };
  }, [addBrick, canPlayGame]);

  return {
    grid,
  };
};
