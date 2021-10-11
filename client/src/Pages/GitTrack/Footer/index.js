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
      </ul>
    </div>
  );
};
