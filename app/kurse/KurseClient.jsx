'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/app/components/ScrollReveal';
import { classes, studioInfo } from '@/app/data/content';
import styles from './kurse.module.css';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/data/translations';

export default function KurseClient() {
  const { lang } = useLanguage();
  const tr = t[lang].kurse;

  return (
    <>
      <section className={styles.hero} data-navbar-theme="dark">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="kicker" style={{ color: 'var(--sand)' }}>{tr.kicker}</span>
          <h1>{tr.title}</h1>
          <p>{tr.sub}</p>
        </div>
      </section>

      <section className={styles.grid} data-navbar-theme="light">
        <div className={styles.gridInner}>
          {classes.map((cls, i) => (
            <ScrollReveal key={cls.slug} delay={i * 0.1}>
              <Link href={`/kurse/${cls.slug}`} className={styles.card} id={`kurse-card-${cls.slug}`}>
                <div className={styles.cardImage}>
                  <Image
                    src={cls.image}
                    alt={cls[lang].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h2>{cls[lang].title}</h2>
                  <p className={styles.cardSub}>{cls[lang].subtitle}</p>
                  <p>{cls[lang].shortDesc}</p>
                  <div className={styles.cardMeta}>
                    <span>{cls.duration}</span>
                    <span>·</span>
                    <span>{cls[lang].groupSize}</span>
                  </div>
                  <span className="link-arrow">{tr.learnMore}</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section section--sand" data-navbar-theme="light">
        <ScrollReveal>
          <h2 style={{ fontStyle: 'italic', marginBottom: 'var(--space-xs)' }}>{tr.cta.title}</h2>
          <p style={{ margin: '0 auto var(--space-md)', maxWidth: '400px' }}>{tr.cta.p}</p>
          <a href={studioInfo.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn--dark" id="kurse-booking-btn">
            {tr.cta.btn}
          </a>
        </ScrollReveal>
      </section>
    </>
  );
}
