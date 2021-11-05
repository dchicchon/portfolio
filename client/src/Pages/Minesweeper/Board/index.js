import React, { useState, useEffect } from "react";
import Cell from "../Cell";
import "./board.css";

const Board = (props) => {
  let [board, setBoard] = useState([]);
  let [renderedBoard, setRenderedBoard] = useState([]);
  // Runs anytime the game number changes
  useEffect(() => {
    createStartingBoard();
  }, [props.gameNum]);

  const createStartingBoard = () => {
    let mainBoard = [];
    // This is where we should start doing the random mines cells
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        const random = Math.random();
        if (random < 0.2) row.push("x");
        else row.push("o");
      }
      mainBoard.push(row);
    }
    renderBoard(mainBoard);
  };
  // I think that this is not running once the game ends
  const renderBoard = (board) => {
    let returnBoard = [];
    // Odds 0.1 that its a mine
    // 0.7 that its a number
    // 0.2 that its nothing
    for (let rowNum = 0; rowNum < board.length; rowNum++) {
      let row = [];
      for (let colNum = 0; colNum < board[rowNum].length; colNum++) {
        let cell = (
          <Cell
            key={`${rowNum}${colNum}`}
            y={rowNum}
            x={colNum}
            board={board}
            endGame={endGame}
            checkWin={checkWin}
            setBoard={setBoard}
            gameNum={props.gameNum}
            type={board[rowNum][colNum]}
          />
        );
        row.push(cell);
      }

      returnBoard.push(
        <div className="mine-row" key={rowNum}>
          {row}
        </div>
      );
    }
    setBoard(board);
    setRenderedBoard(returnBoard);
  };

  const endGame = (didWin) => {
    if (didWin) {
      props.setGamesWon((prevState) => prevState + 1);
      props.setGameStatus(2);
    } else {
      props.setGameStatus(1);
      props.setGamesLost((prevState) => prevState + 1);
    }
  };

  const checkWin = (checkBoard) => {
    // Check here if won
    for (let row = 0; row < checkBoard.length; row++) {
      for (let col = 0; col < checkBoard[0].length; col++) {
        let cellToCheck = checkBoard[row][col];
        if (cellToCheck === "o") return false;
      }
    }
    return true;
  };

  return <div id="board">{renderedBoard}</div>;
};

export default Board;
