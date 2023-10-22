import React, { Component } from 'react';

export default function() {
  return (
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
  );
}