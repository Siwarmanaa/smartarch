import React, { useState } from 'react';

function Inscription({ apiBase, onSuccess }) {
  const [form, setForm] = useState({
    email: '',
    nom: '',
    motdepasse: '',
    date_de_naissance: '',
    genre: 'Autre',
    telephone: ''
  });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!form.email || !form.nom || !form.motdepasse) {
      setError("Email, nom et mot de passe sont requis.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`${apiBase}/inscription.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        // après inscription, on peut automatiquement connecter : refaire appel à connexion ou renvoyer user minimal
        onSuccess({
          email: form.email,
          nom: form.nom,
          date_de_naissance: form.date_de_naissance,
          genre: form.genre,
          telephone: form.telephone
        });
      } else {
        setError(data.message || "Erreur inscription");
      }
    } catch (e) {
      setError("Impossible de contacter le serveur.");
    }
    setBusy(false);
  };

  return (
    <div>
      <h2>Inscription</h2>
      <div>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} /><br />
        <input name="motdepasse" type="password" placeholder="Mot de passe" value={form.motdepasse} onChange={handleChange} /><br />
        <label>
          Date de naissance: <br />
          <input name="date_de_naissance" type="date" value={form.date_de_naissance} onChange={handleChange} />
        </label><br />
        <label>
          Genre:
          <select name="genre" value={form.genre} onChange={handleChange}>
            <option>Homme</option>
            <option>Femme</option>
            <option>Autre</option>
          </select>
        </label><br />
        <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} /><br />
        <button onClick={handleSubmit} disabled={busy}>
          {busy ? "En cours..." : "S'inscrire"}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default Inscription;
