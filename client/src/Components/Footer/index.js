import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = props => {
  const text = props.text ? props.text : "Back Home";
  const link = props.link ? props.link : "/";

  return (
    <div id="footer">
      {props.link ? (
        <a style={{ color: "white", marginTop: "1rem" }} href={link}>
          {text}
        </a>
      ) : (
        <Link style={{ color: "white", marginTop: "1rem" }} to={link}>
          {text}
        </Link>
      )}
    </div>
  );
};

export default Footer;
