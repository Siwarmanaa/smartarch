// C’est dans src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // c’est ta maison (le contenu visible)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
