import React from 'react';
import marsellaImg from "../../../static/assets/images/marsella.jpg";
import { NavLink } from 'react-router-dom';

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
          <h1>Planifica Tu Viaje Perfecto: Un Click, Mil Aventuras</h1>
        </div>
      </div>
      <div className="introduction-wrapper">
        <div className="introduction-left">
          <h1>Bienvenida a nuestro mundo de aventuras</h1>
          <p>
            En BIDAII, encontrarás una forma rápida y sencilla de planificar tu
            viaje perfecto. Imagina explorar lugares increíbles sin tener que
            preocuparte por la planificación minuciosa. Aquí, en un solo clic,
            podrás diseñar tu itinerario ideal y centrarte plenamente en
            disfrutar cada momento de tu viaje.
          </p>

          <NavLink className="btn" exact to="/iniciosesion">
            VÁMONOS
          </NavLink>
        </div>

        <div
          className="introduction-right"
          style={{
            backgroundImage: `url(${marsellaImg})`,
            backgroundPosition: "center", // Esto centrará la imagen
            backgroundSize: "cover", // Esto asegura que la imagen cubra todo el contenedor
            backgroundRepeat: "no-repeat", // Esto asegura que la imagen no se repita
          }}
        ></div>

        <div className="grid-container">
          <div className="grid-row">
            <div className="grid-item">
              <img src="ruta_imagen1.jpg" alt="Imagen 1" />
            </div>
            <div className="grid-item">
              <p>Texto 1</p>
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-item">
              <p>Texto 2</p>
            </div>
            <div className="grid-item">
              <img src="ruta_imagen2.jpg" alt="Imagen 2" />
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-item">
              <img src="ruta_imagen3.jpg" alt="Imagen 3" />
            </div>
            <div className="grid-item">
              <p>Texto 3</p>
            </div>
          </div>
          {/* Agrega más grid-rows según sea necesario */}
        </div>
      </div>
    </div>
  );
}