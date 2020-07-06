import { reducer } from "../brick.reducer";
import { initGrid } from "../brick.utils";

describe("move down reducer method", () => {
  it("should move down", () => {
    const prevGrid = initGrid();

    prevGrid[0][3] = {
      row: 0,
      col: 3,
      isActive: true,
      bgColor: "red",
    };

    const action = {
      type: "move-down",
    };

    const newGrid = reducer(prevGrid, action);

    expect(newGrid[0][3]).toEqual(null);
    expect(newGrid[1][3]).toEqual({
      row: 1,
      col: 3,
      isActive: true,
      bgColor: "red",
    });
  });
});

describe("add brick reducer method", () => {
  it("should add a new brick", () => {
    const prevGrid = initGrid();

    const action = {
      type: "add-brick",
      data: {
        row: 0,
        col: 3,
        isActive: true,
        bgColor: "red",
      },
    };

    const newGrid = reducer(prevGrid, action);

    expect(newGrid[0][3]).toEqual({
      row: 0,
      col: 3,
      isActive: true,
      bgColor: "red",
    });
  });
});
