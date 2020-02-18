import React from "react";
import { BOARD_SIZE } from "../../utils/constants";

const BoardRow = props => {
  return (
    <React.Fragment>
      {[...Array(BOARD_SIZE.col)].map((e, colIndex) => {
        const key = `${props.row}-${colIndex}`;
        return <div key={key} className="board-cell" />;
      })}
    </React.Fragment>
  );
};

export default BoardRow;
