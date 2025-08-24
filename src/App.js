import React, { useState } from 'react';
import Meteo from './Meteo';
import Conseils from './Conseils';
import Cultures from './Cultures';
import Connexion from './Connexion';
import Inscription from './Inscription';

// Dictionnaires de traduction
const translations = {
  fr: {
    welcome: "Bienvenue",
    dashboard: "Tableau de bord",
    weather: "Météo",
    crops: "Cultures",
    advice: "Conseils",
    currentWeather: "Météo actuelle",
    temperature: "Température",
    conditions: "Conditions",
    rain: "Pluie",
    alerts: "Alertes",
    dailyTip: "Conseil du jour",
    quickAccess: "Accès rapide",
    myCrops: "Mes cultures",
    library: "Bibliothèque",
    statistics: "Statistiques",
    seeDetails: "Voir détails",
    moreAdvice: "Plus de conseils",
    partner: "Votre partenaire agricole intelligent",
    login: "Connexion",
    signup: "Inscription",
    email: "Email",
    password: "Mot de passe",
    name: "Nom",
    loginButton: "Se connecter",
    signupButton: "S'inscrire",
    noAccount: "Pas de compte ?",
    hasAccount: "Déjà inscrit ?",
    createAccount: "Créer un compte",
    connectAccount: "Se connecter",
    logout: "Se déconnecter",
    selectCrops: "Sélectionnez vos cultures",
    save: "Enregistrer",
    apiUrl: "URL API (ex: http://localhost/agrismart-api)"
  },
  en: {
    welcome: "Welcome",
    dashboard: "Dashboard",
    weather: "Weather",
    crops: "Crops",
    advice: "Advice",
    currentWeather: "Current weather",
    temperature: "Temperature",
    conditions: "Conditions",
    rain: "Rain",
    alerts: "Alerts",
    dailyTip: "Daily tip",
    quickAccess: "Quick access",
    myCrops: "My crops",
    library: "Library",
    statistics: "Statistics",
    seeDetails: "See details",
    moreAdvice: "More advice",
    partner: "Your smart farming partner",
    login: "Login",
    signup: "Sign up",
    email: "Email",
    password: "Password",
    name: "Name",
    loginButton: "Login",
    signupButton: "Sign up",
    noAccount: "No account ?",
    hasAccount: "Already registered ?",
    createAccount: "Create account",
    connectAccount: "Login",
    logout: "Logout",
    selectCrops: "Select your crops",
    save: "Save",
    apiUrl: "API URL (ex: http://localhost/agrismart-api)"
  },
  ar: {
    welcome: "مرحبا بك",
    dashboard: "لوحة التحكم",
    weather: "الطقس",
    crops: "المحاصيل",
    advice: "نصائح",
    currentWeather: "حالة الطقس",
    temperature: "درجة الحرارة",
    conditions: "الحالة",
    rain: "أمطار",
    alerts: "تنبيهات",
    dailyTip: "نصيحة اليوم",
    quickAccess: "وصول سريع",
    myCrops: "محاصيلي",
    library: "المكتبة",
    statistics: "إحصائيات",
    seeDetails: "رؤية التفاصيل",
    moreAdvice: "المزيد من النصائح",
    partner: "شريكك الزراعي الذكي",
    login: "تسجيل الدخول",
    signup: "التسجيل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    name: "الاسم",
    loginButton: "تسجيل الدخول",
    signupButton: "التسجيل",
    noAccount: "ليس لديك حساب؟",
    hasAccount: "لديك حساب بالفعل؟",
    createAccount: "إنشاء حساب",
    connectAccount: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    selectCrops: "اختر محاصيلك",
    save: "حفظ",
    apiUrl: "رابط API (مثال: http://localhost/agrismart-api)"
  }
};

function App() {
  const [page, setPage] = useState('home');
  const [language, setLanguage] = useState('fr');
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState('login'); // 'login' | 'signup'
  const [apiBase, setApiBase] = useState(() => {
    const saved = localStorage.getItem('apiBase');
    return saved || (process.env.REACT_APP_API_BASE || 'http://localhost/agrismart-api');
  });
  
  const t = (key) => translations[language][key] || key;

  const dateActuelle = new Date().toLocaleDateString(language, { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  // Données simulées
  const dashboardData = {
    meteo: {
      temperature: 24,
      conditions: language === 'fr' ? "Ensoleillé" : 
                 language === 'en' ? "Sunny" : "مشمس",
      pluie: "10%"
    },
    alertes: language === 'fr' ? [
      "Risque de mildiou sur tomates",
      "Arrosage recommandé demain matin"
    ] : language === 'en' ? [
      "Risk of blight on tomatoes",
      "Watering recommended tomorrow morning"
    ] : [
      "خطر الإصابة باللفحة على الطماطم",
      "الري موصى به صباح الغد"
    ],
    conseilDuJour: language === 'fr' ? 
      "Pensez à aérer votre serre en journée pour éviter l'humidité excessive la nuit." :
      language === 'en' ? 
      "Remember to ventilate your greenhouse during the day to avoid excessive humidity at night." :
      "تذكر تهوية الصوبة الزراعية خلال النهار لتجنب الرطوبة الزائدة ليلاً"
  };

  const renderContent = () => {
    if (!user) {
      return (
        <div style={{ maxWidth: 420, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <input
              value={apiBase}
              onChange={(e) => { setApiBase(e.target.value); localStorage.setItem('apiBase', e.target.value); }}
              placeholder={t('apiUrl')}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>
          {authPage === 'login' ? (
            <>
              <Connexion
                apiBase={apiBase}
                language={language}
                onLogin={(loggedUser) => {
                  setUser(loggedUser);
                  setPage('home');
                }}
              />
              <p style={{ marginTop: 10 }}>
                {t('noAccount')}{' '}
                <button onClick={() => setAuthPage('signup')} style={{ background: 'none', border: 'none', color: '#27ae60', cursor: 'pointer', padding: 0 }}>
                  {t('createAccount')}
                </button>
              </p>
            </>
          ) : (
            <>
              <Inscription
                apiBase={apiBase}
                language={language}
                onRegistered={() => setAuthPage('login')}
              />
              <p style={{ marginTop: 10 }}>
                {t('hasAccount')}{' '}
                <button onClick={() => setAuthPage('login')} style={{ background: 'none', border: 'none', color: '#27ae60', cursor: 'pointer', padding: 0 }}>
                  {t('connectAccount')}
                </button>
              </p>
            </>
          )}
        </div>
      );
    }
    switch (page) {
      case 'weather':
        return <Meteo language={language} />;
      case 'conseils':
        return <Conseils language={language} />;
      case 'cultures':
        return <Cultures language={language} apiBase={apiBase} user={user} />;
      case 'home':
      default:
        return (
          <div className="dashboard-content">
            <div style={headerStyle}>
              <h2>{t('welcome')} {(user && (user.nom || user.name || user.email)) || ''} 👩‍🌾</h2>
              <p style={dateStyle}>{dateActuelle}</p>
            </div>

            <div style={cardsContainer}>
              <div style={cardStyle}>
                <h3 style={cardTitleStyle}>🌤️ {t('currentWeather')}</h3>
                <p>{t('temperature')}: {dashboardData.meteo.temperature}°C</p>
                <p>{t('conditions')}: {dashboardData.meteo.conditions}</p>
                <p>{t('rain')}: {dashboardData.meteo.pluie}</p>
                <button 
                  onClick={() => setPage('weather')}
                  style={actionButtonStyle}
                >
                  {t('seeDetails')}
                </button>
              </div>

              <div style={{...cardStyle, borderLeft: '4px solid #e74c3c'}}>
                <h3 style={cardTitleStyle}>⚠️ {t('alerts')}</h3>
                <ul style={listStyle}>
                  {dashboardData.alertes.map((alerte, index) => (
                    <li key={index}>{alerte}</li>
                  ))}
                </ul>
              </div>

              <div style={{...cardStyle, background: '#f8f9fa'}}>
                <h3 style={cardTitleStyle}>💡 {t('dailyTip')}</h3>
                <p style={adviceStyle}>"{dashboardData.conseilDuJour}"</p>
                <button 
                  onClick={() => setPage('conseils')}
                  style={actionButtonStyle}
                >
                  {t('moreAdvice')}
                </button>
              </div>
            </div>

            <div style={quickAccessStyle}>
              <h3 style={sectionTitleStyle}>{t('quickAccess')}</h3>
              <div style={quickAccessButtons}>
                <button 
                  onClick={() => setPage('cultures')}
                  style={quickButtonStyle}
                >
                  🌾 {t('myCrops')}
                </button>
                <button 
                  onClick={() => setPage('conseils')}
                  style={quickButtonStyle}
                >
                  📚 {t('library')}
                </button>
                <button 
                  onClick={() => setPage('weather')}
                  style={quickButtonStyle}
                >
                  📈 {t('statistics')}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={appContainer}>
      <nav style={navStyle}>
        <div style={logoContainer}>
          <h1 style={logoStyle}>🌱 AgriSmart</h1>
          <p style={sloganStyle}>{t('partner')}</p>
        </div>
        
        {/* Sélecteur de langue */}
        <div style={languageSelector}>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={selectStyle}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        {user ? (
          <div style={menuItems}>
            <button
              onClick={() => setPage('home')}
              style={menuButtonStyle(page === 'home')}
            >
              🏠 {t('dashboard')}
            </button>
            <button
              onClick={() => setPage('weather')}
              style={menuButtonStyle(page === 'weather')}
            >
              🌦️ {t('weather')}
            </button>
            <button
              onClick={() => setPage('cultures')}
              style={menuButtonStyle(page === 'cultures')}
            >
              🌾 {t('crops')}
            </button>
            <button
              onClick={() => setPage('conseils')}
              style={menuButtonStyle(page === 'conseils')}
            >
              🌿 {t('advice')}
            </button>
            <button
              onClick={() => { setUser(null); setAuthPage('login'); }}
              style={{ ...menuButtonStyle(false), backgroundColor: '#e74c3c' }}
            >
              🚪 {t('logout')}
            </button>
          </div>
        ) : (
          <div style={menuItems}>
            <button
              onClick={() => setAuthPage('login')}
              style={menuButtonStyle(authPage === 'login')}
            >
              🔐 {t('login')}
            </button>
            <button
              onClick={() => setAuthPage('signup')}
              style={menuButtonStyle(authPage === 'signup')}
            >
              ✍️ {t('signup')}
            </button>
          </div>
        )}
      </nav>

      <main style={mainStyle}>
        {page === 'home' ? (
          <>
            <h1 style={mainTitleStyle}>
              <span style={{ color: '#27ae60' }}>{t('dashboard')}</span>
            </h1>
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Agriculture"
              style={dashboardImageStyle}
            />
          </>
        ) : (
          <h1 style={mainTitleStyle}>
            <span style={{ color: '#27ae60' }}>Agri</span>
            <span style={{ color: '#f39c12' }}>Smart</span>
          </h1>
        )}

        {renderContent()}
      </main>
    </div>
  );
}

// Nouveaux styles
const languageSelector = {
  padding: '10px 0',
  margin: '15px 0',
  borderTop: '1px solid rgba(255,255,255,0.1)',
  borderBottom: '1px solid rgba(255,255,255,0.1)'
};

const selectStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '5px',
  backgroundColor: '#0a2a0a',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.2)'
};

// (Conserver tous les autres styles de la version précédente)
const appContainer = {
  display: 'flex',
  height: '100vh',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const navStyle = {
  width: 250,
  backgroundColor: '#123c12',
  color: 'white',
  padding: '20px 15px',
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
};

const logoContainer = {
  paddingBottom: 20,
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  marginBottom: 20
};

const logoStyle = {
  color: 'white',
  margin: '0 0 5px 0',
  fontSize: 24
};

const sloganStyle = {
  fontSize: 12,
  opacity: 0.8,
  margin: 0
};

const menuItems = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10
};

const menuButtonStyle = (active) => ({
  backgroundColor: active ? '#27ae60' : 'transparent',
  color: 'white',
  border: 'none',
  padding: '12px 15px',
  textAlign: 'left',
  cursor: 'pointer',
  borderRadius: 8,
  fontSize: 16,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: active ? '#27ae60' : 'rgba(255,255,255,0.1)'
  }
});

const mainStyle = {
  flexGrow: 1,
  padding: 30,
  backgroundColor: '#f8f9fa',
  overflowY: 'auto',
};

const mainTitleStyle = {
  marginBottom: 20,
  fontWeight: 'bold',
  fontSize: '2rem',
  color: '#2c3e50'
};

const dashboardImageStyle = {
  width: '100%',
  maxHeight: 200,
  objectFit: 'cover',
  borderRadius: 10,
  marginBottom: 25,
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

const headerStyle = {
  marginBottom: 25,
  paddingBottom: 15,
  borderBottom: '1px solid #eee'
};

const dateStyle = {
  color: '#7f8c8d',
  margin: '5px 0 0 0',
  fontSize: 14
};

const cardsContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 20,
  marginBottom: 30
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
};

const cardTitleStyle = {
  marginTop: 0,
  marginBottom: 15,
  color: '#2c3e50',
  display: 'flex',
  alignItems: 'center',
  gap: 8
};

const listStyle = {
  paddingLeft: 20,
  margin: 0
};

const adviceStyle = {
  fontStyle: 'italic',
  lineHeight: 1.6
};

const actionButtonStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderRadius: 5,
  cursor: 'pointer',
  marginTop: 15,
  fontSize: 14,
  transition: 'background-color 0.3s',
  ':hover': {
    backgroundColor: '#2980b9'
  }
};

const quickAccessStyle = {
  marginTop: 30
};

const sectionTitleStyle = {
  margin: '0 0 15px 0',
  color: '#2c3e50'
};

const quickAccessButtons = {
  display: 'flex',
  gap: 15,
  flexWrap: 'wrap'
};

const quickButtonStyle = {
  backgroundColor: '#ecf0f1',
  border: 'none',
  padding: '12px 20px',
  borderRadius: 8,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  transition: 'all 0.3s',
  ':hover': {
    backgroundColor: '#bdc3c7'
  }
};

export default App;