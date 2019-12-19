import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

let linkStyle = {
  color: "white",
  // marginTop: "1rem"
};

const Footer = props => {
  const text = props.text ? props.text : "Back Home";
  const link = props.link ? props.link : "/";

  return (
    <div id="footer">
      {props.link ? (
        <a style={linkStyle} href={link}>
          {text}
        </a>
      ) : (
        <Link style={linkStyle} to={link}>
          {text}
        </Link>
      )}
    </div>
  );
};

export default Footer;
