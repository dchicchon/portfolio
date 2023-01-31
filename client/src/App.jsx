import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import { HOME, ABOUT, PROJECTS, ERROR, LOADING } from "./utils/mainRoutes";
import { lazy, Suspense } from "react";

// Components
import Loading from "./components/Loading/Loading";
import Guide from './components/Guide/Guide'
// pages
import Home from "./pages/Home/Home.jsx";
import { projectMap } from './utils/projectRoutes';
import Error from "./pages/Error/Error";
import Projects from "./pages/Projects/Projects";
import About from "./pages/About/About";

// We should show the project based on param ids?
const Project = () => {
  const loc = useParams();
  if (!projectMap[loc.id]) return <Error message={`Project: ${loc.id} does not exist`} />
  const { export: componentexport } = projectMap[loc.id];
  const Component = lazy(componentexport);
  console.log(Component);
  return (
    <>
      <Guide links={[HOME]} />
      <Suspense fallback={<Loading />}>
        < Component />
      </Suspense >
      <Guide links={[ABOUT, PROJECTS]} startRight />
    </>


  )
}

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path={HOME.to} element={<Home />} />
        <Route path={ABOUT.to} element={<About />} />
        <Route path={PROJECTS.to} element={<Projects />} />
        <Route path={LOADING.to} element={<Loading />} />
        <Route path="/projects/:id/*" element={<Project />} />
        <Route path={ERROR.to} element={<Error />} />
      </Routes>
    </Router>

  );
}

export default App;
