import React from "react";
import "./style.css";

class Photo extends React.Component {
  state = {
    clicked: false,
  };

  render() {
    return (
      <figure className="photo">
        <img src={this.props.src} alt={this.props.alt} className="photo-img" />
      </figure>
    );
  }
}

export default Photo;
