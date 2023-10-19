import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from "axios";
import NavigationContainer from './navigation/navigation-container';
import Auth from './pages/auth';
import Home from './pages/home';

export default class App extends Component {
  

  render() {
    return (
      <div>
        <Router>
          <NavigationContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/iniciosesion" component={Auth} />
          </Switch>
        </Router>
      </div>
    );
  }
}

