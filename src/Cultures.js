import React, { useState } from 'react';
import './Cultures.css';

const cropsList = [
  { name: "Apple", icon: "🍎" },
  { name: "Bean", icon: "🌱" },
  { name: "Black & Green Gram", icon: "🌿" },
  { name: "Cabbage", icon: "🥬" },
  { name: "Capsicum & Chilli", icon: "🌶️" },
  { name: "Chickpea & Gram", icon: "🧄" },
  { name: "Citrus", icon: "🍋" },
  { name: "Cotton", icon: "🧵" },
  { name: "Ginger", icon: "🫚" },
  { name: "Banana", icon: "🍌" },
  { name: "Cucumber", icon: "🥒" },
  { name: "Brinjal", icon: "🍆" },
];

function Cultures() {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("siwar.menaa02@gmail.com");

  // Sélection/désélection d'une culture
  const toggleCrop = (crop) => {
    if (selected.includes(crop)) {
      setSelected(selected.filter((c) => c !== crop));
    } else if (selected.length < 8) {
      setSelected([...selected, crop]);
    }
  };

  const isSelected = (crop) => selected.includes(crop);

  // Sauvegarde des cultures dans la base
  const saveCultures = async () => {
    if (!email) {
      setMessage("Veuillez entrer votre email avant de sauvegarder.");
      return;
    }

    try {
      const res = await fetch("http://localhost/agrismart-api/save_cultures.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          cultures: selected,
        }),
      });

      const data = await res.json();
      setMessage(data.message || "Cultures enregistrées avec succès !");
    } catch (err) {
      setMessage("Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div className="cultures-page">
      <div className="cultures-header">
        <h2>Sélectionnez vos cultures</h2>
        <p>{selected.length}/8</p>
      </div>

      {/* Champ email */}
      <div className="email-input">
        <label htmlFor="email">Entrez votre email :</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ex: exemple@gmail.com"
          required
        />
      </div>

      {/* Cultures sélectionnées */}
      <div className="selected-crops">
        {selected.map((crop) => (
          <span key={crop} className="selected-crop">
            {crop}
            <button onClick={() => toggleCrop(crop)}>✖</button>
          </span>
        ))}
      </div>

      {/* Grille des cultures disponibles */}
      <div className="crops-grid">
        {cropsList.map((crop) => (
          <div
            key={crop.name}
            className={`crop-item ${isSelected(crop.name) ? "selected" : ""}`}
            onClick={() => toggleCrop(crop.name)}
          >
            <span className="crop-icon">{crop.icon}</span>
            <span className="crop-name">{crop.name}</span>
          </div>
        ))}
      </div>

      {/* Bouton enregistrer */}
      <button className="save-button" onClick={saveCultures}>Save</button>

      {/* Message d'erreur ou confirmation */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Cultures;
