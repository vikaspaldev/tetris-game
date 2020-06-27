import React from "react";
import Brick from "./BrickBlock";

export const BrickComponent = ({ grid }) => {
  return (
    <div className="bricks-container">
      {grid.map(rows => {
        return rows.map(brick => {
          if (!brick) return null;
          const key = `${brick.row}-${brick.col}`;

          return (
            <Brick
              key={key}
              row={brick.row}
              col={brick.col}
              bgColor={brick.bgColor}
            />
          );
        });
      })}
    </div>
  );
};
