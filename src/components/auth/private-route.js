import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const token = localStorage.getItem('token');
      console.log('Token en PrivateRoute:', token);
      return token ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

export default PrivateRoute; // Agrega esta línea para exportar el componente
