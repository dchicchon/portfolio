import React from "react";
import "./style.css";

// Components
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Assets
import gittrack from "../../Assets/images/gittrackLogo.png";
import plannit from "../../Assets/images/newplan.jpg";
import spaceTrivia from "../../Assets/images/spaceLogo.png";

// Width 376px

// Width 414px


class Featured extends React.Component {
  state = {
    projectList: []
  };

  componentDidMount() {
    const screenWidth = window.screen.width;
    // const screenHeight = window.screen.height;

    if (screenWidth > 414) {
      this.setState({
        projectList: [
          {
            image: gittrack,
            link: "http://www.gittrack.ml/",
            description:
              " A commit tracking site for instructors to keep track of student progress.",
            caption: "React.js, MySQL, Victory.js, Passport.js"
          },
          {
            image: plannit,
            link: "http://planit.ml/",
            description: "A planner app that helps keep track of your day",
            caption: "Firebase, APIs, JQuery, HTML5, CSS"
          },
          {
            image: spaceTrivia,
            link: "https://spacetrivia.herokuapp.com/",
            description: "Test your knowledge of the Solar System!",
            caption: "JQuery, HMTL5, CSS, MongoDB"
          }
        ]
      });
    } else if (screenWidth >= 375 && screenWidth < 414) {
      this.setState({
        projectList: [
          {
            image: gittrack,
            link: "http://www.gittrack.ml/",
            description:
              " A commit tracking site for instructors to keep track of student progress.",
            caption: "React.js, MySQL, Victory.js, Passport.js"
          },
          {
            image: plannit,
            link: "http://planit.ml/",
            description: "A planner app that helps keep track of your day",
            caption: "Firebase, APIs, JQuery, HTML5, CSS"
          },
          {
            image: spaceTrivia,
            link: "https://spacetrivia.herokuapp.com/",
            description: "Test your knowledge of the Solar System!",
            caption: "JQuery, HMTL5, CSS, MongoDB"
          }
        ]
      });
    } else {
      this.setState({
        projectList: [
          {
            image: gittrack,
            link: "http://www.gittrack.ml/",
            description:
              " A commit tracking site for instructors to keep track of student progress.",
            caption: "React.js, MySQL, Victory.js, Passport.js"
          },
          {
            image: plannit,
            link: "http://planit.ml/",
            description: "A planner app that helps keep track of your day",
            caption: "Firebase, APIs, JQuery, HTML5, CSS"
          },
          {
            image: spaceTrivia,
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
              <h3 className="featured-title">Featured Projects</h3>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs lg="10">
              <Carousel>
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
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Featured;
