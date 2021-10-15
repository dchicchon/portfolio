import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/images/logo.png";
import "./style.css";

export const Nav = () => {
  return (
    <div id="gittrack-nav">
      <ul id="nav-list">
        <li className="nav-link">
          {/* image here */}
          <Link to="/GitTrack">
            <img className="gittrack-logo" src={logo} />
          </Link>
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
        <li className="nav-link">
          <Link to="/GitTrack/support">Support</Link>
        </li>
        <li className="nav-link">
          <Link to="/code">Return to Code</Link>
        </li>
      </ul>
    </div>
  );
};
