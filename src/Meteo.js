import { useState, useEffect, useCallback } from 'react';

// Styles
const styles = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
    fontFamily: "'Segoe UI', sans-serif",
    color: '#333'
  },
  header: {
    marginBottom: 20
  },
  title: {
    margin: 0,
    fontSize: '1.8rem'
  },
  languageSelector: {
    marginBottom: 20,
    textAlign: 'right'
  },
  select: {
    padding: '8px 12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  searchContainer: {
    display: 'flex',
    gap: 10,
    marginTop: 15
  },
  searchInput: {
    flex: 1,
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: 25,
    fontSize: 16,
    outline: 'none'
  },
  locationButton: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 25,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 14
  },
  currentWeather: {
    background: 'linear-gradient(135deg, #72c2ff 0%, #0066cc 100%)',
    color: 'white',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
  },
  temperature: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: 10
  },
  feelsLike: {
    fontSize: '1rem',
    opacity: 0.9,
    display: 'block'
  },
  weatherDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  weatherIcon: {
    textAlign: 'center'
  },
  weatherStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  weatherStat: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 150
  },
  forecast: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
  },
  forecastTitle: {
    marginTop: 0,
    color: '#333'
  },
  forecastDays: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 15,
    overflowX: 'auto',
    gap: 10
  },
  forecastDay: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    minWidth: 80
  },
  loadingSpinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: 30,
    height: 30,
    animation: 'spin 1s linear infinite',
    margin: '20px auto'
  },
  errorMessage: {
    color: '#e74c3c',
    backgroundColor: '#fdecea',
    padding: '10px 15px',
    borderRadius: 5,
    margin: '10px 0'
  }
};

function Meteo({ language = 'fr' }) {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [ville, setVille] = useState('Paris');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const translations = {
    fr: {
      currentIn: "Météo actuelle à",
      searchPlaceholder: "Rechercher une ville...",
      useMyLocation: "Ma position",
      feelsLike: "Ressenti",
      humidity: "Humidité",
      wind: "Vent",
      pressure: "Pression",
      forecast: "Prévisions",
      error: "Erreur lors de la récupération des données météo",
      locationError: "Impossible d'obtenir votre position",
      locationUnsupported: "La géolocalisation n'est pas supportée par votre navigateur"
    },
    en: {
      currentIn: "Current weather in",
      searchPlaceholder: "Search for a city...",
      useMyLocation: "My location",
      feelsLike: "Feels like",
      humidity: "Humidity",
      wind: "Wind",
      pressure: "Pressure",
      forecast: "Forecast",
      error: "Error retrieving weather data",
      locationError: "Unable to get your location",
      locationUnsupported: "Geolocation is not supported by your browser"
    },
    ar: {
      currentIn: "الطقس الحالي في",
      searchPlaceholder: "ابحث عن مدينة...",
      useMyLocation: "موقعي",
      feelsLike: "الإحساس",
      humidity: "الرطوبة",
      wind: "الرياح",
      pressure: "الضغط",
      forecast: "التوقعات",
      error: "خطأ في استرجاع بيانات الطقس",
      locationError: "تعذر الحصول على موقعك",
      locationUnsupported: "تحديد الموقع الجغرافي غير مدعوم في متصفحك"
    }
  };

  const t = translations[language] || translations.fr;

  const API_KEY = '4354f3dc36d8a6d31da420e2bba8ef41';

  // Récupère les prévisions
  const fetchForecast = useCallback(async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${language}`
      );
      const result = await response.json();
      setForecast(result);
    } catch (err) {
      console.error("Erreur prévisions:", err);
    }
  }, []); // Retiré language des dépendances

  // Récupère la météo actuelle
  const fetchWeather = useCallback(async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    setData(null);
    setForecast(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${language}`
      );
      const result = await response.json();
      
      if (result.cod === 200) {
        setData(result);
        await fetchForecast(result.coord.lat, result.coord.lon);
      } else {
        throw new Error(result.message || t.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [t, fetchForecast]); // Retiré language des dépendances

  // Localisation automatique
  const handleLocation = useCallback(() => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric&lang=${language}`
            );
            const result = await response.json();
            
            if (result.cod === 200) {
              setData(result);
              setVille(result.name);
              await fetchForecast(result.coord.lat, result.coord.lon);
            } else {
              throw new Error(result.message || t.error);
            }
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError(t.locationError);
          setLoading(false);
        }
      );
    } else {
      setError(t.locationUnsupported);
    }
  }, [t, fetchForecast]); // Retiré language des dépendances

  // Déclenche la recherche initiale avec debounce - seulement au changement de ville
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchWeather(ville);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [ville]); // Retiré fetchWeather des dépendances pour éviter les boucles

  // Mise à jour de la langue sans recharger les données
  useEffect(() => {
    if (data && ville) {
      // Mettre à jour seulement la langue des données existantes
      const updateLanguage = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY}&units=metric&lang=${language}`
          );
          const result = await response.json();
          
          if (result.cod === 200) {
            setData(result);
            // Mettre à jour les prévisions aussi
            if (result.coord) {
              const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${result.coord.lat}&lon=${result.coord.lon}&appid=${API_KEY}&units=metric&lang=${language}`
              );
              const forecastResult = await forecastResponse.json();
              setForecast(forecastResult);
            }
          }
        } catch (err) {
          console.error("Erreur mise à jour langue:", err);
        }
      };
      
      updateLanguage();
    }
  }, [language, ville]); // Seulement quand la langue change ET qu'on a des données

  // Icônes météo
  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Snow: '❄️',
      Thunderstorm: '⛈️',
      Drizzle: '🌦️',
      Mist: '🌫️'
    };
    return icons[condition] || '🌤️';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {data?.weather?.[0]?.main ? getWeatherIcon(data.weather[0].main) : '🌤️'} {t.currentIn} {ville}
        </h2>
        
        <div style={styles.searchContainer}>
          <input
            type="text"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather(ville)}
            placeholder={t.searchPlaceholder}
            style={styles.searchInput}
          />
          
          <button onClick={handleLocation} style={styles.locationButton}>
            📍 {t.useMyLocation}
          </button>
        </div>
      </div>

      {loading && <div style={styles.loadingSpinner}></div>}
      {error && <div style={styles.errorMessage}>❌ {error}</div>}

      {data && (
        <div>
          <div style={styles.currentWeather}>
            <div style={styles.temperature}>
              {Math.round(data.main.temp)}°C
              <span style={styles.feelsLike}>
                {t.feelsLike} {Math.round(data.main.feels_like)}°C
              </span>
            </div>
            
            <div style={styles.weatherDetails}>
              <div style={styles.weatherIcon}>
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt={data.weather[0].description}
                  style={{ width: 80, height: 80 }}
                />
                <p>{data.weather[0].description}</p>
              </div>
              
              <div style={styles.weatherStats}>
                <div style={styles.weatherStat}>
                  <span>💧 {t.humidity}</span>
                  <span>{data.main.humidity}%</span>
                </div>
                <div style={styles.weatherStat}>
                  <span>🍃 {t.wind}</span>
                  <span>{data.wind.speed} m/s</span>
                </div>
                <div style={styles.weatherStat}>
                  <span>⏱️ {t.pressure}</span>
                  <span>{data.main.pressure} hPa</span>
                </div>
              </div>
            </div>
          </div>

          {forecast && (
            <div style={styles.forecast}>
              <h3 style={styles.forecastTitle}>{t.forecast}</h3>
              <div style={styles.forecastDays}>
                {forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((day, index) => (
                  <div key={index} style={styles.forecastDay}>
                    <p>{new Date(day.dt * 1000).toLocaleDateString(language, { weekday: 'short' })}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt={day.weather[0].description}
                      style={{ width: 40, height: 40 }}
                    />
                    <p>{Math.round(day.main.temp)}°C</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Meteo;