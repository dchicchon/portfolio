import React from "react";
import "./style.css";

class Photo extends React.Component {
  state = {
    clicked: false
  };

  // This works sort-of, looks weird though
  // inspectPhoto = () => {
  // this.setState({
  // clicked: !this.state.clicked
  // });
  // };

  render() {
    // const divStyle = this.state.clicked ? "photo-clicked" : "photo";
    return (
      // onClick={this.inspectPhoto}
      <figure className="photo">
        <img src={this.props.src} alt={this.props.alt} className="photo-img" />
        <div className="photo-overlay">
          <a
            className="photo-download"
            title="Download photo"
            href={`${this.props.download}?force=true`}
            download
            rel="nofollow"
          >
            <i className="fas fa-arrow-circle-down fa-w-8 fa-2x"></i>
          </a>
        </div>
      </figure>
    );
  }
}

export default Photo;
