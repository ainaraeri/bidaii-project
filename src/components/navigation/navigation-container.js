import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';


const NavigationComponent = (props) => {
  const [scrolled, setScrolled] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 700;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('/check-auth');
        setAuthenticated(response.data.authenticated);

        if (response.data.authenticated) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error al comprobar la autenticación:', error);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      setAuthenticated(false);
      setUser(null);
      props.history.push('/auth');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };


  return (
    <div className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" className="nav-logo">
            <img src="../../assets/images/logobidaii.png" alt="Logo" />
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">
            BIDAII
          </NavLink>
        </div>
      </div>

      <div className="right-side">
        {authenticated ? (
          <>
            <div className="nav-link-wrapper">
              <span onClick={handleLogout} className="nav-link-active">
                CERRAR SESIÓN
              </span>
            </div>
            <div className="nav-link-wrapper">
              <NavLink exact to="/profile" className="user-icon">
                <FontAwesomeIcon icon={faCircleUser} className="icon" />
              </NavLink>
            </div>
            <div className="nav-link-wrapper">
              ¡Hola, {user}!
            </div>
          </>
        ) : (
          <>
            <div className="nav-link-wrapper">
              <NavLink exact to="/auth" activeClassName="nav-link-active">
                INICIA SESIÓN
              </NavLink>
            </div>
            <div className="nav-link-wrapper">
              <NavLink exact to="/auth" className="user-icon">
                <FontAwesomeIcon icon={faCircleUser} className="icon" />
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);
