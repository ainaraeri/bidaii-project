import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import NavigationContainer from './navigation/navigation-container';
import Auth from './pages/auth';
import Home from './pages/home';
import UserDashboard from './auth/user-dashboard';
import Register from './auth/register';
import Login from './auth/login';
import dotenv from 'dotenv';
dotenv.config();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  // Verificar la cookie en algún lugar de tu aplicación React
  checkAuthentication = () => {
    const isAuthenticated = document.cookie.includes('authenticated');
    console.log('Is Authenticated:', isAuthenticated);
    
    // Actualizar el estado después de verificar la autenticación
    this.setState({ isAuthenticated });
  };

  handleSuccessfulLogin = () => {
    this.setState(
      (prevState) => ({ isAuthenticated: true }),
      () => {
        console.log('Nuevo estado:', this.state.isAuthenticated);
      }
    );
  };

  handleUnsuccessfulLogin = () => {
    this.setState(
      (prevState) => ({ isAuthenticated: false }),
      () => {
        console.log('Nuevo estado:', this.state.isAuthenticated);
      }
    );
  };

  componentDidMount() {
    // Llamar a la función de verificación al montar el componente
    this.checkAuthentication();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isAuthenticated !== this.state.isAuthenticated) {
      console.log('Nuevo estado:', this.state.isAuthenticated);
    }
  }

  render() {
    return (
      <div>
        <Router>
          <NavigationContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/auth"
              render={(props) => (
                <Auth
                  {...props}
                  isAuthenticated={this.state.isAuthenticated}
                  handleSuccessfulLogin={this.handleSuccessfulLogin}
                  handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                />
              )}
            />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/user-dashboard" component={UserDashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}
