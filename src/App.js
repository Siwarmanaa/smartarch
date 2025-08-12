import React, { useState, useEffect } from 'react';
import Meteo from './Meteo';
import Conseils from './Conseils';
import Cultures from './Cultures';
import Inscription from './Inscription';
import Connexion from './Connexion';

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
    register: "Inscription",
    logout: "Déconnexion",
    authPrompt: "Connecte-toi ou crée un compte pour continuer."
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
    register: "Register",
    logout: "Logout",
    authPrompt: "Log in or create an account to continue."
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
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
    authPrompt: "قم بتسجيل الدخول أو إنشاء حساب للمتابعة."
  }
};

const API_BASE = "http://localhost/agrismart-api";

function App() {
  const [page, setPage] = useState('home');
  const [language, setLanguage] = useState('fr');
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('connexion'); // 'connexion' | 'inscription'

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (_) {
        // ignore
      }
    }
  }, []);

  const t = (key) => translations[language][key] || key;

  const dateActuelle = new Date().toLocaleDateString(language, {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const handleLoginSuccess = (utilisateur) => {
    setUser(utilisateur);
    localStorage.setItem('user', JSON.stringify(utilisateur));
    setPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setPage('home');
  };

  // Données simulées pour le tableau de bord
  const dashboardData = {
    meteo: {
      temperature: 24,
      conditions: language === 'fr' ? "Ensoleillé" : language === 'en' ? "Sunny" : "مشمس",
      pluie: "10%"
    },
    alertes: language === 'fr'
      ? ["Risque de mildiou sur tomates", "Arrosage recommandé demain matin"]
      : language === 'en'
      ? ["Risk of blight on tomatoes", "Watering recommended tomorrow morning"]
      : ["خطر الإصابة باللفحة على الطماطم", "الري موصى به صباح الغد"],
    conseilDuJour:
      language === 'fr'
        ? "Pensez à aérer votre serre en journée pour éviter l'humidité excessive la nuit."
        : language === 'en'
        ? "Remember to ventilate your greenhouse during the day to avoid excessive humidity at night."
        : "تذكر تهوية الصوبة الزراعية خلال النهار لتجنب الرطوبة الزائدة ليلاً"
  };

  const renderContent = () => {
    switch (page) {
      case 'weather':
        return <Meteo language={language} />;
      case 'conseils':
        return <Conseils language={language} />;
      case 'cultures':
        return <Cultures language={language} />;
      case 'home':
      default:
        return (
          <div className="dashboard-content">
            <div style={headerStyle}>
              <h2>{t('welcome')} {user?.nom || user?.email || ''} 👩‍🌾</h2>
              <p style={dateStyle}>{dateActuelle}</p>
            </div>

            <div style={cardsContainer}>
              <div style={cardStyle}>
                <h3 style={cardTitleStyle}>🌤️ {t('currentWeather')}</h3>
                <p>{t('temperature')}: {dashboardData.meteo.temperature}°C</p>
                <p>{t('conditions')}: {dashboardData.meteo.conditions}</p>
                <p>{t('rain')}: {dashboardData.meteo.pluie}</p>
                <button onClick={() => setPage('weather')} style={actionButtonStyle}>
                  {t('seeDetails')}
                </button>
              </div>

              <div style={{ ...cardStyle, borderLeft: '4px solid #e74c3c' }}>
                <h3 style={cardTitleStyle}>⚠️ {t('alerts')}</h3>
                <ul style={listStyle}>
                  {dashboardData.alertes.map((alerte, index) => (
                    <li key={index}>{alerte}</li>
                  ))}
                </ul>
              </div>

              <div style={{ ...cardStyle, background: '#f8f9fa' }}>
                <h3 style={cardTitleStyle}>💡 {t('dailyTip')}</h3>
                <p style={adviceStyle}>"{dashboardData.conseilDuJour}"</p>
                <button onClick={() => setPage('conseils')} style={actionButtonStyle}>
                  {t('moreAdvice')}
                </button>
              </div>
            </div>

            <div style={quickAccessStyle}>
              <h3 style={sectionTitleStyle}>{t('quickAccess')}</h3>
              <div style={quickAccessButtons}>
                <button onClick={() => setPage('cultures')} style={quickButtonStyle}>
                  🌾 {t('myCrops')}
                </button>
                <button onClick={() => setPage('conseils')} style={quickButtonStyle}>
                  📚 {t('library')}
                </button>
                <button onClick={() => setPage('weather')} style={quickButtonStyle}>
                  📈 {t('statistics')}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderAuthPanel = () => (
    <div style={authPanelStyle}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => setAuthView('connexion')} style={quickButtonStyle}>
          {t('login')}
        </button>
        <button onClick={() => setAuthView('inscription')} style={quickButtonStyle}>
          {t('register')}
        </button>
      </div>
      {authView === 'connexion' ? (
        <Connexion apiBase={API_BASE} onLogin={handleLoginSuccess} />
      ) : (
        <Inscription apiBase={API_BASE} onSuccess={handleLoginSuccess} />
      )}
    </div>
  );

  return (
    <div style={appContainer}>
      <nav style={navStyle}>
        <div style={logoContainer}>
          <h1 style={logoStyle}>🌱 AgriSmart</h1>
          <p style={sloganStyle}>{t('partner')}</p>
        </div>

        <div style={languageSelector}>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={selectStyle}>
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        <div style={menuItems}>
          <button onClick={() => setPage('home')} style={menuButtonStyle(page === 'home')}>
            🏠 {t('dashboard')}
          </button>
          <button onClick={() => setPage('weather')} style={menuButtonStyle(page === 'weather')}>
            🌦️ {t('weather')}
          </button>
          <button onClick={() => setPage('cultures')} style={menuButtonStyle(page === 'cultures')}>
            🌾 {t('crops')}
          </button>
          <button onClick={() => setPage('conseils')} style={menuButtonStyle(page === 'conseils')}>
            🌿 {t('advice')}
          </button>
        </div>

        {user && (
          <div style={{ marginTop: 'auto' }}>
            <button onClick={handleLogout} style={menuButtonStyle(false)}>
              🚪 {t('logout')}
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

        {!user ? (
          <>
            <p style={{ color: '#7f8c8d', marginTop: 0 }}>{t('authPrompt')}</p>
            {renderAuthPanel()}
          </>
        ) : (
          renderContent()
        )}
      </main>
    </div>
  );
}

// Styles
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
  gap: 15
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
  overflowY: 'auto'
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

const authPanelStyle = {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  marginTop: 10
};

export default App;
