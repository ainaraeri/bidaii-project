import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        console.log("Inicio de sesión exitoso:", response.data);
        // Llamar a la función para actualizar el estado de autenticación
        this.props.handleSuccessfulAuth();
        // Redirigir a la página del panel de usuario
        this.props.history.push("/user-dashboard");
      })      
      .catch((error) => {
        console.error("Error en el inicio de sesión:", error);
        // Puedes manejar errores y mostrar un mensaje adecuado si es necesario
        this.props.handleUnsuccessfulAuth();  // Asegúrate de que esté correctamente llamada
        this.setState({ errorText: "Error en el inicio de sesión" });
      });
  }
  
  render() {
    return (
      <div className="form-wrapper">
        <h2>INICIA SESIÓN</h2>
        <div>{this.state.errorText}</div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="btn-wrapper">
            <button className="btn" type="submit">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
