import React from "react";
import { Nav } from "../Nav";
import { Footer } from "../Footer";
import pic from "../../../Assets/images/gittrack_image.png";
import graph from "../../../Assets/images/graph.png";
import "./style.css";

export const Home = () => {
  return (
    <div id="gittrack-page">
      <Nav />
      <div id="gittrack-home">
        <div className="panels">
          <section className="panel panel-md">
            <h1>GitTrack</h1>
            <p>Track Github Contributions</p>
            <a href="https://slack.com/oauth/v2/authorize?scope=chat%3Awrite%2Ccommands%2Cchannels%3Ahistory%2Cgroups%3Ahistory%2Cusers%3Aread&state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YWxsT3B0aW9ucyI6eyJzY29wZXMiOlsiY2hhdDp3cml0ZSIsImNvbW1hbmRzIiwiY2hhbm5lbHM6aGlzdG9yeSIsImdyb3VwczpoaXN0b3J5IiwidXNlcnM6cmVhZCJdfSwibm93IjoiMjAyMS0xMC0yM1QwMjo1NTowNy4zMDdaIiwiaWF0IjoxNjM0OTU3NzA3fQ.0PhXjwCgh4qAoJgFRS_zuS130I0qX31VpoY8BIULn4M&client_id=2557512756422.2598233471089">
              <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"/>
            </a>
          </section>
          <section className="panel panel-md panel-image">
            <img
              className="panel-image-full"
              src={pic}
              alt="GitTrack Screenshot in Slack appliaction"
            />
          </section>
        </div>
        <div className="panels">
          <section className="panel-white panel panel-md">
            <img className="panel-image-md" src={graph} alt="Graph Icon" />
          </section>
          <section className="panel panel-description panel-md">
            <ul className="gittrack-list">
              <li>
                {">"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Get graphical data for the
                contributions by users in your workspace weekly and monthly
              </li>
              <br />
              <li>
                {">"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Manage the users in the
                slack workspace through Slack user interfaces
              </li>
              <br />

              <li>
                {">"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Check the most recent commit messages and repositories of your users
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};
