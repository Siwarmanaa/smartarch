import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traductions
const resources = {
  fr: {
    translation: {
      weather: {
        current_in: 'Météo actuelle à',
        search_placeholder: 'Rechercher une ville...',
        use_my_location: 'Ma position',
        feels_like: 'Ressenti',
        humidity: 'Humidité',
        wind: 'Vent',
        pressure: 'Pression',
        forecast: 'Prévisions 5 jours',
        error: 'Erreur lors de la récupération des données',
        location_error: 'Impossible d\'obtenir votre position',
        location_unsupported: 'Géolocalisation non supportée'
      }
    }
  },
  en: {
    translation: {
      weather: {
        current_in: 'Current weather in',
        search_placeholder: 'Search for a city...',
        use_my_location: 'My location',
        feels_like: 'Feels like',
        humidity: 'Humidity',
        wind: 'Wind',
        pressure: 'Pressure',
        forecast: '5-day forecast',
        error: 'Error fetching weather data',
        location_error: 'Unable to get your location',
        location_unsupported: 'Geolocation not supported'
      }
    }
  },
  ar: {
    translation: {
      weather: {
        current_in: 'الطقس الحالي في',
        search_placeholder: 'ابحث عن مدينة...',
        use_my_location: 'موقعي',
        feels_like: 'يشعر مثل',
        humidity: 'الرطوبة',
        wind: 'الرياح',
        pressure: 'الضغط',
        forecast: 'تنبؤات 5 أيام',
        error: 'خطأ في جلب بيانات الطقس',
        location_error: 'غير قادر على الحصول على موقعك',
        location_unsupported: 'الموقع الجغرافي غير مدعوم'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;