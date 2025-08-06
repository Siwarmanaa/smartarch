import React, { useState } from 'react';

function Connexion({ apiBase, onLogin }) {
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleLogin = async () => {
    setBusy(true);
    setError(null);

    if (!email || !motdepasse) {
      setError("Veuillez remplir tous les champs");
      setBusy(false);
      return;
    }

    try {
      const res = await fetch(`${apiBase}/connexion.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motdepasse })
      });

      if (!res.ok) {
        setError("Erreur serveur, code " + res.status);
        setBusy(false);
        return;
      }

      const data = await res.json();

      if (data.success) {
        onLogin(data.user);  // <-- ici data.user, pas data.utilisateur
      } else {
        setError(data.message || "Erreur de connexion");
      }
    } catch (e) {
      setError("Impossible de contacter le serveur");
    }

    setBusy(false);
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        placeholder="Mot de passe"
        type="password"
        value={motdepasse}
        onChange={(e) => setMotdepasse(e.target.value)}
      /><br />
      <button onClick={handleLogin} disabled={busy}>
        {busy ? "Connexion..." : "Se connecter"}
      </button>
    </div>
  );
}

export default Connexion;
