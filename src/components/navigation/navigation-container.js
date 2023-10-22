import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const NavigationComponent  = (props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 700; // Cambia este valor según el ancho de la foto que haya
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  }; 


  return (
    <div className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" className="nav-logo" >
            <img  src="../../assets/images/logobidaii.png" />
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">
            BIDAII
          </NavLink>
        </div>
      </div>

      <div className="right-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/login" className="nav-link-active">
            INICIA SESIÓN
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink exact to="/login" className="user-icon">
            <FontAwesomeIcon icon={faCircleUser} className='icon'/>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

    
export default withRouter(NavigationComponent);