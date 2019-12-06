import React from 'react';
import './style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import profileimg from '../../Assets/images/IMG_0045.JPG'

const About = () => {
    return (
        <div id='about'>
            <section className='opaque-cover'>
                <h2>About</h2>
                {/* Might add profile later */}
                {/* <img className='img-float' src={profileimg} alt='daniel_chicchon' width='200px' /> */}
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi obcaecati tempore corporis quisquam, pariatur adipisci? Rerum esse, temporibus expedita, magnam ea fugiat aliquid at maxime modi neque officia sequi laborum.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi obcaecati tempore corporis quisquam, pariatur adipisci? Rerum esse, temporibus expedita, magnam ea fugiat aliquid at maxime modi neque officia sequi laborum.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi obcaecati tempore corporis quisquam, pariatur adipisci? Rerum esse, temporibus expedita, magnam ea fugiat aliquid at maxime modi neque officia sequi laborum.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi obcaecati tempore corporis quisquam, pariatur adipisci? Rerum esse, temporibus expedita, magnam ea fugiat aliquid at maxime modi neque officia sequi laborum.
                </p>
                {/* <Container> */}
                <Row className="justify-content-md-center">
                    <Col><Link to='/code'>Code</Link></Col>
                    <Col><Link to='/photography'>Photography</Link></Col>
                    <Col><Link to='/art'>Art</Link></Col>
                </Row>
                {/* </Container> */}
            </section>
        </div>
    )
}

export default About;