import { HOME, ABOUT, PROJECTS, ERROR, CV } from './utils/mainRoutes';
import { ga } from './utils/firebase';

// Pages
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import PolusHome from './pages/PolusHome';
import PolusAbout from './pages/PolusAbout';
import PolusTerms from './pages/PolusTerms';
import PolusPrivacy from './pages/PolusPrivacy';
import Projects from './pages/Projects/Projects';
import Activity from './pages/Activity';
import About from './pages/About/About';
import CVPage from './pages/CV/CV';
// import styles from './App.module.css';

import { Route, Switch } from 'wouter';

const App = () => {
  // const location = useLocation();
  // useEffect(() => {
  //   ga(`route visit: ${location.pathname}`);
  // }, [location]);
  return (
    <Switch>
      <Route path={HOME.to} component={Home} />
      <Route path={ABOUT.to} component={About} />
      <Route path={PROJECTS.to} component={Projects} />
      <Route path={CV.to} component={CVPage} />
      <Route path={'/activity'} component={Activity} />
      <Route path={'/polus'} component={PolusHome} />
      <Route path={'/polus/about'} component={PolusAbout} />
      <Route path={'/polus/privacy'} component={PolusPrivacy} />
      <Route path={'/polus/terms'} component={PolusTerms} />
      <Route path={ERROR.to} component={Error} />
    </Switch>
  );
};

export default App;
