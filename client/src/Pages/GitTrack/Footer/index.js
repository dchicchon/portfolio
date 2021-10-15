import React from "react";
import "./style.css";
export const Footer = () => {
  const backToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };
  return (
    <div id="gittrack-footer">
      <ul id="footer-list">
        <li>
          {/* back to top button here? */}
          <a
            style={{ cursor: "pointer" }}
            onClick={() => backToTop()}
            id="back-to-top"
          >
            Back to Top
          </a>
        </li>
        <li>
          <div>
            Icons made by{" "}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{" "}
            and{" "}
            <a href="https://www.flaticon.com/authors/becris" title="Becris">
              Becris
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};
