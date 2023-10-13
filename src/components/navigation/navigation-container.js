import React, { Component } from 'react';

export default class NavigationContainer extends Component {
  render() {
    return (
      <div className='nav-wrapper'>
        <div className='left-side'>
          <a>INICIO</a>
        </div>

        <div className='right-side'>
          <button>INICIA SESIÓN</button>
        </div>
        
      </div>
    );
  }
}