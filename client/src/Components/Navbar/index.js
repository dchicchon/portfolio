import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        // document.getElementsByClassName("nav-show")[0].style.top = "0";
      } else {
        // document.getElementsByClassName("nav-show")[0].style.top = "-50px";
      }
      prevScrollPos = currentScrollPos;
    };
    return function cleanup() {
      window.onscroll = function () {
        // console.log("Cleaned up scrolled nav");
      };
    };
  }, []);

  return (
    <header className="nav-show">
      <nav className="nav-area">
        <div className="nav-links">
          <ul>
            <li>
              <Link style={{ color: "white" }} to="/">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
