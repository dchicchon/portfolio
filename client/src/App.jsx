import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from "react-router-dom";
import { HOME, ABOUT, PROJECTS, ERROR } from "./utils/routes";
import './App.css'

// pages
import Home from "./pages/Home/Home.jsx";

import { projectMap } from './utils/projectRoutes';
import { useStore } from "./utils/store";
import { Error } from "./pages/Error/Error";
import Projects from "./pages/Projects/Projects";

// Polus
// import Polus from "./projects/Polus/Polus.jsx";
// import About from "./projects/Polus/pages/About/About.jsx";
// import Privacy from "./projects/Polus/pages/Privacy/Privacy.jsx";
// import Terms from "./projects/Polus/pages/Terms/Terms.jsx";


// We should show the project based on param ids?
const Project = () => {
  const loc = useParams();
  // based on id, we return the component
  const Component = projectMap[loc.id]
  return <Component />
}

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path={HOME.to} element={<Home />} />
        <Route path={PROJECTS.to} element={<Projects />} />
        <Route path="projects/:id" element={<Project />} />
        <Route path={ERROR.to} element={<Error />} />
        {/* <Route path={ABOUT} element={<About />} /> */}
        {/* <Route path={POLUS} element={<Polus />} /> */}
        {/* <Route path={POLUS_ABOUT} element={<About />} /> */}
        {/* <Route path={POLUS_PRIVACY} element={<Privacy />} /> */}
        {/* <Route path={POLUS_TERMS} element={<Terms />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
