import React, { useEffect } from "react";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/Navbar";
import Carousel from "react-bootstrap/Carousel";
import slide1 from "../../../../Assets/images/slide1.png";
import slide2 from "../../../../Assets/images/slide2.png";
import slide3 from "../../../../Assets/images/slide3.jpg";
// import polusIcon from "../../../../Assets/images/polus_icon.png";
import "./style.css";

function About() {
  useEffect(() => {
    document.title = "About Polus";
    const imageList = [slide1];
    imageList.forEach((image) => {
      new Image().src = image;
    });
  }, []);
  return (
    <div>
      <NavBar />
      <section
        id="content-about"
        style={{
          maxWidth: "960px",
          width: "62%",
          margin: "80px auto 120px",
          padding: "0 30px",
        }}
      >
        <div className="intro">
          <h2>Polus</h2>
          <p id="subheading">
            Polus is a personal planner designed to help you keep track of your
            time throughout the day, week, and month.
          </p>
        </div>
        <div id="slideshow">
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={slide1} alt="First Slide" />
              <Carousel.Caption>
                <h3>Plan your day</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={slide2} alt="Second Slide" />
              <Carousel.Caption>
                <h3>Plan your week</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={slide3} alt="Third Slide" />
              <Carousel.Caption>
                <h3>Plan your month</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default About;
