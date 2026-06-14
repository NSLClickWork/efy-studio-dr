'use client';

import { useEffect } from 'react';
import { LanguageProvider } from '@/app/context/LanguageContext';

export default function Providers({ children }) {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return <LanguageProvider>{children}</LanguageProvider>;
}
