import React, { Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Importa useHistory
import { withRouter } from "react-router"; //

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: "",
      token: "", // Almacenar el token JWT aquí
    };

    // Debes corregir el manejo de la función de cambio (change handler) a handleChange
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // Cambia la firma de esta función
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email: this.state.email,
        password: this.state.password,
      });

      if (response.data && response.data.token) {
        const token = response.data.token;
        this.setState({ token });
      
        localStorage.setItem("token", token);
        console.log(token);
        this.getAuthenticatedUser();
        this.props.history.push("/user-dashboard");
        console.log("sesión iniciada");

      } else {
        // Maneja la situación en la que no se recibe un token en la respuesta.
        this.setState({ errorText: "Token no recibido en la respuesta" });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.setState({ errorText: "Credenciales incorrectas" });
      } else {
        this.setState({ errorText: "Error en el inicio de sesión" });
      }
    }
  }

  // Agrega una función para llamar a getAuthenticatedUser
  async getAuthenticatedUser() {
    try {
      // Realiza una solicitud para obtener la información del usuario autenticado
      const response = await axios.get("/getAuthenticatedUser", {
        headers: {
          Authorization: `Bearer ${this.state.token}`, // Envia el token JWT en la cabecera
        },
      });

      // Verifica si la solicitud fue exitosa (código de respuesta 200)
      if (response.status === 200) {
        // Maneja la respuesta para obtener los datos del usuario autenticado
        const userData = response.data;

        // Almacena los datos del usuario en el estado o donde sea necesario
        this.setState({ userData });

        // Redirige al usuario a una página protegida, por ejemplo, la página de inicio
        this.props.history.push("/dashboard"); // Asegúrate de tener React Router configurado
      } else {
        // Maneja la situación en la que la solicitud no fue exitosa
        // Esto podría incluir casos de autorización fallida u otros errores del servidor
        // Puedes mostrar un mensaje de error al usuario, por ejemplo:
        this.setState({
          errorText: "No se pudo obtener la información del usuario",
        });
      }
    } catch (error) {
      // Maneja cualquier error de la solicitud, como una autorización fallida
      // Puedes mostrar un mensaje de error al usuario, por ejemplo:
      this.setState({
        errorText: "No se pudo obtener la información del usuario",
      });
    }
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
              onChange={this.handleChange} // Cambia esta línea para usar handleChange
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={this.state.password}
              onChange={this.handleChange} // Cambia esta línea para usar handleChange
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
