import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./Constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";

// Pages
import Home from "./Pages/Home";
import Code from "./Pages/Code";
import Photography from "./Pages/Photography";
import Videography from "./Pages/Videography";

// In Progress Pages
import Polus from "./Pages/Polus";
// import Messenger from "./Pages/Messenger";
// import Board from "./Pages/Board";
import About from "./Pages/Polus/Pages/About";
import Privacy from "./Pages/Polus/Pages/Privacy";
import Terms from "./Pages/Polus/Pages/Terms";
// import { firebaseConfig } from "./Utils/firebase";

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
            <Route exact path={ROUTES.PABOUT} component={About} />
            <Route exact path={ROUTES.PPRIVACY} component={Privacy} />
            <Route exact path={ROUTES.PTERMS} component={Terms} />
            {/* <Route exact path={ROUTES.BOARD} component={Board} /> */}
            {/* <Route exact path={ROUTES.MESSENGER} component={Messenger} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
