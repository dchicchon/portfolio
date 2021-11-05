import React, { useState, useEffect } from "react";
import "./game.css";
import Board from "../Board";
import Dashboard from "../Dashboard";
import GameOverModal from "../GameOverModal";

// Once the game is over, do this

const Game = (props) => {
  let [gamesWon, setGamesWon] = useState(0);
  let [gamesLost, setGamesLost] = useState(0);
  let [gameNum, setGameNum] = useState(0); // anytime game num change, rerender the dashboard for timer sake
  let [gameStatus, setGameStatus] = useState(0); // 0 is active, 1 is game lost, 2 is game won

  useEffect(() => {
    console.log("Run this when the game changes");
  }, [gameStatus]);
  return (
    <div id="main-game">
      <h1 className="title">Minesweeper</h1>
      <Dashboard
        gameStatus={gameStatus}
        gamesWon={gamesWon}
        gamesLost={gamesLost}
        gameNum={gameNum}
      />
      <Board
        setInPlay={props.setInPlay}
        gamesWon={gamesWon}
        gamesLost={gamesLost}
        gameNum={gameNum}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        setGameNum={setGameNum}
        setGamesWon={setGamesWon}
        setGamesLost={setGamesLost}
      />

      {gameStatus === 0 ? (
        ""
      ) : (
        <GameOverModal
          gameNum={gameNum}
          setGameNum={setGameNum}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          setInPlay={props.setInPlay}
        />
      )}

      {/* maybe put modal here instead? */}
    </div>
  );
};

export default Game;
