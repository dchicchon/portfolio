import React, { useState } from "react";
import MainMenu from "./MainMenu";
import Game from "./Game";
import "./style.css";

function AppState(props) {
  const isPlaying = props.inPlay;
  if (isPlaying) {
    return <Game setInPlay={props.setInPlay} />;
  } else {
    return <MainMenu setInPlay={props.setInPlay} />;
  }
}

export const Minesweeper = () => {
  const [inPlay, setInPlay] = useState(false);

  return (
    <div id="minesweeper">
      <AppState inPlay={inPlay} setInPlay={setInPlay} />
    </div>
  );
};
