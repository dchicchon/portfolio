import React, { useEffect } from "react";
import {
  Link,
} from "react-router-dom";
import Clock from "./Components/Clock";
import polusIcon from "../../Assets/images/polus_icon.png";
import polusBackground from "../../Assets/images/mountain_range.png";
import "./style.css";

let hideItems2 = () => {
  let location = document.getElementById("background-location");
  let source = document.getElementById("background-source");
  location.style.display = "none";
  source.style.display = "inline-block";
};

let showItems2 = () => {
  let location = document.getElementById("background-location");
  let source = document.getElementById("background-source");
  location.style.display = "inline-block";
  source.style.display = "none";
};

let date = () => {
  let currentDate = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  let date = `${currentDate.toLocaleDateString(undefined, options)}`;
  return date;
};

function Polus() {
  useEffect(() => {
    document.title = "Polus";
  }, []);

  // let { path, url } = useRouteMatch();
  return (
    <div id="polus" style={{ backgroundImage: `url(${polusBackground})` }}>
      <ul id="nav">
        <li id="app-info">
          <div id="app-intro">
            <Link to="/polus">
              <img id="app-logo" src={polusIcon} alt="polus icon" />
            </Link>
            <div id="app-title">{/* <a href="">Polus</a> */}</div>
          </div>
          <div id="app-items">
            <div className="app-item">
              <Link style={{ color: "white", textShadow: '0 0 25px rgb(0 0 0 / 60%)' }} to={`/polus/about`}>
                About
              </Link>
            </div>
            <div className="app-item">
              <a style={{ color: 'white', textShadow: '0 0 25px rgb(0 0 0 / 60%)' }} href='https://bit.ly/2N6RPEk' rel='noopener noreferrer' >
                Youtube
              </a>
            </div>
          </div>
        </li>
        <li
          id="background-info"
          style={{ float: "right" }}
          onMouseOver={hideItems2}
          onMouseLeave={showItems2}
        >
          <span id="background-location">
            Frenchman Mountain, Sunrise Manor
          </span>
          <span id="background-source">
            Photo By{" "}
            <a
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://unsplash.com/photos/JymOHokYI1w"
            >
              Daniel Chicchon
            </a>{" "}
            on
            <a
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://unsplash.com/?utm_source=Planner&utm_medium=referral"
            >
              {" "}
              Unsplash
            </a>
          </span>
        </li>
      </ul>

      <main>
        <section id="date" className='large-text'>{date()}</section>
        <section id="clock" className='large-text'>
          <Clock />
        </section>

        <section id="polus-intro" className='large-text'>
          <p>Make your plans today</p>
        </section>

        {/* VIDEO */}
        <div id='polus-video-wrapper'>
          <iframe id='polus-video' title='polus_video' src="https://www.youtube.com/embed/25f_hLEdLds" allowFullScreen></iframe>
        </div>

        <section id="link">
          <a
            id="link-tag"
            target="_blank"
            rel="noopener noreferrer"
            href="https://chrome.google.com/webstore/detail/polus/meajimhgfmioppbkoppphhkbcmapfngh?hl=en&authuser=0"
          >
            + Add Polus to Chrome
          </a>
        </section>
      </main>
      <div id="bottom"></div>
      <div id="bottom-right">
        <nav id="tertiary">
          <Link style={{ color: "white" }} to="/polus/privacy">
            Privacy
          </Link>
          <Link style={{ color: "white" }} to="/polus/terms">
            Terms
          </Link>
          <a style={{ color: "white" }} href="mailto: danielchicchon@gmail.com" rel='noopener noreferrer'>
            Contact
          </a>
          <Link style={{ color: "white" }} to="/">
            Back to site
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Polus;
