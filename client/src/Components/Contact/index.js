import React from 'react';
// import profileimg from '../../Assets/images/IMG_0045.JPG'
import profileimg from '../../Assets/images/danny2.JPG';
import './style.css';

const Contact = () => {
    return (
        <div id='contact'>
            <section className='opaque-cover contact-area'>
                <h2>Contact</h2>
                {/* wow this picture sucks */}
                <img className='img-float' src={profileimg} alt='danielchicchon' />

                <div className='link-rise'>
                    <a className='link' rel='noopener noreferrer' href='mailto:danielchicchon@gmail.om'>Email: danielchicchon@gmail.com</a>
                </div>
                <br />
                <a className='link icon' rel='noopener noreferrer' target='_blank' href='https://www.facebook.com/daniel.chicchon'><i className="fab fa-facebook fa-w-16 fa-3x"></i></a>
                <a className='link icon' rel='noopener noreferrer' target='_blank' href='https://www.linkedin.com/in/dchicchon/'><i className="fab fa-linkedin fa-w-16 fa-3x"></i></a>
                <a className='link icon' rel='noopener noreferrer' target='_blank' href='https://www.instagram.com/danny_chicchon/'><i className="fab fa-instagram fa-w-16 fa-3x"></i></a>
                <a className='link icon' rel='noopener noreferrer' target='_blank' href='https://github.com/dchicchon'><i className="fab fa-github fa-w-16 fa-3x"></i></a>
                <a className='link icon' rel='noopener noreferrer' target='_blank' href='https://medium.com/@danielchicchon'><i className="fab fa-medium fa-w-16 fa-3x"></i></a>
            </section>
        </div>
    )
}

export default Contact;