import React from 'react';
import './style.css';

// Components
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Assets
import gittrack from '../../Assets/images/gittrackLogo.png';
import plannit from '../../Assets/images/newplan.jpg';
import spaceTrivia from '../../Assets/images/spaceLogo.png';
// import zooLogo from '../../Assets/images/zooLogo.png';

const Featured = () => {
    return (
        <div className='featured'>
            <Container>
                <Row>
                    <Col>
                        <h3>Featured Projects</h3>
                    </Col>
                </Row>
                <Row className='justify-content-md-center'>
                    <Col xs lg='10'>
                        <Carousel>
                            <Carousel.Item>
                                <a target='_blank' rel='noopener noreferrer' href='http://www.gittrack.ml/'>

                                    <img
                                        className="d-block w-100"
                                        src={gittrack}
                                        alt="First slide"
                                    />
                                </a>
                                <Carousel.Caption>
                                    <h4 className='project-title'>A commit tracking site for instructors to keep track of student progress.</h4>
                                    <p className='project-caption'>React.js, MySQL, Victory.js, Passport.js</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <a target='_blank' rel='noopener noreferrer' href='https://spacetrivia.herokuapp.com/' >

                                    <img
                                        className="d-block w-100"
                                        src={spaceTrivia}
                                        alt="Third slide"
                                    />
                                </a>

                                <Carousel.Caption>
                                    <h4 className='project-title'>Test your knowledge of the Solar System!</h4>
                                    <p className='project-caption'>JQuery, HMTL5, CSS, MongoDB</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <a target='_blank' rel='noopener noreferrer' href='http://planit.ml/'>
                                    <img
                                        className="d-block w-100"
                                        src={plannit}
                                        alt="Third slide"
                                    />
                                </a>
                                <Carousel.Caption>
                                    <h4 className='project-title'>A planner app that helps keep track of your day</h4>
                                    <p className='project-caption'>Firebase, Yelp API, Bart API, Open Weather API</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Featured