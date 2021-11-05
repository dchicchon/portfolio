import React from "react";
import "./mainmenu.css";
const MainMenu = (props) => {
  return (
    <div id="main-menu">
      <div id="menu-items">
        <h1>Minesweeper</h1>
        <button
          className="button"
          onClick={() => {
            props.setInPlay(true);
          }}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
