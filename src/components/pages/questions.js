import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Questions() {
  return (
    <div>
      <div className="video-container">
        <video autoPlay muted loop>
          <source
            src="/assets/images/background_video2.mp4"
            type="video/mp4"
          />
        </video> 
        <h1 className='video-heading'>Planifica Tu Viaje Perfecto: Un Click, Mil Aventuras</h1>
      </div>

      <h1 className='home-heading'>Bienvenida a nuestro mundo de aventuras</h1>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-item">
            <p>
              EMPIEZA A PREPARAR TU VIAJE
            </p>
          </div>
        </div>
      </div>

      <NavLink className="btn" exact to="/destinations">
        ENCUENTRA MI DESTINO
      </NavLink>
    </div>
  );
}
