'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/app/components/ScrollReveal';
import { classes, studioInfo } from '@/app/data/content';
import styles from './slug.module.css';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/data/translations';

export default function ClassDetailClient({ slug }) {
  const { lang } = useLanguage();
  const tr = t[lang].classDetail;

  const cls = classes.find((c) => c.slug === slug);
  const clsData = cls ? cls[lang] : null;
  const relatedClasses = cls ? classes.filter((c) => c.slug !== slug).slice(0, 3) : [];

  if (!cls || !clsData) return null;

  return (
    <>
      <section className={styles.hero} data-navbar-theme="dark">
        {cls.video ? (
          <video
            src={cls.video}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, zIndex: 0 }}
          />
        ) : (
          <Image
            src={cls.image}
            alt={clsData.title}
            fill
            priority
            quality={100}
            sizes="100vw"
            style={{ objectFit: 'cover', zIndex: 0 }}
          />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="kicker" style={{ color: 'var(--sand)' }}>{clsData.subtitle}</span>
          <h1>{clsData.title}</h1>
        </div>
      </section>

      <section className={styles.detail} data-navbar-theme="light">
        <div className={styles.detailInner}>
          <ScrollReveal>
            <div className={styles.detailMain}>
              <p className={styles.detailDesc}>{clsData.longDesc}</p>

              <div className={styles.detailMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>{tr.dauer}</span>
                  <span className={styles.metaValue}>{cls.duration}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>{tr.gruppe}</span>
                  <span className={styles.metaValue}>{clsData.groupSize}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>{tr.level}</span>
                  <span className={styles.metaValue}>{clsData.level}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className={styles.detailSidebar}>
              <h3>{tr.benefits}</h3>
              <ul className={styles.benefitsList}>
                {clsData.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <a
                href={studioInfo.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                style={{ width: '100%', marginTop: 'var(--space-sm)' }}
                id={`class-booking-${cls.slug}`}
              >
                {tr.buchen}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.related} data-navbar-theme="light">
        <div className={styles.relatedInner}>
          <h3>{tr.weitereKurse}</h3>
          <div className={styles.relatedGrid}>
            {relatedClasses.map((rc) => (
              <Link key={rc.slug} href={`/kurse/${rc.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedImage}>
                  <Image src={rc.image} alt={rc[lang].title} fill sizes="33vw" style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.relatedContent}>
                  <h4>{rc[lang].title}</h4>
                  <span className="link-arrow">{tr.entdecken}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
