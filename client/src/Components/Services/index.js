import React from 'react';
import './style.css';

// Grid
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Animation
import FadeIn from '../../Components/FadeIn';

const Services = () => {
    return (
        <div id='services'>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col>
                        <h1 id='services-title'>
                            Services
                        </h1>
                    </Col>
                </Row>
                <FadeIn>
                    <Row className='justify-content-md-center'>
                        <Col className=''>
                            <h2 className='service-item'>Website Design</h2>
                            <i className="fas fa-palette fa-w-20 fa-7x"></i>
                            <p className='mt-3'>Practical Web Design to draw visitors to your site</p>
                        </Col>
                        <Col className=''>
                            <h2 className='service-item'>Database Architecture</h2>
                            <i className="fas fa-database fa-w-20 fa-7x"></i>
                            <p className='mt-3'>Contruct meaningful Data Structures to gain useful insights</p>

                        </Col>
                        <Col className=''>
                            <h2 className='service-item'>User Authentication</h2>
                            <i className="fas fa-user fa-w-20 fa-7x"></i>
                            <p className='mt-3'>Ensure the security of your users private information</p>

                        </Col>
                        <Col className=''>
                            <h2 className='service-item'>Payment Systems</h2>
                            <i className="fas fa-money-bill-wave fa-w-20 fa-7x"></i>
                            <p className='mt-3'>Implementation of secure payment systems to allow your visitors to make purchases on your site</p>

                        </Col>
                        <Col className=''>
                            <h2 className='service-item'>Site Management</h2>
                            <i className="fas fa-tasks fa-w-20 fa-7x"></i>
                            <p className='mt-3'>Continue to grow and manage your site with administration services</p>

                        </Col>
                    </Row>
                </FadeIn>
            </Container>
        </div>
    )
}

export default Services;