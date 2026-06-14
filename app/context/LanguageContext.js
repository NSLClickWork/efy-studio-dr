'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({ lang: 'de', toggleLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('de');

  useEffect(() => {
    const saved = localStorage.getItem('efy-lang');
    if (saved === 'en' || saved === 'de') setLang(saved);
  }, []);

  const toggleLang = () => {
    const next = lang === 'de' ? 'en' : 'de';
    setLang(next);
    localStorage.setItem('efy-lang', next);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
