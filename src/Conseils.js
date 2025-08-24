import React, { useState, useEffect } from 'react';

const Conseils = ({ language = 'fr' }) => {
  const [selectedCrop, setSelectedCrop] = useState('tomate');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const translations = {
    fr: {
      title: "Conseils",
      loading: "Chargement",
      selectCrop: "Sélectionnez une culture",
      recommendationsFor: "Recommandations pour",
      tipOfDay: "Conseil du jour",
      hotDayTip: "Par temps chaud, arrosez tôt le matin ou tard le soir pour éviter l'évaporation.",
      normalDayTip: "C'est un bon moment pour planter et entretenir vos cultures.",
      waterEarly: "Arrosez tôt le matin pour une meilleure absorption",
      useCompost: "Utilisez du compost naturel pour enrichir le sol",
      avoidPesticides: "Évitez les pesticides chimiques, privilégiez les solutions naturelles",
      crops: {
        tomate: "Tomate",
        ble: "Blé",
        olive: "Olive"
      },
      weather: {
        sunny: "Ensoleillé",
        cloudy: "Nuageux",
        rainy: "Pluvieux"
      },
      tomato: {
        highTemp: "Température élevée détectée - ombrez vos tomates",
        normalTemp: "Température idéale pour la croissance des tomates",
        rainExpected: "Pluie attendue - protégez vos tomates de l'humidité",
        noRain: "Pas de pluie prévue - arrosage manuel recommandé"
      },
      wheat: {
        highHumidity: "Humidité élevée - surveillez les maladies fongiques",
        normalHumidity: "Conditions optimales pour le blé",
        generalTip: "Le blé nécessite un sol bien drainé"
      },
      olive: {
        hotWeather: "Temps chaud - les oliviers sont résistants à la sécheresse",
        normalWeather: "Conditions normales pour les oliviers",
        pruningTip: "Taillez les oliviers en hiver pour favoriser la production"
      }
    },
    en: {
      title: "Advice",
      loading: "Loading",
      selectCrop: "Select a crop",
      recommendationsFor: "Recommendations for",
      tipOfDay: "Tip of the day",
      hotDayTip: "In hot weather, water early morning or late evening to avoid evaporation.",
      normalDayTip: "This is a good time to plant and maintain your crops.",
      waterEarly: "Water early morning for better absorption",
      useCompost: "Use natural compost to enrich the soil",
      avoidPesticides: "Avoid chemical pesticides, prefer natural solutions",
      crops: {
        tomate: "Tomato",
        ble: "Wheat",
        olive: "Olive"
      },
      weather: {
        sunny: "Sunny",
        cloudy: "Cloudy",
        rainy: "Rainy"
      },
      tomato: {
        highTemp: "High temperature detected - shade your tomatoes",
        normalTemp: "Ideal temperature for tomato growth",
        rainExpected: "Rain expected - protect your tomatoes from humidity",
        noRain: "No rain expected - manual watering recommended"
      },
      wheat: {
        highHumidity: "High humidity - monitor for fungal diseases",
        normalHumidity: "Optimal conditions for wheat",
        generalTip: "Wheat requires well-drained soil"
      },
      olive: {
        hotWeather: "Hot weather - olive trees are drought resistant",
        normalWeather: "Normal conditions for olive trees",
        pruningTip: "Prune olive trees in winter to promote production"
      }
    },
    ar: {
      title: "نصائح",
      loading: "جاري التحميل",
      selectCrop: "اختر محصول",
      recommendationsFor: "توصيات لـ",
      tipOfDay: "نصيحة اليوم",
      hotDayTip: "في الطقس الحار، اسقِ في الصباح الباكر أو المساء المتأخر لتجنب التبخر.",
      normalDayTip: "هذا وقت جيد لزراعة وصيانة محاصيلك.",
      waterEarly: "اسقِ في الصباح الباكر لامتصاص أفضل",
      useCompost: "استخدم السماد الطبيعي لإثراء التربة",
      avoidPesticides: "تجنب المبيدات الكيميائية، فضل الحلول الطبيعية",
      crops: {
        tomate: "طماطم",
        ble: "قمح",
        olive: "زيتون"
      },
      weather: {
        sunny: "مشمس",
        cloudy: "غائم",
        rainy: "ممطر"
      },
      tomato: {
        highTemp: "تم اكتشاف درجة حرارة عالية - ظلل طماطمك",
        normalTemp: "درجة حرارة مثالية لنمو الطماطم",
        rainExpected: "مطر متوقع - احمِ طماطمك من الرطوبة",
        noRain: "لا مطر متوقع - الري اليدوي موصى به"
      },
      wheat: {
        highHumidity: "رطوبة عالية - راقب الأمراض الفطرية",
        normalHumidity: "ظروف مثالية للقمح",
        generalTip: "القمح يتطلب تربة جيدة الصرف"
      },
      olive: {
        hotWeather: "طقس حار - أشجار الزيتون مقاومة للجفاف",
        normalWeather: "ظروف طبيعية لأشجار الزيتون",
        pruningTip: "اقطع أشجار الزيتون في الشتاء لتعزيز الإنتاج"
      }
    }
  };

  const t = translations[language] || translations.fr;

  // Simuler la récupération des données météo (en réalité, vous devriez les passer en props ou utiliser un contexte)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Simulation de données météo
        const mockWeather = {
          temperature: 24,
          conditions: 'sunny',
          rainProbability: 10,
          humidity: 65
        };
        setWeatherData(mockWeather);
      } catch (error) {
        console.error("Erreur de chargement des données météo", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Conseils basés sur la culture et la météo
  const getCropSpecificAdvice = () => {
    if (!weatherData) return [];
    
    const generalTips = [
      t.waterEarly,
      t.useCompost,
      t.avoidPesticides
    ];

    const cropTips = {
      tomate: [
        weatherData.temperature > 25 ? t.tomato.highTemp : t.tomato.normalTemp,
        weatherData.rainProbability > 30 ? t.tomato.rainExpected : t.tomato.noRain
      ],
      ble: [
        weatherData.humidity > 70 ? t.wheat.highHumidity : t.wheat.normalHumidity,
        t.wheat.generalTip
      ],
      olive: [
        weatherData.temperature > 30 ? t.olive.hotWeather : t.olive.normalWeather,
        t.olive.pruningTip
      ]
    };

    return [...generalTips, ...(cropTips[selectedCrop] || [])];
  };

  const adviceList = getCropSpecificAdvice();

  if (loading) {
    return <div style={styles.loading}>{t.loading}...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{t.title} 🌱</h2>
      
      <div style={styles.weatherBanner}>
        <div style={styles.weatherInfo}>
          <span>🌡️ {weatherData.temperature}°C</span>
          <span>☀️ {t.weather[weatherData.conditions]}</span>
          <span>💧 {weatherData.rainProbability}%</span>
        </div>
      </div>

      <div style={styles.cropSelector}>
        <label style={styles.label}>{t.selectCrop}:</label>
        <select 
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          style={styles.select}
        >
          <option value="tomate">{t.crops.tomate}</option>
          <option value="ble">{t.crops.ble}</option>
          <option value="olive">{t.crops.olive}</option>
        </select>
      </div>

      <div style={styles.adviceContainer}>
        <h3 style={styles.subtitle}>
          {t.recommendationsFor} {t.crops[selectedCrop]}
        </h3>
        
        <ul style={styles.adviceList}>
          {adviceList.map((advice, index) => (
            <li key={index} style={styles.adviceItem}>
              <span style={styles.bullet}>✦</span>
              <span style={styles.adviceText}>{advice}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.tipOfTheDay}>
        <h3 style={styles.tipTitle}>{t.tipOfDay}</h3>
        <p style={styles.tipContent}>
          {weatherData.temperature > 25 
            ? t.hotDayTip
            : t.normalDayTip}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  title: {
    color: '#2c7a3d',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2rem',
    fontWeight: '600'
  },
  weatherBanner: {
    backgroundColor: '#e3f2fd',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '25px',
    display: 'flex',
    justifyContent: 'center'
  },
  weatherInfo: {
    display: 'flex',
    gap: '20px',
    fontSize: '1.1rem'
  },
  cropSelector: {
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  label: {
    fontSize: '1.1rem',
    fontWeight: '500'
  },
  select: {
    padding: '8px 12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    minWidth: '150px'
  },
  adviceContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '25px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  subtitle: {
    color: '#2c7a3d',
    marginTop: '0',
    marginBottom: '15px',
    fontSize: '1.3rem'
  },
  adviceList: {
    listStyleType: 'none',
    paddingLeft: '0'
  },
  adviceItem: {
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px'
  },
  bullet: {
    color: '#4caf50',
    fontSize: '1.2rem'
  },
  adviceText: {
    fontSize: '1.1rem',
    lineHeight: '1.5'
  },
  tipOfTheDay: {
    backgroundColor: '#fff8e1',
    padding: '20px',
    borderRadius: '8px',
    borderLeft: '5px solid #ffc107'
  },
  tipTitle: {
    color: '#e65100',
    marginTop: '0',
    marginBottom: '10px'
  },
  tipContent: {
    fontSize: '1.1rem',
    lineHeight: '1.5',
    margin: '0'
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '1.2rem'
  }
};

export default Conseils;