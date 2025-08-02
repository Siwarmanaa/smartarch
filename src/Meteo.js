// Meteo.js
import React, { useState, useEffect } from 'react';

function Meteo() {
  const [data, setData] = useState(null);
  const [ville, setVille] = useState('Tunis');
  const [error, setError] = useState(null);

  const API_KEY = '4354f3dc36d8a6d31da420e2bba8ef41';

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(result => {
        if (result.cod === 200) {
          setData(result);
          setError(null);
        } else {
          setError(result.message || 'Erreur météo');
          setData(null);
        }
      })
      .catch(() => {
        setError("Impossible de récupérer la météo.");
        setData(null);
      });
  }, [ville]);

  return (
    <div>
      <h2>🌤️ Météo actuelle à {ville}</h2>
      <input
        type="text"
        value={ville}
        onChange={(e) => setVille(e.target.value)}
        placeholder="Entrer une ville"
      />
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {data && (
        <div>
          <p>Température : {data.main.temp}°C</p>
          <p>Conditions : {data.weather[0].description}</p>
          <p>Humidité : {data.main.humidity}%</p>
          <p>Vent : {data.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Meteo;
