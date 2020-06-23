import React from "react";
import "./style.css";

import Clock from "../../Components/Clock";
import Carousel from "react-bootstrap/Carousel";

import polusIcon from "../../Assets/images/polus_icon.png";
import slide1 from "../../Assets/images/slide1.png";
import slide2 from "../../Assets/images/slide2.png";
import slide3 from "../../Assets/images/slide3.jpg";

class Polus extends React.Component {
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

  clock = () => {
    let currentTime = new Date();
    return currentTime.toLocaleTimeString();
  };

  render() {
    return (
      <div id="polus">
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
        </ul>
        <main>
          <section id="date">Monday, 6/22/2020</section>
          <section id="clock">
            <Clock />
          </section>
        
          <section id="slideshow">
            <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src={slide1} alt="First Slide" />
                <Carousel.Caption>
                  <h3>Plan Your Day</h3>
                  {/* <p>Stuff!</p> */}
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
                  {/* <p>Stuff!</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={slide3} alt="Third Slide" />
                <Carousel.Caption>
                  <h3>Plan your Month</h3>
                  {/* <p>Stuff!</p> */}
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </section>
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
