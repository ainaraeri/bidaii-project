import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from "axios";
import NavigationContainer from './navigation/navigation-container';
import Auth from './pages/auth';

export default class App extends Component {

  render() {
    return (
      <div>
        <NavigationContainer />
        <img src="../../assets/images/auth/login.jpg"></img>
        <switch>
          <Route path="/iniciosesion" component={Auth} />
        </switch>
      </div>
    );
  }
}