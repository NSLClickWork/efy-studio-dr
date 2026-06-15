'use client';

import Image from 'next/image';
import ScrollReveal from '@/app/components/ScrollReveal';
import styles from './about.module.css';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/data/translations';

export default function AboutClient() {
  const { lang } = useLanguage();
  const tr = t[lang].about;

  return (
    <>
      <section className={styles.hero} data-navbar-theme="dark">
        <div className={styles.heroBg}>
          <Image
            src="/images/philosophy.png"
            alt="EFY Studio Pilates"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="kicker" style={{ color: 'var(--sand)' }}>{tr.kicker}</span>
          <h1>{tr.title}</h1>
        </div>
      </section>

      <section className={styles.story} data-navbar-theme="light">
        <div className={styles.storyInner}>
          <ScrollReveal>
            <div className={styles.storyHeader}>
              <span className="kicker">{tr.visionKicker}</span>
              <h2>{tr.visionTitle}</h2>
            </div>
          </ScrollReveal>
          <div className={styles.storyGrid}>
            <ScrollReveal direction="left">
              <p>{tr.p1}</p>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <p>{tr.p2}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className={styles.team} data-navbar-theme="light">
        <div className={styles.teamInner}>
          <ScrollReveal>
            <div className={styles.teamHeader}>
              <span className="kicker">{tr.teamKicker}</span>
              <h2>{tr.teamTitle}</h2>
              <p className={styles.teamSub}>{tr.teamSub}</p>
            </div>
          </ScrollReveal>

          <div className={styles.teamGrid}>
            {[1, 2, 3].map((i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={styles.teamCard}>
                  <div className={styles.teamImage}>
                    <div className={styles.teamPlaceholder}>
                      <span>{tr.imgPlaceholder}</span>
                    </div>
                  </div>
                  <div className={styles.teamInfo}>
                    <h3>{tr.trainerName}</h3>
                    <span className="kicker">{tr.trainerRole}</span>
                    <p>{tr.trainerBio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
