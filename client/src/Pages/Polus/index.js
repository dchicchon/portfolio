import React from "react";
import polusBackground from "../../Assets/images/mountain_range.jpg";
import "./style.css";

import Clock from "../../Components/Clock";
import Carousel from "react-bootstrap/Carousel";

import polusIcon from "../../Assets/images/polus_icon.png";
import slide1 from "../../Assets/images/slide1.png";
import slide2 from "../../Assets/images/slide2.png";
import slide3 from "../../Assets/images/slide3.jpg";

class Polus extends React.Component {
  componentDidMount() {
    const imageList = [polusBackground, slide1];
    imageList.forEach((image) => {
      new Image().src = image;
    });
  }

  hideItems = () => {
    let title = document.getElementById("app-intro");
    let items = document.getElementById("app-items");
    title.style.display = "none";
    items.style.display = "inline-block";
  };

  showItems = () => {
    let title = document.getElementById("app-intro");
    let items = document.getElementById("app-items");
    title.style.display = "inline-block";
    items.style.display = "none";
  };

  hideItems2 = () => {
    let location = document.getElementById("background-location");
    let source = document.getElementById("background-source");
    location.style.display = "none";
    source.style.display = "inline-block";
  };

  showItems2 = () => {
    let location = document.getElementById("background-location");
    let source = document.getElementById("background-source");
    location.style.display = "inline-block";
    source.style.display = "none";
  };

  date = () => {
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

  render() {
    return (
      <div id="polus" style={{ backgroundImage: `url(${polusBackground})` }}>
        <ul id="nav">
          <li
            id="app-info"
            onMouseOver={this.hideItems}
            onMouseLeave={this.showItems}
          >
            <div id="app-intro">
              <img id="app-logo" src={polusIcon} alt="polus icon" />
              <div id="app-title">Polus</div>
            </div>
            <div id="app-items">
              <div className="app-item">
                <a rel="noopener noreferrer" href="https://danielchicchon.io">
                  Back to Site
                </a>
              </div>
              <div className="app-item">
                <a href="mailto: danielchicchon@gmail.com">Contact Us</a>
              </div>
            </div>
          </li>
          <li
            id="background-info"
            style={{ float: "right" }}
            onMouseOver={this.hideItems2}
            onMouseLeave={this.showItems2}
          >
            <span id="background-location">
              Frenchman Mountain, Sunrise Manor
            </span>
            <span id="background-source">
              Photo By{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://unsplash.com/photos/JymOHokYI1w"
              >
                Daniel Chicchon
              </a>{" "}
              on
              <a
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
          <section id="date">{this.date()}</section>
          <section id="clock">
            <Clock />
          </section>

          <section id="slideshow">
            <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src={slide1} alt="First Slide" />
                <Carousel.Caption>
                  <h3>Plan Your Day</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={slide2}
                  alt="Second Slide"
                />
                <Carousel.Caption>
                  <h3>Plan Your Week</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={slide3} alt="Third Slide" />
                <Carousel.Caption>
                  <h3>Plan your Month</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </section>
          <section id="polus-intro">Make your plans today</section>

          <section id="link">
            <a
              id="link-tag"
              target="_blank"
              rel="noopener noreferrer"
              href="https://chrome.google.com/webstore/detail/polus/meajimhgfmioppbkoppphhkbcmapfngh?hl=en&authuser=0"
            >
              + Add to Chrome
            </a>
          </section>
        </main>
      </div>
    );
  }
}

export default Polus;
