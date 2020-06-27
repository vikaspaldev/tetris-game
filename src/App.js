import React, { useState } from "react";
import "./App.scss";
import Board from "./components/board/Board";

const App = () => {
  const [canPlayGame, setCanPlayGame] = useState(false);

  const handleBtnClicked = () => {
    setCanPlayGame(true);
  };

  return (
    <div className="container">
      <header>
        <h1>Tetris game</h1>
        <button className="btn btn-start-game" onClick={handleBtnClicked}>
          Start Game
        </button>
      </header>
      <Board canPlayGame={canPlayGame} />
    </div>
  );
};

export default App;
