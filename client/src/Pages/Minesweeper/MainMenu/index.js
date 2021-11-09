import React from "react";
import { Link } from 'react-router-dom'
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
        <button
          className='button'
        >
          <Link to='/code' style={{ color: 'gold' }}>Back to Code</Link>
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
