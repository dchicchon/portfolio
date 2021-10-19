import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./Constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";

// Pages
import Home from "./Pages/Main/Home";
import Code from "./Pages/Main/Code";
import Photography from "./Pages/Main/Photography";
import Videography from "./Pages/Main/Videography";

// In Progress Pages
import Polus from "./Pages/Polus";
import About from "./Pages/Polus/Pages/About";
import Privacy from "./Pages/Polus/Pages/Privacy";
import Terms from "./Pages/Polus/Pages/Terms";

import { Home as GitTrack_Home } from "./Pages/GitTrack/Home";
import { Privacy as GitTrack_Privacy } from "./Pages/GitTrack/Privacy";
import { Terms as GitTrack_Terms } from "./Pages/GitTrack/Terms";
import { Support as GitTrack_Support } from "./Pages/GitTrack/Support";
import { Docs as GitTrack_Docs } from "./Pages/GitTrack/Docs";

import { Error } from "./Pages/Error";
// https://medium.com/google-cloud/tracking-site-visits-on-react-app-hosted-in-google-cloud-using-google-analytics-f49c2411d398

axios.defaults.baseURL =
  "https://us-central1-react-portfolio-f7e64.cloudfunctions.net/api";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route exact path={ROUTES.CODE} component={Code} />
            <Route exact path={ROUTES.PHOTOGRAPHY} component={Photography} />
            <Route exact path={ROUTES.VIDEOGRAPHY} component={Videography} />
            <Route exact path={ROUTES.POLUS} component={Polus} />
            <Route exact path={ROUTES.POLUS_ABOUT} component={About} />
            <Route exact path={ROUTES.POLUS_PRIVACY} component={Privacy} />
            <Route exact path={ROUTES.POLUS_TERMS} component={Terms} />
            <Route
              exact
              path={ROUTES.GITTRACK_HOME}
              component={GitTrack_Home}
            />
            <Route
              exact
              path={ROUTES.GITTRACK_PRIVACY}
              component={GitTrack_Privacy}
            />
            <Route
              exact
              path={ROUTES.GITTRACK_TERMS}
              component={GitTrack_Terms}
            />
            <Route
              exact
              path={ROUTES.GITTRACK_SUPPORT}
              component={GitTrack_Support}
            />
            <Route
              exact
              path={ROUTES.GITTRACK_DOCS}
              component={GitTrack_Docs}
            />
            <Route component={Error} />
            {/* <Route exact path={ROUTES.BOARD} component={Board} /> */}
            {/* <Route exact path={ROUTES.MESSENGER} component={Messenger} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
