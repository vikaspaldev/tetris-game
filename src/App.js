import React, { useRef, useState } from "react";
import "./App.scss";
import Board from "./components/board/Board";
import { useFirebase } from "./utils/hooks/useFirebase";

const App = () => {
  const [canPlayGame, setCanPlayGame] = useState(false);
  const ref = useRef(null);

  useFirebase();

  const handleBtnClicked = () => {
    setCanPlayGame(true);
    ref.current.blur();
  };

  return (
    <div className="container">
      <header>
        <h1>Tetris game</h1>
        <button
          ref={ref}
          className="btn btn-start-game"
          onClick={handleBtnClicked}
        >
          Start Game
        </button>
      </header>
      <Board canPlayGame={canPlayGame} />
    </div>
  );
};

export default App;
