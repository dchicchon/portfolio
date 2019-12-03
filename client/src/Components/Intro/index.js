import React from 'react';
import { Link } from 'react-router-dom';

// Grid 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';

const Intro = () => {
    return (
        <div id='intro'>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col><h1>Danny</h1></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col><Link to='#about'>About</Link></Col>
                    <Col><Link to='#resume'>Resume</Link></Col>
                    <Col><Link to='/art'>Art</Link></Col>
                    <Col><Link to='/music'>Music</Link></Col>
                    <Col><Link to='#contact'>Contact</Link></Col>

                </Row>
            </Container>
        </div>
    )
}

export default Intro;