import React from 'react';
import './style.css';

// Grid
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Animation
import FadeIn from '../../Components/FadeIn';

const CodeAbout = () => {
    return (
        <div id='code-about'>
            <Container>
                <h1 id='code-title'>Technologies</h1>
                {/* <h3>Skills</h3> */}
                <FadeIn>

                    <Row className='justify-content-md-center m-4'>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='https://firebase.google.com/' rel='noopener noreferrer'>
                                <p>Firebase CMS</p>
                                <img width='100rem' alt='firebase_logo' src='https://firebase.google.com/downloads/brand-guidelines/SVG/logo-logomark.svg'></img>
                            </a>
                        </Col>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='https://nodejs.org/en/' rel='noopener noreferrer'>
                                <p>Node.js</p>
                                <i className="fab fa-node fa-w-20 fa-7x"></i>
                            </a>
                        </Col>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='https://www.mysql.com/' rel='noopener noreferrer'>
                                <p>MySQL</p>
                                <img width='200rem' alt='mysql_logo' src='https://cdn.worldvectorlogo.com/logos/mysql.svg'></img>
                            </a>
                        </Col>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='https://www.mongodb.com/' rel='noopener noreferrer'>
                                <p>MongoDB</p>
                                <img width='250rem' src='https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png' alt='mongodb_lgo'></img>
                            </a>
                        </Col>
                    </Row>
                </FadeIn>
                <FadeIn>

                    <Row className='justify-content-md-center m-4'>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='https://www.paypal.com/us/webapps/mpp/merchant' rel='noopener noreferrer'>
                                <p>Paypal</p>
                                <i className="fab fa-paypal fa-w-20 fa-7x"></i>
                                {/* <i className="fab fa-python fa-w-20 fa-7x"></i> */}

                            </a>
                        </Col>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='https://aws.amazon.com/' rel='noopener noreferrer'>

                                <p>AWS</p>
                                <i className="fab fa-aws fa-w-20 fa-7x"></i>
                            </a>
                        </Col>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='http://www.passportjs.org/' rel='noopener noreferrer'>
                                <p>Passport</p>
                                <img width='100rem' src='https://pbs.twimg.com/profile_images/599259952574693376/DMrPoJtc_400x400.png' alt='passportjs logo'></img>
                            </a>
                        </Col>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='https://reactjs.org/' rel='noopener noreferrer'>
                                <p>React</p>
                                <i className="fab fa-react fa-w-20 fa-7x"></i>

                            </a>
                        </Col>
                    </Row>
                </FadeIn>
                <FadeIn>
                    <Row className='justify-content-md-center m-4'>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='https://www.w3schools.com/html/' rel='noopener noreferrer'>
                                <p>HTML</p>
                                <i className="fab fa-html5 fa-w-20 fa-7x"></i>

                            </a>
                        </Col>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='https://www.w3schools.com/css/css_website_layout.asp' rel='noopener noreferrer'>
                                <p>CSS</p>
                                <i className="fab fa-css3-alt fa-w-20 fa-7x"></i>

                            </a>
                        </Col>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='https://marketingplatform.google.com/about/analytics/' rel='noopener noreferrer'>
                                <p>Google Analytics</p>
                                <i className="fab fa-google fa-w-20 fa-7x"></i>

                            </a>
                        </Col>
                        <Col className='boxshadow p-2' xs lg={3}>
                            <a className='tech-link' target='_blank' href='https://expressjs.com/' rel='noopener noreferrer'>
                                <p>Express</p>
                                <img width='250rem' src='https://expressjs.com/images/express-facebook-share.png' alt='express_logo'></img>
                            </a>
                        </Col>
                    </Row>
                </FadeIn>
            </Container>

        </div>
    )
}

export default CodeAbout;