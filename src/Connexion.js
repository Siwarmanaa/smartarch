import React, { useState } from 'react';

function Connexion({ apiBase, onLogin }) {
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const loginWithLocalStorage = () => {
    const raw = localStorage.getItem('users');
    const users = raw ? JSON.parse(raw) : [];
    const found = users.find(u => (u.email || '').toLowerCase() === email.toLowerCase());
    if (!found) {
      setError("Utilisateur introuvable.");
      return false;
    }
    if (found.motdepasse !== motdepasse) {
      setError("Mot de passe invalide.");
      return false;
    }
    const { motdepasse: _pwd, ...utilisateur } = found;
    onLogin(utilisateur);
    return true;
  };

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
        body: JSON.stringify({ email, motdepasse })
      });
      if (!res.ok) {
        // Fallback local si API non disponible
        if (!loginWithLocalStorage()) {
          setError(`Serveur indisponible (${res.status}).`);
        }
        return;
      }
      const data = await res.json();
      if (data && data.success) {
        onLogin(data.utilisateur);
      } else {
        // Fallback sur localStorage en cas d'échec côté API
        if (!loginWithLocalStorage()) {
          setError((data && data.message) || "Échec de la connexion");
        }
      }
    } catch (_) {
      // Réseau HS → fallback localStorage
      if (!loginWithLocalStorage()) {
        setError("Impossible de contacter le serveur.");
      }
    } finally {
      setBusy(false);
    }
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
