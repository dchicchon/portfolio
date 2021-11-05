import React, { useState, useEffect } from "react";
import "./style.css";

// React bootstrap
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// Components
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

const Videography = () => {
  const [phone, setPhone] = useState(false);
  const [videoWidth, setVideoWidth] = useState(null);
  const [videoHeight, setVideoHeight] = useState(null);

  // For responsiveness
  useEffect(() => {
    document.title = "Videography";
    if (window.screen.width > 450) {
      setVideoWidth(window.screen.width * 0.5);
      setVideoHeight(window.screen.height * 0.5);
    } else {
      setVideoWidth(window.screen.width * 0.75);
      setVideoHeight(window.screen.height * 0.35);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div id="videography">
        <div>
          <div>
            <div className="m-5">
              <h2 className="video-title" style={{ letterSpacing: "8px" }}>
                Videography
              </h2>
            </div>
          </div>
          <div>
            <div className="video-margin">
              <h3 className="video-title">I do</h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <iframe
                  width={videoWidth}
                  height={videoHeight}
                  src="https://www.youtube.com/embed/dUQPWz8GEUg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div>
            <div className="video-margin">
              <h3 className="video-title">Olivia</h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <iframe
                  title="Olivia"
                  width={videoWidth}
                  height={videoHeight}
                  src="https://www.youtube.com/embed/nnliap1VOXw"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div>
            <div className="video-margin">
              <h3 className="video-title">Ray</h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <iframe
                  title="Ray"
                  width={videoWidth}
                  height={videoHeight}
                  src="https://www.youtube.com/embed/CzLZTGRMTRw"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div>
            <div className="video-margin">
              <h3 className="video-title">Ray 2</h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <iframe
                  title="Ray 2"
                  width={videoWidth}
                  height={videoHeight}
                  src="https://www.youtube.com/embed/jnyjZxYKnPU"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer color="rgb(30,48,74)" />
    </div>
  );
};

export default Videography;
