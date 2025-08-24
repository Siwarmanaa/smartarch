import React, { useState } from 'react';

function Connexion({ apiBase, onLogin, language = 'fr' }) {
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const translations = {
    fr: {
      title: "Connexion",
      email: "Email",
      password: "Mot de passe",
      loginButton: "Se connecter",
      connecting: "Connexion...",
      fillFields: "Veuillez remplir tous les champs",
      serverError: "Erreur serveur, code",
      connectionError: "Erreur de connexion",
      cannotContact: "Impossible de contacter le serveur"
    },
    en: {
      title: "Login",
      email: "Email",
      password: "Password",
      loginButton: "Login",
      connecting: "Connecting...",
      fillFields: "Please fill all fields",
      serverError: "Server error, code",
      connectionError: "Connection error",
      cannotContact: "Cannot contact server"
    },
    ar: {
      title: "تسجيل الدخول",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      loginButton: "تسجيل الدخول",
      connecting: "جاري الاتصال...",
      fillFields: "يرجى ملء جميع الحقول",
      serverError: "خطأ في الخادم، رمز",
      connectionError: "خطأ في الاتصال",
      cannotContact: "لا يمكن الاتصال بالخادم"
    }
  };

  const t = translations[language] || translations.fr;

  const handleLogin = async () => {
    setBusy(true);
    setError(null);

    if (!email || !motdepasse) {
      setError(t.fillFields);
      setBusy(false);
      return;
    }

    try {
      const res = await fetch(`${apiBase}/connexion.php`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': 'application/json, text/plain, */*'
        },
        body: new URLSearchParams({
          email,
          motdepasse,
          password: motdepasse,
          mdp: motdepasse
        }).toString()
      });

      if (!res.ok) {
        setError(t.serverError + " " + res.status);
        setBusy(false);
        return;
      }

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        const isOk = data.success === true || data.success === 1 || data.success === '1' || data.status === 'ok' || data.status === true || data.status === 1 || data.status === 'success';
        if (isOk) {
          const connectedUser = data.user || data.utilisateur || data.data || { email };
          onLogin(connectedUser);
        } else {
          setError(data.message || t.connectionError);
        }
      } else {
        const text = (await res.text()) || '';
        const normalized = text.toLowerCase();
        const looksOk = res.ok && (normalized.includes('ok') || normalized.includes('success') || normalized.includes('connect'));
        if (looksOk) {
          onLogin({ email });
        } else {
          setError(text || `${t.connectionError} (code ${res.status})`);
        }
      }
    } catch (e) {
      setError(t.cannotContact + ": " + (e?.message || ''));
    }

    setBusy(false);
  };

  return (
    <div>
      <h2>{t.title}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        placeholder={t.email}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        placeholder={t.password}
        type="password"
        value={motdepasse}
        onChange={(e) => setMotdepasse(e.target.value)}
      /><br />
      <button onClick={handleLogin} disabled={busy}>
        {busy ? t.connecting : t.loginButton}
      </button>
    </div>
  );
}

export default Connexion;
