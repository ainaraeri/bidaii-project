import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    // Validar que la contraseña tenga al menos 8 caracteres
    if (this.state.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const registrationData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:8080/register", registrationData)
      .then((response) => {
        console.log("Registro exitoso:", response.data);
        this.props.history.push("/user-dashboard");
      })
      .catch((error) => {
        console.error("Error durante el registro:", error);
        alert("Error durante el registro. Inténtalo de nuevo.");
      });
  };


  render() {
    return (
      <div className="form-wrapper">
        <h2>REGÍSTRATE</h2>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="Correo electrónico"
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="Contraseña"
            />
          </div>
          <div className="btn-wrapper">
            <button className="btn" type="submit">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
