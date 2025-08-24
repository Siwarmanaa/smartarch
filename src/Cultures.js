import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cultures.css";

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

function Cultures({ apiBase = "http://localhost/agrismart-api", user, language = 'fr' }) {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(user?.email || "");

  const translations = {
    fr: {
      title: "Sélectionnez vos cultures",
      email: "Email :",
      save: "Enregistrer",
      saveSuccess: "Cultures enregistrées avec succès !",
      saveError: "Erreur lors de l'enregistrement.",
      enterEmail: "Veuillez entrer votre email avant de sauvegarder."
    },
    en: {
      title: "Select your crops",
      email: "Email:",
      save: "Save",
      saveSuccess: "Crops saved successfully!",
      saveError: "Error during saving.",
      enterEmail: "Please enter your email before saving."
    },
    ar: {
      title: "اختر محاصيلك",
      email: "البريد الإلكتروني:",
      save: "حفظ",
      saveSuccess: "تم حفظ المحاصيل بنجاح!",
      saveError: "خطأ أثناء الحفظ.",
      enterEmail: "يرجى إدخال بريدك الإلكتروني قبل الحفظ."
    }
  };

  const t = translations[language] || translations.fr;

  useEffect(() => {
    setEmail(user?.email || "");
  }, [user]);

  useEffect(() => {
    const effectiveEmail = user?.email || email;
    if (!effectiveEmail) return;

    // 1) Charger depuis localStorage immédiatement pour ressenti rapide
    const localKey = `cultures:${effectiveEmail}`;
    const localData = localStorage.getItem(localKey);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed)) setSelected(parsed);
      } catch (_) {}
    }

    // 2) Tenter la synchro serveur
    (async () => {
      try {
        const res = await axios.get(`${apiBase}/get_cultures.php`, { params: { email: effectiveEmail } });
        if (res.data && Array.isArray(res.data.cultures)) {
          setSelected(res.data.cultures);
          localStorage.setItem(localKey, JSON.stringify(res.data.cultures));
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Load cultures failed', e);
      }
    })();
  }, [apiBase, user, email]);

  const toggleCrop = (crop) => {
    if (selected.includes(crop)) {
      setSelected(selected.filter((c) => c !== crop));
    } else if (selected.length < 8) {
      setSelected([...selected, crop]);
    }
  };

  const saveCultures = async () => {
    if (!email) {
      setMessage(t.enterEmail);
      return;
    }

    try {
      const response = await axios.post(
        `${apiBase}/save_cultures.php`,
        { email, cultures: selected },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(response.data.message || t.saveSuccess);
      // Sauvegarde locale par compte
      localStorage.setItem(`cultures:${email}`, JSON.stringify(selected));
    } catch (error) {
      console.error(error);
      setMessage(t.saveError);
      // Fallback: garder au moins en local
      localStorage.setItem(`cultures:${email}`, JSON.stringify(selected));
    }
  };

  return (
    <div className="cultures-page">
      <h2>{t.title}</h2>
      <p>{selected.length}/8</p>

      {!user?.email && (
        <div className="email-input">
          <label>{t.email}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}

      <div className="crops-grid">
        {cropsList.map((crop) => (
          <div
            key={crop.name}
            className={`crop-item ${selected.includes(crop.name) ? "selected" : ""}`}
            onClick={() => toggleCrop(crop.name)}
          >
            <span>{crop.icon}</span> {crop.name}
          </div>
        ))}
      </div>

      <button onClick={saveCultures}>{t.save}</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Cultures;
