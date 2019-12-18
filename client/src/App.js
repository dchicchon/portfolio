import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./Constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

// Pages
import Home from "./Pages/Home";
import Code from "./Pages/Code";
import Photography from "./Pages/Photography";
import Videography from "./Pages/Videography";

class App extends Component {
  state = {};

  render() {
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
