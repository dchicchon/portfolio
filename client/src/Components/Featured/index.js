import React from "react";
import "./style.css";

// Components
// import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

// Assets
import gittrack from "../../Assets/images/gittrackLogo.png";
import gittrackSmall from "../../Assets/images/gittrackLogox400.jpg";
import plannit from "../../Assets/images/newplan.jpg";
import plannitSmall from "../../Assets/images/newplanx400.jpg";
import spaceTrivia from "../../Assets/images/spaceLogo.png";
import spaceTriviaSmall from "../../Assets/images/spaceLogox400.jpg";

class Featured extends React.Component {
  state = {
    projectList: []
  };

  componentDidMount() {
    const screenWidth = window.screen.width;
    // Change photo used depending on the screen size
    if (screenWidth > 400) {
      this.setState({
        projectList: [
          {
            image: gittrack,
            name: "GitTrack",
            link: "http://www.gittrack.ml/",
            description:
              " A commit tracking site for instructors to keep track of student progress.",
            caption: "React.js, MySQL, Victory.js, Passport.js"
          },
          {
            image: plannit,
            name: "PlanIt",
            link: "http://planit.ml/",
            description: "A planner app that helps keep track of your day",
            caption: "Firebase, APIs, JQuery, HTML5, CSS"
          },
          {
            image: spaceTrivia,
            name: "Space Trivia",
            link: "https://spacetrivia.herokuapp.com/",
            description: "Test your knowledge of the Solar System!",
            caption: "JQuery, HMTL5, CSS, MongoDB"
          },
          { name: "Planner" }
        ]
      });
    } else {
      this.setState({
        projectList: [
          {
            image: gittrackSmall,
            link: "http://www.gittrack.ml/",
            description:
              " A commit tracking site for instructors to keep track of student progress.",
            caption: "React.js, MySQL, Victory.js, Passport.js"
          },
          {
            image: plannitSmall,
            link: "http://planit.ml/",
            description: "A planner app that helps keep track of your day",
            caption: "Firebase, APIs, JQuery, HTML5, CSS"
          },
          {
            image: spaceTriviaSmall,
            link: "https://spacetrivia.herokuapp.com/",
            description: "Test your knowledge of the Solar System!",
            caption: "JQuery, HMTL5, CSS, MongoDB"
          }
        ]
      });
    }
  }

  render() {
    return (
      <div id="featured">
        <Container>
          <Row>
            <Col>
              <h2 style={{ marginBottom: "3rem" }}>Featured</h2>
            </Col>
          </Row>
          {this.state.projectList.map((project, i) => (
            <Row key={i}>
              <Col xs lg="6">
                <Card>
                  <Card.Title style={{ color: "black" }}>
                    {project.name}
                  </Card.Title>
                  <Card.Text style={{ color: "black" }}>Description</Card.Text>
                  <Card.Link
                    style={{ color: "black" }}
                    href="#"
                    target="_blank"
                  >
                    Site Link
                  </Card.Link>
                  <Card.Link
                    style={{ color: "black" }}
                    href="#"
                    target="_blank"
                  >
                    GitHub Repo
                  </Card.Link>
                </Card>
              </Col>
            </Row>
          ))}
          {/* <Row className="justify-content-md-center"> */}
          {/* <Col xs lg="10"> */}
          {/* ========== */}
          {/* 01/29/2020 */}
          {/* Changing carousel view to cards so that the links are available to show */}
          {/* ========== */}

          {/* <Carousel>
                {this.state.projectList.map((project, i) => (
                  <Carousel.Item key={i}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.link}
                    >
                      <img
                        className="d-block w-100"
                        src={project.image}
                        alt={`project`}
                      />
                    </a>
                    <Carousel.Caption>
                      <h4 className="project-title">{project.description}</h4>
                      <p className="project-caption">{project.caption}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel> */}
          {/* </Col> */}
          {/* </Row> */}
        </Container>
      </div>
    );
  }
}

export default Featured;
