'use client';

import ScrollReveal from '@/app/components/ScrollReveal';
import { studioInfo } from '@/app/data/content';
import styles from './stundenplan.module.css';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/data/translations';

export default function StundenplanClient() {
  const { lang } = useLanguage();
  const tr = t[lang].stundenplan;

  return (
    <>
      <section className={styles.hero} data-navbar-theme="dark">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="kicker" style={{ color: 'var(--sand)' }}>{tr.kicker}</span>
          <h1>{tr.title}</h1>
          <p style={{ color: 'rgba(253, 251, 247, 0.6)' }}>{tr.sub}</p>
        </div>
      </section>

      <section className={styles.schedule} data-navbar-theme="light">
        <div className={styles.scheduleInner}>
          <ScrollReveal>
            <div className={styles.widgetFallback}>
              <h3>{tr.widgetTitle}</h3>
              <p>{tr.widgetText}</p>
              <a
                href={studioInfo.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                id="eversports-schedule-btn"
              >
                {tr.widgetBtn}
              </a>
            </div>

            <div className={styles.info}>
              <h4>{tr.infoTitle}</h4>
              <ul>
                {tr.infoItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
