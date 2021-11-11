import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from "./Constants/routes";
// import "bootstrap/dist/css/bootstrap.min.css";
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

import { Topo } from './Pages/Topo'

import { Error } from "./Pages/Error";
// https://medium.com/google-cloud/tracking-site-visits-on-react-app-hosted-in-google-cloud-using-google-analytics-f49c2411d398

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CODE} element={<Code />} />
            <Route path={ROUTES.PHOTOGRAPHY} element={<Photography />} />
            <Route path={ROUTES.VIDEOGRAPHY} element={<Videography />} />
            <Route path={ROUTES.POLUS} element={<Polus />} />
            <Route path={ROUTES.POLUS_ABOUT} element={<About />} />
            <Route path={ROUTES.POLUS_PRIVACY} element={<Privacy />} />
            <Route path={ROUTES.POLUS_TERMS} element={<Terms />} />
            <Route
              path={ROUTES.GITTRACK_HOME}
              element={<GitTrack_Home />}
            />
            <Route

              path={ROUTES.GITTRACK_PRIVACY}
              element={<GitTrack_Privacy />}
            />
            <Route

              path={ROUTES.GITTRACK_TERMS}
              element={<GitTrack_Terms />}
            />
            <Route

              path={ROUTES.GITTRACK_SUPPORT}
              element={<GitTrack_Support />}
            />

            <Route

              path={ROUTES.GITTRACK_DOCS}
              element={<GitTrack_Docs />}
            />

            <Route
              path={ROUTES.TOPO}
              element={<Topo />}

            />
            <Route path='*' element={<Error />} />
            {/* <Route  path={ROUTES.BOARD} component={Board} /> */}
            {/* <Route  path={ROUTES.MESSENGER} component={Messenger} /> */}
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
