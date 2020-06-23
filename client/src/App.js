import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./Constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGA from "react-ga";
import axios from "axios";

import "./App.css";

import ScrollTop from "./Components/ScrollToTop";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";

// Pages
import Home from "./Pages/Home";
import Code from "./Pages/Code";
import Photography from "./Pages/Photography";
import Videography from "./Pages/Videography";

// In Progress Pages
import Polus from "./Pages/Polus";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Messenger from "./Pages/Messenger";
import { auth } from "firebase";

// https://medium.com/google-cloud/tracking-site-visits-on-react-app-hosted-in-google-cloud-using-google-analytics-f49c2411d398
function initializeAnalytics() {
  ReactGA.initialize("UA-154822930-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

axios.defaults.baseURL =
  "https://us-central1-react-portfolio-f7e64.cloudfunctions.net/api";

class App extends Component {
  state = {
    authenticated: false,
  };

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log("Logged In");
        this.setState({
          authenticated: true,
        });
      } else {
        // console.log("Not logged in");
        this.setState({
          authenticated: false,
        });
      }
    });
  }

  render() {
    initializeAnalytics();
    return (
      // If i move this into router, it gets confused
      <div className="App">
        <Router>
          <Switch>
            <ScrollTop>
              <Route exact path={ROUTES.HOME} component={Home} />
              <Route exact path={ROUTES.CODE} component={Code} />
              <Route exact path={ROUTES.POLUS} component={Polus} />
              <Route exact path={ROUTES.PHOTOGRAPHY} component={Photography} />
              <Route exact path={ROUTES.VIDEOGRAPHY} component={Videography} />

              {/* Sign in */}
              <PublicRoute
                path={ROUTES.LOGIN}
                authenticated={this.state.authenticated}
                component={Login}
              />
              <PublicRoute
                path={ROUTES.SIGNUP}
                authenticated={this.state.authenticated}
                component={Signup}
              />

              <PrivateRoute
                path={ROUTES.MESSENGER}
                authenticated={this.state.authenticated}
                component={Messenger}
              />

              {/* <Route path={ROUTES.LOGIN} component={Login} />
                <Route path={ROUTES.SIGNUP} component={Signup} /> */}
              {/* Authorized Routes */}
              {/* {this.state.authenticated ? (
                <Route
                  path={ROUTES.MESSENGER}
                  auth={this.state.authenticated}
                  exact
                  component={Messenger}
                />
              ) : (
                ""
              )} */}

              {/* <Route
                path={ROUTES.MESSENGER}
                authenticated={this.state.authenticated}
                exact
                component={Messenger}
              /> */}
              {/* <Route path={ROUTES.GAME} NEEDS AUTH exact component={Game} /> */}
            </ScrollTop>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
