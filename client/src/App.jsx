import { Route, Routes, Outlet, useLocation } from 'react-router-dom';
import { HOME, ABOUT, PROJECTS, ERROR, CV } from './utils/mainRoutes';
import Guide from './components/Guide/Guide';
import { ga } from './utils/firebase';

// Pages
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import Polus from './pages/Polus/Polus';
import Projects from './pages/Projects/Projects';
import About from './pages/About/About';
import CVPage from './pages/CV/CV';
import styles from './App.module.css';
import { useEffect } from 'react';

const Root = () => {
  return (
    <>
      <Guide links={[HOME]} />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <Guide links={[ABOUT, PROJECTS]} startRight />
    </>
  );
};

const App = () => {
  const location = useLocation();
  useEffect(() => {
    ga(`route visit: ${location.pathname}`);
  }, [location]);
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path={HOME.to} element={<Home />} />
        <Route path={ABOUT.to} element={<About />} />
        <Route path={CV.to} element={<CVPage />} />
        <Route path={PROJECTS.to} element={<Projects />} />
        <Route path="/polus/*" element={<Polus />} />
        <Route path={ERROR.to} element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
