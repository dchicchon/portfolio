import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from "./Constants/routes";
import "./App.css";

// pages
import Home from "./pages/Home";

// Polus
import Polus from "./pages/Polus";
import About from "./pages/Polus/pages/About";
import Privacy from "./pages/Polus/pages/Privacy";
import Terms from "./pages/Polus/pages/Terms";

// Topo
import { Topo } from './pages/Topo'

// Error
import { Error } from "./pages/Error";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.POLUS} element={<Polus />} />
            <Route path={ROUTES.POLUS_ABOUT} element={<About />} />
            <Route path={ROUTES.POLUS_PRIVACY} element={<Privacy />} />
            <Route path={ROUTES.POLUS_TERMS} element={<Terms />} />
            <Route path={ROUTES.TOPO} element={<Topo />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
