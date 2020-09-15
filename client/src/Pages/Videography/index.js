import React from "react";
import "./style.css";

// React bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Spinner from "react-bootstrap/Spinner";

// Components
import Navbar from "../../Components/Navbar";

class Videography extends React.Component {
  state = {
    phone: false,
    videoWidth: null,
    videoHeight: null,
  };

  // For responsiveness
  componentDidMount() {
    document.title = "Videography";
    if (window.screen.width > 450) {
      this.setState({
        videoWidth: window.screen.width * 0.75,
        videoHeight: window.screen.height * 0.75,
      });
    } else {
      this.setState({
        videoWidth: window.screen.width * 0.75,
        videoHeight: window.screen.height * 0.35,
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div id="videography">
          <Container>
            <Row>
              <Col className="m-5">
                <h2 className="video-title" style={{ letterSpacing: "8px" }}>
                  Videography
                </h2>
              </Col>
            </Row>
            <Row>
              <Col className="video-margin">
                <h3 className="video-title">I do</h3>
                <iframe
                  width={this.state.videoWidth}
                  height={this.state.videoHeight}
                  src="https://www.youtube.com/embed/dUQPWz8GEUg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Col>
            </Row>
            <Row>
              <Col className="video-margin">
                <h3 className="video-title">Olivia</h3>
                <iframe
                  title="Olivia"
                  width={this.state.videoWidth}
                  height={this.state.videoHeight}
                  src="https://www.youtube.com/embed/nnliap1VOXw"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Col>
            </Row>
            <Row>
              <Col className="video-margin">
                <h3 className="video-title">Ray</h3>
                <iframe
                  title="Ray"
                  width={this.state.videoWidth}
                  height={this.state.videoHeight}
                  src="https://www.youtube.com/embed/CzLZTGRMTRw"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Col>
            </Row>
            <Row>
              <Col className="video-margin">
                <h3 className="video-title">Ray 2</h3>
                <iframe
                  title="Ray 2"
                  width={this.state.videoWidth}
                  height={this.state.videoHeight}
                  src="https://www.youtube.com/embed/jnyjZxYKnPU"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Videography;
