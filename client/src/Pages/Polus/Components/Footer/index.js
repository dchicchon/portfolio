import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import polusIcon from "../../../../Assets/images/polus_icon.png";

function Footer() {
  return (
    <footer id="polus-footer">
      <nav className="footer-nav">
        <div className="footer-nav-col">
          <h4>Company</h4>
          <Link to="/polus/about">About</Link>
          {/* <a>Careers</a> */}
        </div>
        <div className="footer-nav-col">
          <h4>Support</h4>
          <a href="mailto:danielchicchon@gmail.com">Contact</a>
        </div>
      </nav>
      <img className="footer-logo" src={polusIcon} alt="Polus Icon" />
      <div className="footer-legal">
        <Link to={`/polus/terms`}>Privacy and Legal</Link>
      </div>
    </footer>
  );
}

export default Footer;
