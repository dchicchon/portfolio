import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

// Pages
import Home from './Pages/Home';
import Music from './Pages/Music';
import Code from './Pages/Code';
import Art from './Pages/Art';
import Photography from './Pages/Photography';

// Components
import Navbar from './Components/Navbar';

// Utils

// This will host the clientside routing for my portfolio
class App extends React.Component {

  state = {

  }

  render() {
    return (
      <div className='App'>
        <Router>
          {/* {window.pageYOffset > 200 ? <Navbar active='nav-show' /> : <Navbar active='nav-hide' />} */}
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/music' exact component={Music} />
            <Route path='/code' exact component={Code} />
            <Route path='/art' exact component={Art} />
            <Route path='/photography' exact component={Photography} />

          </Switch>
        </Router>
      </div>
    );

  }
}

export default App;
