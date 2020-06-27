import React from "react";
import { BOARD_SIZE } from "../../utils/constants";
import BrickController from "./../brick-v2/BrickController";
import BoardRow from "./BoardRow";

const Board = ({ canPlayGame }) => {
  return (
    <div className="board">
      {[...Array(BOARD_SIZE.row)].map((e, index) => {
        return <BoardRow key={index} row={index} />;
      })}
      <BrickController canPlayGame={canPlayGame} />
    </div>
  );
};

export default Board;
