import React, { useState, useEffect } from 'react';
import Inscription from './Inscription';
import Connexion from './Connexion';
import Meteo from './Meteo';
import Conseils from './Conseils';

const API_BASE = "http://localhost/agrismart-api";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home'); // 'home', 'connexion', 'inscription', 'weather', 'conseils'

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setPage('home');
  };

  const handleLoginSuccess = (utilisateur) => {
    setUser(utilisateur);
    localStorage.setItem("user", JSON.stringify(utilisateur));
    setPage('home');
  };

  if (!user) {
    return (
      <div className="container">
        <h1>AgriSmart</h1>
        <p>Connecte-toi ou crée un compte pour continuer.</p>
        <div style={{ marginBottom: 16 }}>
          <button onClick={() => setPage('connexion')} style={{ marginRight: 8 }}>Connexion</button>
          <button onClick={() => setPage('inscription')}>Inscription</button>
        </div>

        {page === 'inscription' && (
          <Inscription
            apiBase={API_BASE}
            onSuccess={(utilisateur) => handleLoginSuccess(utilisateur)}
          />
        )}
        {page === 'connexion' && (
          <Connexion
            apiBase={API_BASE}
            onLogin={(utilisateur) => handleLoginSuccess(utilisateur)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p>👋 Bienvenue {user.nom || user.email}</p>
        </div>
        <div>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={() => setPage('weather')} style={{ marginRight: 8 }}>Météo</button>
        <button onClick={() => setPage('conseils')}>Conseils</button>
      </div>

      <div style={{ marginTop: 20 }}>
        {page === 'weather' && <Meteo />}
        {page === 'conseils' && <Conseils />}
        {page === 'home' && (
          <>
            <h2>Tableau de bord</h2>
            <p>Choisis une fonctionnalité.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
