import React, { useState } from 'react';
import Meteo from './Meteo';
import Conseils from './Conseils';
import Cultures from './Cultures'; 


function App() {
  const [page, setPage] = useState('home'); // 'home', 'weather', 'conseils'
  const nomUtilisateur = 'Siwar';

  const renderHeader = () => (
    <>
      <h1 style={{ marginBottom: 10, fontWeight: 'bold', fontSize: '2.5rem' }}>
        <span style={{ color: 'green' }}>🌱 Agri</span>
        <span style={{ color: 'orange' }}>Smart</span>
      </h1>

      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.lKXHxUktB7AP2A0BE7ifQQHaFR%3Fpid%3DApi&f=1&ipt=3fefa774cab7ebcb7ba45acf3aab73abcf2515529eb707dc32d6a39ed458d958&ipo=images"
        alt="Illustration agriculture"
        style={{ width: 300, height: 'auto', marginBottom: 20, borderRadius: 10 }}
      />
    </>
  );

  const renderButtons = () => (
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={() => setPage('weather')}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          marginRight: 10,
          borderRadius: 5,
          cursor: 'pointer'
        }}
      >
        🌦️ Météo
      </button>
      <button
        onClick={() => setPage('cultures')}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          marginRight: 10,
          borderRadius: 5,
          cursor: 'pointer'
        }}
      >
        🌾 Cultures
      </button>

      <button
        onClick={() => setPage('conseils')}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer'
        }}
      >
        🌿 Conseils
      </button>
    </div>
  );

  return (
    <div className="container" style={{ padding: 20, fontFamily: 'Arial' }}>
      {renderHeader()}

      {page === 'home' && (
        <>
          <h2>Bienvenue {nomUtilisateur} 🌾</h2>
          <p>Votre assistant agricole intelligent est à votre service !</p>
          <p>🌤️ Consultez la météo locale pour planifier votre journée</p>
          <p>🌱 Découvrez des conseils agricoles adaptés à la saison</p>
          {renderButtons()}
        </>
      )}

      {page === 'weather' && (
        <>
          <button
            onClick={() => setPage('home')}
            style={{
              marginBottom: 20,
              backgroundColor: '#ccc',
              padding: '5px 15px',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer'
            }}
          >
            🏠 Retour à l'accueil
          </button>
          <Meteo />
        </>
      )}

      {page === 'conseils' && (
        <>
          <button
            onClick={() => setPage('home')}
            style={{
              marginBottom: 20,
              backgroundColor: '#ccc',
              padding: '5px 15px',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer'
            }}
          >
            🏠 Retour à l'accueil
          </button>
          <Conseils />
        </>
      )}
      {page === 'cultures' && (
        <>
          <button
            onClick={() => setPage('home')}
            style={{
              marginBottom: 20,
              backgroundColor: '#ccc',
              padding: '5px 15px',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer'
            }}
          >
            🏠 Retour à l'accueil
          </button>
          <Cultures />
        </>
      )}
      
      
    </div>
    
  );
}

export default App;
