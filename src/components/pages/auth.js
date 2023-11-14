import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "../auth/login";
import Register from "../auth/register"; 
import axios from 'axios';

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth() {
    console.log("Inicio de sesión exitoso");
    this.props.handleSuccessfulLogin();
    this.props.history.push("/user-dashboard");
  }
  
  handleUnsuccessfulAuth() {
    console.log("Inicio de sesión fallido");
    this.props.handleUnsuccessfulLogin();
    this.setState({ errorText: "Error en el inicio de sesión" });
  }
  

  render() {
    console.log("Estado de autenticación:", this.props.isAuthenticated);
    return (
      <div className="auth-page-wrapper">
        <div
          className="left-column"
          style={{
            backgroundImage: `url('/assets/images/auth/balloons.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="right-column">
          <div className="login-container">
            <Login
              handleSuccessfulAuth={this.handleSuccessfulAuth}
              handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
            />
          </div>
          <div className="register-container">
            <Register
              handleSuccessfulAuth={this.handleSuccessfulAuth}
              handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
            />
          </div>
        </div>
      </div>
    );
  }
}
