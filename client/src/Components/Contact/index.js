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

                <p>
                    <div className='link-rise'>
                        <a className='link' href='mailto:danielchicchon@gmail.om'>Email: danielchicchon@gmail.com</a>
                    </div>
                    <br />

                </p>
            </section>
        </div>
    )
}

export default Contact;