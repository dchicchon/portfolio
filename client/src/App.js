import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

// Pages
import Home from './Pages/Home';
import Music from './Pages/Music';
import Code from './Pages/Code';
import Art from './Pages/Art';

// Components

// Utils

// This will host the clientside routing for my portfolio
class App extends React.Component {

  state = {

  }

  render() {
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/' exact component={Music} />
            <Route path='/' exact component={Code} />
            <Route path='/' exact component={Art} />



          </Switch>
        </Router>
      </div>
    );

  }
}

export default App;
