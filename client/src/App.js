import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./Constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGA from "react-ga";
import axios from "axios";

import "./App.css";

// Pages
import Home from "./Pages/Home";
import Code from "./Pages/Code";
import Photography from "./Pages/Photography";
import Videography from "./Pages/Videography";

// https://medium.com/google-cloud/tracking-site-visits-on-react-app-hosted-in-google-cloud-using-google-analytics-f49c2411d398
function initializeAnalytics() {
  ReactGA.initialize("UA-154822930-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

axios.defaults.baseURL =
  "https://us-central1-react-portfolio-f7e64.cloudfunctions.net/api";

class App extends Component {
  state = {};

  render() {
    initializeAnalytics();
    return (
      // If i move this into router, it gets confused
      <div className="App">
        <Router>
          <Switch>
            <Route path={ROUTES.HOME} exact component={Home} />
            <Route path={ROUTES.CODE} exact component={Code} />
            <Route path={ROUTES.PHOTOGRAPHY} exact component={Photography} />
            <Route path={ROUTES.VIDEOGRAPHY} exact component={Videography} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
