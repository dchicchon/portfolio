import React, { useEffect, useState } from "react";
import "./style.scss";

// Components
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import pic from "../../Assets/images/dannypic.jpg";
import resume from '../../Assets/docs/Daniel_Chicchon_Stack_2020.pdf'
import Navbar from "../../Components/Navbar";

const Code = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    document.title = "Code";
    setWidth(window.innerWidth);
  }, [width]);
  return (
    <>
      <Navbar />
      <div id="code">
        <section id="code-header">
          <img id="code-photo" src={pic} />
          <div id="code-details">
            <Link to="/code">
              <h1>Daniel Chicchon</h1>
            </Link>
            <p className="code-p">
              Full-Stack Developer based in San Francisco, California.
            </p>
            <div>
              <ul id="code-socials">
                <li className="code-social-item">
                  <a
                    href="https://github.com/dchicchon"
                    target="_blank"
                    rel="noopenner noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li className="code-social-item">
                  <a
                    href="https://www.linkedin.com/in/dchicchon/"
                    target="_blank"
                    rel="noopenner noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="code-social-item">
                  <a
                    href="https://unsplash.com/@dchicchon"
                    target="_blank"
                    rel="noopenner noreferrer"
                  >
                    Unsplash
                  </a>
                </li>
                <li className="code-social-item">
                  <a
                    href={resume}
                    target="_blank"
                    rel="noopenner noreferrer"
                  >
                    Resume
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="code-about">
          <div className="code-left">
            <h3>About Me</h3>
          </div>
          <div className="code-right">
            <p className="code-p">
              I'm a motivated full-stack engineer who has experience building
              and scaling web applications and services in various domains.
            </p>
            <p className="code-p">
              I'm also passionate about open source contributions, working in
              high impact environments with frequent deployments, and helping
              growing development teams build great products.
            </p>
          </div>
        </section>
        <section id="code-projects">
          <div className="code-left">
            <h3>Projects</h3>
          </div>
          <div className="code-right">
            <div className="code-project-link">
              <Link to="/polus">Polus</Link>
              <p>
                A chrome extension planner to help keep track of your calendar
              </p>
            </div>
            <div className="code-project-link">
              <a
                href="http://planit.ml/"
                target="_blank"
                rel="noopenner noreferrer"
              >
                Plan-it
              </a>
              <p>
                A planner app that helps keep track of weather, nearby food
                locations, BART Schedule, and saved notes
              </p>
            </div>
            <div className="code-project-link">
              <a
                href="http://www.gittrack.ml/"
                target="_blank"
                rel="noopenner noreferrer"
              >
                GitTrack
              </a>
              <p>
                A git commit tracking site for instructors to keep track of
                student coding progress.
              </p>
            </div>
          </div>
        </section>
        <section id="code-experience">
          <div className="code-left">
            <h3>Experience</h3>
          </div>
          <div className="code-right">
            <div className="mb-6">
              <h5>Trilogy Education</h5>
              <p className="code-p">
                Full Stack Software Engineering Tutor, October 2020 - Present
              </p>
            </div>
            <div className="mb-6">
              <h5>Trilogy Education</h5>
              <p className="code-p">
                Full Stack Teaching Assistant, August 2019 - November 2019
              </p>
            </div>
          </div>
        </section>
        <section id="code-skills">
          <div className="code-left">
            <h3>Skills</h3>
          </div>
          <div className="code-right">
            <div className="mb-6">
              <h5>Languages & Frameworks</h5>
              <p className="code-p">
                Javascript, Python, React, Express.js, Selenium, BeautifulSoup
              </p>
            </div>
            <div className="mb-6">
              <h5>Databases</h5>
              <p className="code-p">MongoDB, MySQL</p>
            </div>
            <div className="mb-6">
              <h5>Other</h5>
              <p className="code-p">
                Firebase, Agile/Scrum, API Design, Chrome Extension Development
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer color="#2f3d4a" />
    </>
  );
};

export default Code;
