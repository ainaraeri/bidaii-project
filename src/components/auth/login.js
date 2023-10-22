import React, { Component } from 'react';
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }

  handleSubmit(event) {
    axios
      .post(
        "http://bidaii-project2-f71c13b6eccf.herokuapp.com/login",
        {
          client: {
            email: this.state.email,
            password: this.state.password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth();
        } else {
          this.setState({
            errorText: "Wrong email or password"
          });
          this.props.handleUnsuccessfulAuth();
        }
      })
      .catch(error => {
        this.setState({
          errorText: "An error occurred"
        });
        this.props.handleUnsuccessfulAuth();
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className='form-wrapper'>
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
            <button className='btn' type="submit">Iniciar sesión</button>
          </div>
        </form>
      </div>
    );
  }
}