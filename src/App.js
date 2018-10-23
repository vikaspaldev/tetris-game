import React, { Component } from 'react';
import './App.scss';

const COLORS = ['red', 'blue', 'green', 'white', 'pink', 'yellow', 'orange'];

const SPEED = 300;

const BOARD_SIZE = {
  row: 15,
  col: 10
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const Brick = props => {
  const classes = ['brick'];
  classes.push(`brick-${props.row}-${props.col}`);
  return (
    <div
      className={classes.join(' ')}
      style={{ backgroundColor: props.bgColor }}
    />
  );
};

class BrickController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBrick: null,
      grid: [],
      timerId: null
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps && nextProps.canPlayGame) this.startGame();
  }
  startGame() {
    const grid = this.initGrid();
    const timerId = setInterval(() => {
      this.moveDown();
      this.checkGrid();
    }, SPEED);
    this.setState({ grid: grid, timerId: timerId }, () => this.addBrick());

    this.addListeners();
  }

  checkGrid() {
    const { grid } = this.state;
    for (let row = BOARD_SIZE.row - 1; row >= 0; row--) {
      for (let col = 0; col < BOARD_SIZE.col - 1; col++) {
        if (grid[row][col] !== null) {
        }
      }
    }
  }

  stopTimer() {
    const { timerId } = this.state;
    clearInterval(timerId);
    this.setState({ timerId: null });
  }
  addListeners() {
    window.addEventListener('keyup', e => {
      switch (e.key) {
        case 'ArrowDown':
          this.moveStraightDown();
          break;
        case 'ArrowLeft':
          this.moveLeft();
          break;
        case 'ArrowRight':
          this.moveRight();
          break;
        default:
          break;
      }
    });
  }
  moveLeft() {
    const { activeBrick, grid } = this.state;
    if (!activeBrick) return;
    const { row, col } = activeBrick;

    // if element reached at the end of the grid then block
    if (row >= BOARD_SIZE.row - 1) return;
    // if any obstacle present at left of current grid then block
    if (grid[row][col - 1] !== null) return;
    // if any obstacle present at bottom of current grid then block
    if (grid[row + 1][col] !== null) return;
    if (col > 0) {
      grid[row][col] = null;
      activeBrick.col -= 1;
      grid[row][col - 1] = activeBrick;

      this.setState({ grid: grid, activeBrick: activeBrick });
    }
  }
  moveRight() {
    const { activeBrick, grid } = this.state;
    if (!activeBrick) return;
    const { row, col } = activeBrick;

    // if element reached at the end of the grid then block
    if (row >= BOARD_SIZE.row - 1) return;
    // if any obstacle present at right  of current grid then block
    if (grid[row][col + 1] !== null) return;
    // if any obstacle present at bottom of current grid then block
    if (grid[row + 1][col] !== null) return;
    if (col <= BOARD_SIZE.col - 2) {
      grid[row][col] = null;
      activeBrick.col += 1;
      grid[row][col + 1] = activeBrick;

      this.setState({ grid: grid, activeBrick: activeBrick });
    }
  }
  moveStraightDown() {
    const { grid, activeBrick } = this.state;
    if (!activeBrick) {
      return;
    }
    const { row, col } = activeBrick;

    let rowIndex = row;
    while (rowIndex < grid.length - 1 && grid[rowIndex + 1][col] === null) {
      rowIndex += 1;
    }

    grid[row][col] = null;
    activeBrick.row = rowIndex;
    grid[rowIndex][col] = activeBrick;

    this.setState({ grid: grid, activeBrick: activeBrick });
  }
  moveDown() {
    const { grid, activeBrick } = this.state;
    if (!activeBrick) {
      return;
    }
    // debugger;
    const { row, col } = activeBrick;

    if (row === 0 && grid[row + 1][col] !== null) {
      // Game over
      this.stopTimer();
      alert('game over');
    }

    if (row < grid.length - 1 && grid[row + 1][col] === null) {
      grid[row][col] = null;
      activeBrick.row += 1;
      grid[row + 1][col] = activeBrick;

      this.setState({ grid: grid, activeBrick: activeBrick });
    } else {
      this.addBrick();
    }
  }
  initGrid() {
    const { row, col } = BOARD_SIZE;
    const grid = [];
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
      grid[rowIndex] = [];
      for (let colIndex = 0; colIndex < col; colIndex++) {
        grid[rowIndex][colIndex] = null;
      }
    }
    return grid;
  }
  addBrick() {
    const { timerId, grid } = this.state;
    if (!timerId) return;
    const row = 0;
    const col = randomNumber(0, BOARD_SIZE.col);

    const index = randomNumber(0, COLORS.length);
    const bgColor = COLORS[index];

    const brick = {
      row: row,
      col: col,
      bgColor: bgColor
    };
    grid[row][col] = brick;
    this.setState({ grid: grid, activeBrick: brick });
  }
  render() {
    return (
      <div className="bricks-container">
        {this.state.grid.map(rows => {
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
  }
}

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

class App extends Component {
  state = {
    canPlayGame: false
  };
  handleBtnClicked = () => {
    debugger;
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
