import React, { Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Importa useHistory
import { withRouter } from "react-router"; // Importa withRouter


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      surname: "",
      age: "",
      city: ""

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
      name: this.state.name,
      surname: this.state.surname,
      age: this.state.age,
      city: this.state.city,
      // ... otros datos del formulario que necesites enviar
    };
  
    axios
      .post("http://localhost:8080/register", registrationData)
      .then((response) => {
        console.log("Registro exitoso:", response.data);
        this.props.history.push("/user-dashboard");
      })
      .catch((error) => {
        console.error("Error durante el registro:", error);
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

export default withRouter(Register); // Envuelve el componente con withRouter
