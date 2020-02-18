import React from "react";
import { BOARD_SIZE } from "../../utils/constants";
import BrickController from "./../brick/BrickController";
import BoardRow from "./BoardRow";

const Board = props => {
  return (
    <div className="board">
      {[...Array(BOARD_SIZE.row)].map((e, index) => {
        return <BoardRow key={index} row={index} />;
      })}
      <BrickController canPlayGame={props.canPlayGame} />
    </div>
  );
};

export default Board;
