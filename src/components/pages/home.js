import React, { Component } from 'react';

export default function() {
  return (
    <div>
      <div>
      <div className="video-container">
        <video autoPlay muted loop>
          <source
            src={"../../assets/images/background_video2.mp4"}
            type="video/mp4"
          />
        </video>
        <h1>Planifica Tu Viaje Perfecto: Un Click, Mil Aventuras </h1>
        <h2>¡Descubre, Disfruta, Explora!</h2>
      </div>
    </div>
      <div className="introduction-wrapper">
            <div className="introduction">
              <h1>Bienvenida a nuestro mundo de aventuras</h1>
              <p>
                En BIDAII, encontrarás una forma rápida y sencilla de planificar
                tu viaje perfecto. Imagina explorar lugares increíbles sin tener
                que preocuparte por la planificación minuciosa. Aquí, en un solo
                clic, podrás diseñar tu itinerario ideal y centrarte plenamente
                en disfrutar cada momento de tu viaje.
              </p>
            </div>
          </div>

    </div>
  );
}