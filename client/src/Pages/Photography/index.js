import React from "react";

import "./style.css";

// Bootstrap stuff
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// https://firebase.google.com/docs/storage/web/list-files
// https://stackoverflow.com/questions/37335102/how-to-get-a-list-of-all-files-in-cloud-storage-in-a-firebase-app

// Components
import Navbar from "../../Components/Navbar";
import Photo from "../../Components/Photo";
// import Footer from "../../Components/Footer";

const photoList = [
  {
    src: "https://source.unsplash.com/user/dchicchon/dM1YjxBmxV8",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/9-_iuE6xi28",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/_kunyq_qnyc",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/prOftBoFtP8",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/RHcIqgoXf_c",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/t3iT_BWpcyk",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/Fdb3UO6KJvI",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/L-tb9VC4FCk",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/b5xBp6_AXsQ",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/b5OzPlT1K0M",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/MNkYz6Lwpqo",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/i2TGoTAc_lQ",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/Oq-igb73pdE",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/2X8oG3gmUPQ",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/uoC6v67ZmoE",
  },
  {
    src: "https://source.unsplash.com/user/dchicchon/IxdpVW2stJ8",
  },
];

class Photography extends React.Component {
  state = {
    photos: photoList,
    loading: true,
    phone: false,
  };

  componentDidMount() {
    document.title = "Photography";
  }

  // Listing all the urls
  render() {
    return (
      <div id="photography">
        <Navbar />
        <Container>
          <Row>
            <Col className="m-5">
              <h2
                id="photography-title"
                style={{ color: "white", letterSpacing: "8px" }}
              >
                Photography
              </h2>
            </Col>
          </Row>
          <Row>
            {this.state.photos.map((photo, i) => (
              <Photo src={photo.src} key={i} />
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Photography;
