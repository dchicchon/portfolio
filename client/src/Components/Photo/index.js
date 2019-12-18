import React from "react";
import "./style.css";

class Photo extends React.Component {
  state = {
    clicked: false
  };

  inspectPhoto = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  render() {
    const divStyle = this.state.clicked ? "photo-clicked" : "photo";
    return (
      <div className={divStyle} onClick={this.inspectPhoto}>
        <img src={this.props.src} alt={this.props.alt} className="photo-img" />
        <div className="screen"></div>
      </div>
    );
  }
}

export default Photo;
