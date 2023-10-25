import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from "axios";
import NavigationContainer from './navigation/navigation-container';
import Auth from './pages/auth';
import Home from './pages/home';
import UserDashboard from './auth/user-dashboard';
import Register from './auth/register';
import Login from './auth/login';
import PrivateRoute from './auth/private-route';
import dotenv from 'dotenv';
dotenv.config();

export default class App extends Component {
  

  render() {
    return (
      <div>
        <Router>
          <NavigationContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/auth" component={Auth} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/user-dashboard" component={UserDashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

