import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Questions from './pages/questions';  
import Destinations from './pages/destinations'; // Asegúrate de importar Destinations si es necesario
import dotenv from 'dotenv';
dotenv.config();

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/user-dashboard" component={UserDashboard} />
            <Route path="/questions" component={Questions} />
            <Route path="/destinations" component={Destinations} />
          </Switch>
        </Router>
      </div>
    );
  }
}
