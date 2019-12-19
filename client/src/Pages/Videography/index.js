import React from "react";
import "./style.css";

// Firebase
import { storage } from "../../Utils/firebaseConfig";

// React bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

// Components
import Navbar from "../../Components/Navbar";

class Videography extends React.Component {
  state = {
    videos: [],
    loading: true
  };

  listAllVideos = () => {
    console.log("Begin listing videos");
    let videoRef = storage.ref("Videos");
    let videos = [];
    videoRef
      .listAll()
      .then(result => {
        result.items.forEach(videoRef => {
          console.log(videoRef);
          videoRef.getDownloadURL().then(url => {
            if (url) {
              let video = {
                url,
                name: videoRef.name
              };
              videos.push(video);
            }
            if (videos.length > 2) {
              console.log(videos);
              this.setState({
                videos,
                loading: false
              });
            }
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  componentDidMount() {
    this.listAllVideos();
    // Get videos from storage here
  }

  render() {
    return (
      <div>
        <Navbar />
        <div id="videography">
          <Container>
            <Row>
              <Col className="m-5">
                <h2>Videography</h2>
              </Col>
            </Row>

            {this.state.videos.length > 0 ? (
              this.state.videos.map((video, i) => (
                <Row key={video.name}>
                  <Col className="video-margin">
                    <h3 className="video-title">{video.name}</h3>
                    <video className="video" controls>
                      <source src={video.url} type="video/mp4" />
                    </video>
                  </Col>
                </Row>
              ))
            ) : (
              <Spinner animation="border" variant="info" />
            )}
          </Container>
        </div>
      </div>
    );
  }
}

export default Videography;
