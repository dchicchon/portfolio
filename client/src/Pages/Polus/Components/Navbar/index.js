import React from "react";
import "./style.css";
import polusIcon from "../../../../Assets/images/polus_icon.png";
import {
  BrowserRouter as Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

function Navbar() {
  return (
    <header className="header">
      <div className="wrapper header-wrapper">
        <h1 className="logo">
          <Link className="accent-bg-img" to="/code/polus"></Link>
          <img src={polusIcon} alt="polus icon" />
        </h1>
        <nav className="main-nav">
          <Link style={{ color: "#999" }} to="/code/polus/about">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
