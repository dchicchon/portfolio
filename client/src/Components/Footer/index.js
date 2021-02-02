import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Footer = (props) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.screen.width);
  }, []);
  return width > 480 ? (
    <footer id="footer" style={{ backgroundColor: props.color }}>
      <nav className="footer-nav">
        <div className="footer-nav-col">
          <Link to="/">Home</Link>
        </div>
        <div className="footer-nav-col">
          <Link to="/code">Code</Link>
        </div>
        <div className="footer-nav-col">
          <Link to="/photography">Photography</Link>
        </div>
        <div className="footer-nav-col">
          <Link to="/videography">Videography</Link>
        </div>
      </nav>
      <div className="footer-sub">Daniel Chicchon 2020</div>
    </footer>
  ) : (
    ""
  );
};

export default Footer;
