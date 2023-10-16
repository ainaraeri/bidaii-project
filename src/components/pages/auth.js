import React, { Component } from "react";
import Login from "../auth/login";
import marsellaImg from "../../../static/assets/images/auth/marsella.jpg";

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
            backgroundImage: `url(${marsellaImg})`,
            backgroundPosition: 'center', // Esto centrará la imagen
            backgroundSize: 'cover', // Esto asegura que la imagen cubra todo el contenedor
            backgroundRepeat: 'no-repeat' // Esto asegura que la imagen no se repita
          }}
        />

        <div className="right-column">
          <Login
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
          />
        </div>
      </div>
    );
  }
}