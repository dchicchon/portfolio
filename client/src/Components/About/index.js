import React from 'react';
import './style.css';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
// import profileimg from '../../Assets/images/IMG_0045.JPG'

let linkStyle = {
    'textDecoration': 'none',
    'width': 'auto',
    'color': 'white',
    'margin': '5rem',
    'fontSize': '1.5rem',
    'transform': 'translateY(0)',
    'transition': 'transform 0.5s',
    'letterSpacing': '0.25rem',
    'padding': '0.25rem'
}

const About = () => {
    return (
        <div id='about'>
            <section className='opaque-cover'>
                <h2>About</h2>
                {/* Might add profile later */}
                {/* <img className='img-float' src={profileimg} alt='daniel_chicchon' width='200px' /> */}
                <p>
                    I am an Web Designer and Full Stack Web Developer currently residing the in the Outer Richmond District of San Francisco. In my free time, I take photographs, make videos, play music, and explore the city with friends. I made this site to host all of the projects I have worked on, current projects, photographs and videos.
                </p>
                {/* <Container> */}
                <Row className="justify-content-md-center">
                    <div className='rise'><Col><Link style={linkStyle} to='/code'>Code</Link></Col></div>
                    <div className='rise'><Col><Link style={linkStyle} to='/photography'>Photography</Link></Col></div>
                    <div className='rise'><Col><Link style={linkStyle} to='/videography'>Videography</Link></Col></div>
                </Row>
                {/* </Container> */}
            </section>
        </div>
    )
}

export default About;