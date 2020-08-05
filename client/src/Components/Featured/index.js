import React from "react";
import "./style.css";

// Components
// import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// Assets
import gittrack from "../../Assets/images/gittrackLogo.png";
import gittrackSmall from "../../Assets/images/gittrackLogox400.jpg";
import plannit from "../../Assets/images/newplan.jpg";
import plannitSmall from "../../Assets/images/newplanx400.jpg";
import spaceTrivia from "../../Assets/images/spaceLogo.png";
import spaceTriviaSmall from "../../Assets/images/spaceLogox400.jpg";
import polus from "../../Assets/images/polus_tile.png";

class Featured extends React.Component {
  state = {
    projectList: [],
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
            authors: "dchicchon",
            repo: "https://github.com/dchicchon/GitTrack",
            description:
              " A commit tracking site for instructors to keep track of student progress.",
            caption: "React.js, MySQL, Victory.js, Passport.js",
          },
          {
            image: plannit,
            name: "PlanIt",
            link: "http://planit.ml/",
            authors: "esarnb, minalk24, matkuh, dchicchon",
            repo: "https://github.com/dchicchon/Plan-It",
            description: "A planner app that helps keep track of your day",
            caption: "Firebase, APIs, JQuery, HTML5, CSS",
          },
          {
            image: spaceTrivia,
            name: "Space Trivia",
            link: "https://spacetrivia.herokuapp.com/",
            authors: "dchicchon",
            repo: "https://github.com/dchicchon/TriviaGame",
            description: "Test your knowledge of the Solar System!",
            caption: "JQuery, HMTL5, CSS, MongoDB",
          },
          {
            image: polus,
            name: "Polus",
            link: "https://danielchicchon.io/code/polus",
            authors: "dchicchon",
            repo: "https://github.com/dchicchon/planner_extension",
            description: "A planner to help plan your day, week, and month",
            caption: "HTML5, CSS, Chrome Dev Tools",
          },
        ],
      });
    } else {
      this.setState({
        projectList: [
          {
            image: gittrackSmall,
            name: "GitTrack",
            link: "http://www.gittrack.ml/",
            authors: "dchicchon",
            repo: "https://github.com/dchicchon/GitTrack",
            description:
              " A commit tracking site for instructors to keep track of student progress.",
            caption: "React.js, MySQL, Victory.js, Passport.js",
          },
          {
            image: plannitSmall,
            name: "PlanIt",
            link: "http://planit.ml/",
            authors: "esarnb, minalk24, matkuh, dchicchon",
            repo: "https://github.com/dchicchon/Plan-It",
            description: "A planner app that helps keep track of your day",
            caption: "Firebase, APIs, JQuery, HTML5, CSS",
          },
          {
            image: spaceTriviaSmall,
            name: "Space Trivia",
            link: "https://spacetrivia.herokuapp.com/",
            authors: "dchicchon",
            repo: "https://github.com/dchicchon/TriviaGame",
            description: "Test your knowledge of the Solar System!",
            caption: "JQuery, HMTL5, CSS, MongoDB",
          },
          {
            image: "",
            name: "Planner",
            link: "https://danielchicchon.io/code/polus",
            authors: "dchicchon",
            repo: "https://github.com/dchicchon/planner_extension",
            description: "A planner to help plan your future!",
            caption: "HTML5, CSS, Chrome Dev Tools",
          },
        ],
      });
    }
  }

  render() {
    return (
      <div id="featured">
        <Container>
          <Row>
            <Col>
              <h2 style={{ marginBottom: "3rem", color: "white" }}>Featured</h2>
            </Col>
          </Row>
          <Row>
            {this.state.projectList.map((project, i) => (
              <Col xs="12" lg="6" style={{ marginTop: "1rem" }} key={i}>
                <Card style={{ border: "none" }}>
                  <Card.Img variant="top" src={project.image} />
                  <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Subtitle style={{ color: "grey" }}>
                      By {project.authors}
                    </Card.Subtitle>
                    <Card.Text>{project.description}</Card.Text>
                    <Card.Link href={project.link} target="_blank">
                      <Button variant="primary">Site</Button>
                    </Card.Link>

                    <Card.Link href={project.repo} target="_blank">
                      <Button variant="primary">GitHub</Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Featured;
