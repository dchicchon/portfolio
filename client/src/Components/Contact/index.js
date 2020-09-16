import React from "react";
import profileimg from "../../Assets/images/danny.jpg";
import resume from "../../Assets/docs/Daniel_Chicchon_Stack_2020.pdf";
import { analyticsClick } from "../../Utils/firebase";
import "./style.css";

let headStyle = {
  letterSpacing: "5px",
  textTransform: "uppercase",
  font: "1.5rem Lato, sans-serif",
  textAlign: "center",
  color: "white",
};

const Contact = () => {
  return (
    <div id="contact">
      <section className="opaque-cover contact-area">
        <h2 style={headStyle}>Contact</h2>
        {/* wow this picture sucks */}
        <img className="img-float" src={profileimg} alt="danielchicchon" />

        <div>
          <a
            className="link"
            rel="noopener noreferrer"
            href="mailto:danielchicchon@gmail.com"
            onClick={analyticsClick}
          >
            Email: danielchicchon@gmail.com
          </a>
          <br />
          {/* <iframe src={resume}></iframe> */}
          <a
            className="link"
            rel="noopener noreferrer"
            target="_blank"
            href={resume}
            type="application/pdf"
            onClick={analyticsClick}
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
          onClick={analyticsClick}
        >
          <i className="fab fa-facebook fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/dchicchon/"
          onClick={analyticsClick}
        >
          <i className="fab fa-linkedin fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.instagram.com/chicchia_/"
          onClick={analyticsClick}
        >
          <i className="fab fa-instagram fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/dchicchon"
          onClick={analyticsClick}
        >
          <i className="fab fa-github fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://medium.com/@danielchicchon"
          onClick={analyticsClick}
        >
          <i className="fab fa-medium fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.youtube.com/channel/UC4PD6bhKv8QPWLjJktPMg_Q/"
          onClick={analyticsClick}
        >
          <i className="fab fa-youtube fa-w-16 fa-3x"></i>
        </a>
        <a
          className="link icon"
          rel="noopener noreferrer"
          target="_blank"
          href="https://unsplash.com/@dchicchon"
          onClick={analyticsClick}
        >
          <i className="fas fa-camera fa-w-16 fa-3x"></i>
        </a>
      </section>
    </div>
  );
};

export default Contact;
