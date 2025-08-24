import React, { useState } from "react";
import axios from "axios";

function Inscription({ apiBase, onRegistered, language = 'fr' }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [message, setMessage] = useState("");

  const translations = {
    fr: {
      title: "Créer un compte",
      name: "Nom",
      email: "Email",
      password: "Mot de passe",
      signupButton: "S'inscrire",
      fillFields: "Veuillez remplir tous les champs.",
      signupError: "Erreur lors de l'inscription"
    },
    en: {
      title: "Create account",
      name: "Name",
      email: "Email",
      password: "Password",
      signupButton: "Sign up",
      fillFields: "Please fill all fields.",
      signupError: "Error during registration"
    },
    ar: {
      title: "إنشاء حساب",
      name: "الاسم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      signupButton: "التسجيل",
      fillFields: "يرجى ملء جميع الحقول.",
      signupError: "خطأ أثناء التسجيل"
    }
  };

  const t = translations[language] || translations.fr;

  const handleSubmit = async () => {
    if (!nom || !email || !motdepasse) {
      setMessage(t.fillFields);
      return;
    }

    try {
      const form = new URLSearchParams();
      form.append('nom', nom);
      form.append('email', email);
      form.append('motdepasse', motdepasse);
      const res = await axios.post(`${apiBase}/inscription.php`, form.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        withCredentials: false
      });
      const raw = res?.data;
      const data = typeof raw === 'string' ? { message: raw } : (raw || {});
      setMessage(data.message || (typeof raw === 'string' ? raw : ""));
      if (
        data.success === true || data.success === 1 || data.success === '1' ||
        data.status === 'ok' || data.status === 'success' || data.status === true ||
        (typeof raw === 'string' && raw.toLowerCase().includes('success'))
      ) {
        if (typeof onRegistered === 'function') onRegistered();
      }
    } catch (error) {
      // Aide au debug
      // eslint-disable-next-line no-console
      console.error('Inscription error:', error);
      setMessage(t.signupError + ": " + (error?.message || ''));
    }
  };

  return (
    <div>
      <h2>{t.title}</h2>
      <input
        type="text"
        placeholder={t.name}
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <input
        type="email"
        placeholder={t.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder={t.password}
        value={motdepasse}
        onChange={(e) => setMotdepasse(e.target.value)}
      />
      <button onClick={handleSubmit}>{t.signupButton}</button>
      <p>{message}</p>
    </div>
  );
}

export default Inscription;
