import { Route, Routes, useParams, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HOME, ABOUT, PROJECTS, ERROR, CV, LEGACY_POLUS, LEGACY_POLUS_TERMS, LEGACY_POLUS_PRIVACY } from "./utils/mainRoutes";

// Components
import Loading from "./components/Loading/Loading";
import Guide from './components/Guide/Guide'
// pages
import Home from "./pages/Home/Home.jsx";
import { projectMap } from './utils/projectRoutes';
import Error from "./pages/Error/Error";
import Projects from "./pages/Projects/Projects";
import About from "./pages/About/About";
import CVPage from './pages/CV/CV'
import styles from './App.module.css'

const Project = () => {
  const loc = useParams();
  if (!projectMap[loc.id]) return <Error message={`Project: ${loc.id} does not exist`} />
  const { export: componentexport } = projectMap[loc.id];
  const Component = lazy(componentexport);
  return (
    <Suspense fallback={<Loading />}>
      < Component />
    </Suspense >
  )
}

const Root = () => {
  return (
    <>
      <Guide links={[HOME]} />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <Guide links={[ABOUT, PROJECTS]} startRight />
    </>
  )

}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Root />}>
        <Route path={HOME.to} element={<Home />} />
        <Route path={ABOUT.to} element={<About />} />
        <Route path={CV.to} element={<CVPage />} />
        <Route path={PROJECTS.to} element={<Projects />} />
        <Route path="/projects/:id/*" element={<Project />} />
        {/* Include reroutes for old website */}
        <Route path={LEGACY_POLUS.to} element={<Navigate to={LEGACY_POLUS.redirect} replace />} />
        <Route path={LEGACY_POLUS_TERMS.to} element={<Navigate to={LEGACY_POLUS_TERMS.redirect} replace />} />
        <Route path={LEGACY_POLUS_PRIVACY.to} element={<Navigate to={LEGACY_POLUS_PRIVACY.redirect} replace />} />
        <Route path={ERROR.to} element={<Error />} />
      </Route>
    </Routes>

  );
}

export default App;
