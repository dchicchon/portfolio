import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const Nav = () => {
  return (
    <div id="nav">
      <ul id="nav-list">
        <li className="nav-link">
          <h2>GitTrack</h2>
        </li>
        <li className="nav-link">
          <Link to="/GitTrack">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/GitTrack/terms">Terms</Link>
        </li>
        <li className="nav-link">
          <Link to="/GitTrack/privacy">Privacy</Link>
        </li>
      </ul>
    </div>
  );
};
