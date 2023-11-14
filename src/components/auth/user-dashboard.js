import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Favorites from "../pages/favorites";
import Help from "../pages/help";
import Discover from "../pages/discover";
import axios from "axios";
const { secretToken } = require('../../token');
import { FaUser, FaHeart, FaGlobe, FaQuestionCircle } from "react-icons/fa"; // Importa los iconos

class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
    };
  }

  render() {
    return (
      <Router>
        <div className="dashboard-container">
          {/* Barra de navegación */}
          <div className="navbar">
            {/* Contenido de la barra de navegación */}
          </div>

          {/* Estructura del contenido principal */}
          <div className="content-container">
            {/* Menú lateral */}
            <div className="sidebar">
              <Link to="/" className="menu-item">
                <FaUser className="menu-icon" />
                <span>Perfil</span>
              </Link>
              <Link to="/favorites" className="menu-item">
                <FaHeart className="menu-icon" />
                <span>Favoritos</span>
              </Link>
              <Link to="/discover" className="menu-item">
                <FaGlobe className="menu-icon" />
                <span>Descubre el mundo</span>
              </Link>
              <Link to="/help" className="menu-item">
                <FaQuestionCircle className="menu-icon" />
                <span>Ayuda</span>
              </Link>
            </div>

            {/* Contenido principal */}
            <div className="main-content">
              {/* Rutas */}
              <Route path="/" exact component={() => <div>PERFIL</div>} />
              <Route path="/favorites" component={Favorites} />
              <Route path="/discover" component={Discover} />
              <Route path="/help" component={Help} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default UserDashboard;
