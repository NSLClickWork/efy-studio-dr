'use client';

import { LanguageProvider } from '@/app/context/LanguageContext';

export default function Providers({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
