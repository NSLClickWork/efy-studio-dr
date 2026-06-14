'use client';

import Image from 'next/image';
import ScrollReveal from '@/app/components/ScrollReveal';
import { cafeMenu } from '@/app/data/content';
import styles from './cafe.module.css';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/data/translations';

export default function CafeClient() {
  const { lang } = useLanguage();
  const tr = t[lang].cafe;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/cafe-moodboard.jpg"
            alt="EFY Studio Café"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="kicker" style={{ color: 'var(--sand)' }}>{tr.kicker}</span>
          <h1>{tr.title}</h1>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introInner}>
          <ScrollReveal>
            <h2 className={styles.introTitle}>{tr.introTitle}</h2>
            <p className={styles.introText}>{tr.introText}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.menuSection}>
        <div className={styles.menuInner}>
          <ScrollReveal>
            <div className={styles.menuHeader}>
              <span className="kicker">{tr.menuKicker}</span>
              <h2>{tr.menuTitle}</h2>
            </div>
          </ScrollReveal>

          <div className={styles.menuGrid}>
            <ScrollReveal direction="fade" delay={0.2}>
              <ul className={styles.menuList}>
                {cafeMenu.map((item, i) => (
                  <li key={i} className={styles.menuItem}>
                    <div className={styles.menuItemHeader}>
                      <span className={styles.menuItemName}>{item.name}</span>
                      <span className={styles.menuItemPrice}>{item.price}</span>
                    </div>
                    <p className={styles.menuItemDesc}>{item.desc}</p>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
