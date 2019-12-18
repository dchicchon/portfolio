import React, { Component } from "react";
import "./style.css";

// Components
import Featured from "../../Components/Featured";
import Services from "../../Components/Services";
import CodeAbout from "../../Components/CodeAbout";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

class Code extends Component {
  render() {
    return (
      <div id='code'>
        <Navbar />
        <Featured />
        <Services />
        <CodeAbout />
        <Footer text='Back to top' link='#featured' />
      </div>
    );
  }
}

export default Code;
