import React from "react";
import { Nav } from "../Nav";
import { Footer } from "../Footer";
import "./style.css";

export const Home = () => {
  return (
    <div>
      <Nav />
      <div id="gittrack-home">
        <h1>GitTrack</h1>
        <p>Short description here</p>
        <img alt="GitTrack Screenshot in Slack appliaction" />
        <div id="brief-description">
          <p>Description of some kind showing what GitTrack is</p>
        </div>
        <p>List of app features:</p>
        <ul>
          <li>Check git contributions from users</li>
        </ul>

        <p>Stretch Goals for GitTrack</p>
        <ul>
          <li>Show Graphical data for user contributions in workspace</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};
