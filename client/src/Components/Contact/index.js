import React from "react";
// import profileimg from '../../Assets/images/IMG_0045.JPG'
import profileimg from "../../Assets/images/danny.jpg";

import resume from "../../Assets/docs/Daniel_Chicchon_Resume.pdf";
import "./style.css";

const Contact = () => {
  return (
    <div id="contact">
      <section className="opaque-cover contact-area">
        <h2>Contact</h2>
        {/* wow this picture sucks */}
        <img className="img-float" src={profileimg} alt="danielchicchon" />

        <div>
          <a
            className="link"
            rel="noopener noreferrer"
            href="mailto:danielchicchon@gmail.com"
          >
            Email: danielchicchon@gmail.com
          </a>
          <br />
          <a
            className="link"
            rel="noopener noreferrer"
            target="_blank"
            href={resume}
          >
            Resume
          </a>
        </div>
        <br />
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.facebook.com/daniel.chicchon"
        >
          <i className="fab fa-facebook fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/dchicchon/"
        >
          <i className="fab fa-linkedin fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.instagram.com/danny_chicchon/"
        >
          <i className="fab fa-instagram fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/dchicchon"
        >
          <i className="fab fa-github fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://medium.com/@danielchicchon"
        >
          <i className="fab fa-medium fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.youtube.com/channel/UC4PD6bhKv8QPWLjJktPMg_Q/"
        >
          <i className="fab fa-youtube fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://unsplash.com/@dchicchon"
        >
          <i className="fas fa-camera fa-w-16 fa-3x"></i>
        </a>
      </section>
    </div>
  );
};

export default Contact;
