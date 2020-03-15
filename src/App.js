import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './components/HomePage';
import NoMatch from './components/NoMatch';
import VodPage from './components/VodPage';

import './assets/fonts/MoskNormal400.ttf';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/vods/:id" component={VodPage} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
