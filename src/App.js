import React, { Component } from "react";
import "./App.scss";
import Board from "./components/board/Board";

class App extends Component {
  state = {
    canPlayGame: false
  };
  handleBtnClicked = () => {
    const canPlayGame = true;
    this.setState({ canPlayGame: canPlayGame });
  };
  render() {
    return (
      <div className="container">
        <header>
          <h1>Tetris game</h1>
          <button
            className="btn btn-start-game"
            onClick={this.handleBtnClicked}
          >
            Start Game
          </button>
        </header>
        <Board canPlayGame={this.state.canPlayGame} />
      </div>
    );
  }
}

export default App;
