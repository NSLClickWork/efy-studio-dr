'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { navigation, studioInfo } from '@/app/data/content';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/data/translations';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const tr = t[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navClass = `${styles.navbar} ${scrolled || menuOpen ? styles['navbar--solid'] : styles['navbar--transparent']}`;

  return (
    <>
      <nav className={navClass} id="main-nav">
        <div className={styles.navbarInner}>
          <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo.svg"
              alt="EFY Studio Logo"
              width={44}
              height={44}
              className={styles.logoSvg}
              priority
            />
            <span className={styles.logoText}>EFY Studio</span>
          </Link>

          <div className={styles.navLinks}>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {tr[item.key]}
              </Link>
            ))}
            <a
              href={studioInfo.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navCta}
              id="nav-booking-btn"
            >
              {tr.buchen}
            </a>
            <div className={styles.langToggle}>
              <button
                className={`${styles.langBtn} ${lang === 'de' ? styles['langBtn--active'] : ''}`}
                onClick={() => lang !== 'de' && toggleLang()}
                aria-label="Deutsch"
              >
                DE
              </button>
              <span className={styles.langSep}>|</span>
              <button
                className={`${styles.langBtn} ${lang === 'en' ? styles['langBtn--active'] : ''}`}
                onClick={() => lang !== 'en' && toggleLang()}
                aria-label="English"
              >
                EN
              </button>
            </div>
          </div>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles['hamburger--open'] : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={tr.menuOpen}
            id="hamburger-btn"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles['mobileMenu--open'] : ''}`}>
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {tr[item.key]}
          </Link>
        ))}
        <a
          href={studioInfo.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileCta}
          onClick={() => setMenuOpen(false)}
        >
          {tr.buchen}
        </a>
        <div className={styles.mobileLangToggle}>
          <button
            className={`${styles.langBtn} ${styles['langBtn--mobile']} ${lang === 'de' ? styles['langBtn--active'] : ''}`}
            onClick={() => lang !== 'de' && toggleLang()}
            aria-label="Deutsch"
          >
            DE
          </button>
          <span className={styles.langSep}>|</span>
          <button
            className={`${styles.langBtn} ${styles['langBtn--mobile']} ${lang === 'en' ? styles['langBtn--active'] : ''}`}
            onClick={() => lang !== 'en' && toggleLang()}
            aria-label="English"
          >
            EN
          </button>
        </div>
      </div>
    </>
  );
}
