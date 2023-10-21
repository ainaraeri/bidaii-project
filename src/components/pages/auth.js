import React, { Component } from "react";
import Login from "../auth/login";
import Register from "../auth/register"; 
//import balloonsImg from "../../../static/assets/images/auth/balloons.jpg";


export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth() {
    this.props.handleSuccessfulLogin();
    this.props.history.push("/");
  }

  handleUnsuccessfulAuth() {
    this.props.handleUnsuccessfulLogin();
  }

  render() {
    return (
      <div className="auth-page-wrapper">
        <div
          className="left-column"
          style={{
            backgroundImage: `url('/assets/images/auth/balloons.jpg')`,
            //backgroundImage: `url(${balloonsImg})`,
            backgroundPosition: "center", // Esto centrará la imagen
            backgroundSize: "cover", // Esto asegura que la imagen cubra todo el contenedor
            backgroundRepeat: "no-repeat", // Esto asegura que la imagen no se repita
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
            <Register />
          </div>
        </div>
      </div>
    );
  }
}