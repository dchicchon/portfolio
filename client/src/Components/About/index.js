import React from "react";
import "./style.css";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { Link } from 'react-router-dom';
// import profileimg from '../../Assets/images/IMG_0045.JPG'

const About = () => {
  return (
    <div id="about">
      <section className="opaque-cover">
        <h2
          style={{
            letterSpacing: "5px",
            textTransform: "uppercase",
            font: "1.50rem Lato, sans-serif",
            textAlign: "center",
          }}
        >
          About
        </h2>
        {/* Might add profile later */}
        {/* <img className='img-float' src={profileimg} alt='daniel_chicchon' width='200px' /> */}
        <p>
          I'm a Web Designer and Full Stack Web Developer currently residing the
          in the Outer Richmond District of San Francisco. In my free time, I
          take photographs, make videos, play music, and explore the city with
          friends. I made this site to host all of the projects I have worked
          on, current projects, photographs and videos.
        </p>
        {/* <Container> */}

        {/* </Container> */}
      </section>
    </div>
  );
};

export default About;
