import React, { useState } from 'react';

function Inscription({ apiBase, onSuccess }) {
  const [form, setForm] = useState({
    email: '', nom: '', motdepasse: '',
    naissance: '', genre: '', telephone: ''
  });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setBusy(true);
    setError(null);

    try {
      const res = await fetch(`${apiBase}/inscription.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (data.success) {
        onSuccess(data.utilisateur);
      } else {
        setError(data.message || "Erreur inconnue");
      }
    } catch (e) {
      setError("Erreur de connexion au serveur");
    }

    setBusy(false);
  };

  return (
    <div>
      <h2>Créer un compte</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
      <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} /><br />
      <input name="motdepasse" placeholder="Mot de passe" type="password" value={form.motdepasse} onChange={handleChange} /><br />
      <input name="naissance" placeholder="Date de naissance (jj/mm/aaaa)" value={form.naissance} onChange={handleChange} /><br />
      <input name="genre" placeholder="Genre (Homme/Femme)" value={form.genre} onChange={handleChange} /><br />
      <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} /><br />
      <button onClick={handleSubmit} disabled={busy}>S'inscrire</button>
    </div>
  );
}

export default Inscription;
