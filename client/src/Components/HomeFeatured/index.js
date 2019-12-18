import React from "react";
import { Link } from "react-router-dom";

// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";

let linkStyle = {
  textDecoration: "none",
  width: "auto",
  color: "white",
  margin: "5rem",
  fontSize: "1.5rem",
  transform: "translateY(0)",
  transition: "transform 0.5s",
  letterSpacing: "0.25rem",
  padding: "0.25rem"
};

// Here I will have featured works
const HomeFeatured = () => {
  return (
    <div id="home-featured">
      <section className="opaque-cover">
        <Row>
          <Col>
            <h2>Featured</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col sm lg={3} className="rise-f">
            <Link style={linkStyle} to="/code">
              <Row>
                <Col className="pb-3">Code</Col>
              </Row>
              <Row>
                <Col>
                  <i className="fas fa-code fa-w-16 fa-3x"></i>
                </Col>
              </Row>
            </Link>
          </Col>
          <Col sm lg={3} className="rise-f">
            <Link style={linkStyle} to="/photography">
              <Row>
                <Col className="pb-3">Photography</Col>
              </Row>
              <Row>
                <Col>
                  <i className="fas fa-camera fa-w-16 fa-3x"></i>
                </Col>
              </Row>
            </Link>
          </Col>
          <Col sm lg={3} className="rise-f">
            <Link style={linkStyle} to="/videography">
              <Row>
                <Col className="pb-3">Videography</Col>
              </Row>
              <Row>
                <Col>
                  <i className="fas fa-video fa-w-16 fa-3x"></i>
                </Col>
              </Row>
            </Link>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default HomeFeatured;
