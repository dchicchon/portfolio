import React from "react";
import "./style.css";

const Photo = props => {
  return (
    <img src={props.src} alt={props.alt} className="photo"/>
  );
};

export default Photo;
