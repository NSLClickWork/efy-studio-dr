'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { studioInfo } from '@/app/data/content';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/data/translations';

export default function Footer() {
  const { lang } = useLanguage();
  const tr = t[lang].footer;

  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.footerInner}>
        {/* Column 1 — Brand */}
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.footerLogo}>
            <Image
              src="/images/logo.svg"
              alt="EFY Studio Logo"
              width={40}
              height={40}
              className={styles.footerLogoImg}
            />
            <span className={styles.footerLogoText}>EFY Studio</span>
          </Link>
          <p className={styles.footerTagline}>
            {tr.tagline.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
          <div className={styles.footerSocial}>
            <a
              href={studioInfo.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerSocialLink}
              aria-label="Instagram"
              id="footer-instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2 — Studio */}
        <div>
          <h4 className={styles.footerTitle}>{tr.colStudio}</h4>
          <div className={styles.footerLinks}>
            <Link href="/ueber-uns" className={styles.footerLink}>{tr.ueberUns}</Link>
            <Link href="/stundenplan" className={styles.footerLink}>{tr.stundenplan}</Link>
            <Link href="/cafe" className={styles.footerLink}>{tr.studioCafe}</Link>
            <Link href="/kontakt" className={styles.footerLink}>{tr.kontakt}</Link>
          </div>
        </div>

        {/* Column 3 — Kurse/Classes */}
        <div>
          <h4 className={styles.footerTitle}>{tr.colKurse}</h4>
          <div className={styles.footerLinks}>
            <Link href="/kurse/reformer" className={styles.footerLink}>Reformer</Link>
            <Link href="/kurse/barre" className={styles.footerLink}>Barre</Link>
            <Link href="/kurse/mat" className={styles.footerLink}>Mat</Link>
            <Link href="/kurse/prenatal" className={styles.footerLink}>Pre & Postnatal</Link>
            <Link href="/kurse/move-grow" className={styles.footerLink}>Move & Grow</Link>
          </div>
        </div>

        {/* Column 4 — Mehr/More */}
        <div>
          <h4 className={styles.footerTitle}>{tr.colMehr}</h4>
          <div className={styles.footerLinks}>
            <Link href="/impressum" className={styles.footerLink}>{tr.impressum}</Link>
            <Link href="/datenschutz" className={styles.footerLink}>{tr.datenschutz}</Link>
            <a href={studioInfo.bookingUrl} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>{tr.onlineBuchen}</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.footerBottom}>
        <p className={styles.footerCopy}>
          © {new Date().getFullYear()} EFY Studio. {tr.rights}
        </p>
        <div className={styles.footerLegal}>
          <Link href="/impressum" className={styles.footerLegalLink}>{tr.impressum}</Link>
          <Link href="/datenschutz" className={styles.footerLegalLink}>{tr.datenschutz}</Link>
        </div>
      </div>
    </footer>
  );
}
