import React, { Component } from "react";
import axios from "axios";


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      // ... otros campos que necesites para el registro
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
  
    const registrationData = {
      email: this.state.email,
      password: this.state.password,
      // ... otros datos del formulario que necesites enviar
    };
  
    axios
      .post("URL_del_endpoint_de_registro", registrationData)
      .then((response) => {
        console.log("Registro exitoso:", response.data);
        // Puedes redirigir a otra página después del registro si lo deseas
      })
      .catch((error) => {
        console.error("Error durante el registro:", error);
      });
  };

  render() {
    return (
      <div>
        <h2>Regístrate</h2>
        <form onSubmit={this.handleFormSubmit}>
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
          {/* Otros campos del formulario */}
          <button type="submit">Registrarse</button>
        </form>
      </div>
    );
  }
}
