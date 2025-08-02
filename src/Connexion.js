import React, { useState } from 'react';

function Connexion({ apiBase, onLogin }) {
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleLogin = async () => {
    setError(null);
    if (!email || !motdepasse) {
      setError("Email et mot de passe requis.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`${apiBase}/connexion.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motdepasse }),
      });
      const data = await res.json();
      if (data.success) {
        onLogin(data.utilisateur);
      } else {
        setError(data.message || "Échec de la connexion");
      }
    } catch (e) {
      setError("Impossible de contacter le serveur.");
    }
    setBusy(false);
  };

  return (
    <div>
      <h2>Connexion</h2>
      <div>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Mot de passe" value={motdepasse} onChange={e => setMotdepasse(e.target.value)} /><br />
        <button onClick={handleLogin} disabled={busy}>
          {busy ? "Connexion..." : "Se connecter"}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default Connexion;
