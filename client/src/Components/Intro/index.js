import React from 'react';
// import { Link } from 'react-router-dom';

// Grid 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';

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



const Intro = (props) => {
    return (
        <div id='intro'>
            <section className='content'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col><h1>Danny</h1></Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs lg='auto'>
                            <div className='rise'><a style={linkStyle} href='#about'>About</a></div>
                            <div className='rise'><a style={linkStyle} href='#home-featured'>Featured</a></div>
                            <div className='rise'><a style={linkStyle} href='#contact'>Contact</a></div>
                        </Col>

                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Intro;