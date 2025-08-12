import React from 'react';

function Cultures({ language }) {
  const titles = {
    fr: 'Mes cultures',
    en: 'My crops',
    ar: 'محاصيلي'
  };

  const examples = {
    fr: ['Tomates', 'Olives', 'Blé'],
    en: ['Tomatoes', 'Olives', 'Wheat'],
    ar: ['طماطم', 'زيتون', 'قمح']
  };

  const t = (key) => ({
    fr: { listTitle: 'Exemples' },
    en: { listTitle: 'Examples' },
    ar: { listTitle: 'أمثلة' }
  }[language || 'fr'][key] || key);

  const currentLang = language || 'fr';

  return (
    <div>
      <h2>🌾 {titles[currentLang]}</h2>
      <p>{t('listTitle')}:</p>
      <ul>
        {examples[currentLang].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Cultures;