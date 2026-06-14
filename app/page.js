'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import ScrollReveal from './components/ScrollReveal';
import { classes, testimonials, cafeMenu, studioInfo } from './data/content';
import { useLanguage } from './context/LanguageContext';
import { t } from './data/translations';

export default function HomePage() {
  const { lang } = useLanguage();
  const tr = t[lang].home;

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (activeTestimonial + 1) % testimonials.length;
        const width = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({ left: width * nextIndex, behavior: 'smooth' });
        setActiveTestimonial(nextIndex);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTestimonial]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
      setActiveTestimonial(index);
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
      setActiveTestimonial(index);
    }
  };

  const stripItems = [
    { label: 'Reformer', href: '/kurse/reformer' },
    { label: 'Barre', href: '/kurse/barre' },
    { label: 'Mat', href: '/kurse/mat' },
    { label: 'Pre & Postnatal', href: '/kurse/prenatal' },
    { label: 'Move & Grow', href: '/kurse/move-grow' },
    { label: 'Studio Café', href: '/cafe' },
    { label: 'Curtiusstraße 9', href: '/kontakt' },
  ];
  const marqueeItems = [...stripItems, ...stripItems, ...stripItems];

  const galleryImages = [
    { src: '/images/ball.png', alt: 'Pilates Ball Workout', pos: '80% center' },
    { src: '/images/mat.png', alt: 'Mat Pilates bei EFY Studio' },
    { src: '/images/prenatal.png', alt: 'Pre & Postnatal Pilates' },
    { src: '/images/barre.png', alt: 'Barre Training' },
    { src: '/images/reformer.png', alt: 'Reformer Pilates Übung' },
  ];

  return (
    <>
      {/* ═══════════ SECTION 1: HERO ═══════════ */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBg}>
          <video
            src="/videos/h264-2-web.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={styles.heroVideo}
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroKicker}>{tr.hero.kicker}</p>
          <h1 className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: tr.hero.title }} />
          <p className={styles.heroSub}>{tr.hero.sub}</p>
          <div className={styles.heroCtas}>
            <a
              href={studioInfo.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              id="hero-booking-btn"
            >
              {tr.hero.ctaBook}
            </a>
            <Link href="/kurse" className="btn btn--outline" id="hero-courses-btn">
              {tr.hero.ctaCourses}
            </Link>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>{tr.hero.scroll}</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M6 0v16M1 12l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ═══════════ SECTION 2: INTRO STRIP ═══════════ */}
      <div className={styles.introStrip} aria-hidden="true">
        <div className={styles.introStripTrack}>
          {marqueeItems.map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span className={styles.introStripDot} />
              <Link href={item.href} className={styles.introStripItem} tabIndex={-1}>{item.label}</Link>
            </span>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--warm-white)', position: 'relative', zIndex: 1, overflowX: 'hidden' }}>
        {/* ═══════════ SECTION 3: PHILOSOPHY ═══════════ */}
      <section className={styles.philosophy} id="philosophy">
        <div className={styles.philosophyInner}>
          <ScrollReveal direction="left">
            <div className={styles.philosophyContent}>
              <span className="kicker">{tr.philosophy.kicker}</span>
              <h2>{tr.philosophy.title}</h2>
              <p>{tr.philosophy.p1}</p>
              <p>{tr.philosophy.p2}</p>
              <Link href="/ueber-uns" className="link-arrow">{tr.philosophy.link}</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div className={styles.philosophyImage}>
              <Image
                src="/images/philosophy.png"
                alt="Zwei Frauen beim Mat Pilates im EFY Studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ SECTION 4: SERVICE CARDS ═══════════ */}
      <section className={styles.services} id="services">
        <div className={styles.servicesInner}>
          <ScrollReveal>
            <div className={styles.servicesHeader}>
              <span className="kicker">{tr.services.kicker}</span>
              <h2>{tr.services.title}</h2>
            </div>
          </ScrollReveal>
          <div className={styles.servicesGrid}>
            {classes.slice(0, 3).map((cls, i) => (
              <ScrollReveal key={cls.slug} delay={i * 0.15}>
                <Link href={`/kurse/${cls.slug}`} className={styles.serviceCard} id={`service-card-${cls.slug}`}>
                  <div className={styles.serviceCardImage}>
                    <Image
                      src={cls.image}
                      alt={cls[lang].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.serviceCardContent}>
                    <h3>{cls[lang].title}</h3>
                    <p>{cls[lang].shortDesc}</p>
                    <span className="link-arrow">{tr.services.more}</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 5: EDITORIAL REFORMER ═══════════ */}
      <section className={styles.editorial} id="editorial-reformer">
        <ScrollReveal direction="left" className={styles.editorialImage}>
          <Image
            src="/images/reformer.png"
            alt="Reformer Pilates im EFY Studio Berlin"
            fill
            quality={100}
            sizes="50vw"
            style={{ objectFit: 'cover' }}
          />
        </ScrollReveal>
        <div className={`${styles.editorialContent} ${styles['editorialContent--dark']}`}>
          <ScrollReveal direction="right">
            <span className="kicker">{tr.editorialReformer.kicker}</span>
            <h2>{tr.editorialReformer.title}</h2>
            <p>{tr.editorialReformer.p1}</p>
            <a
              href={studioInfo.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              id="reformer-booking-btn"
            >
              {tr.editorialReformer.btn}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ SECTION 6: BARRE ═══════════ */}
      <section className={`${styles.editorial} ${styles['editorial--reverse']}`} id="editorial-barre">
        <ScrollReveal direction="right" threshold={0.2} className={styles.editorialImage}>
          <video
            src="/videos/h264-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </ScrollReveal>
        <div className={`${styles.editorialContent} ${styles['editorialContent--cream']}`}>
          <ScrollReveal direction="left">
            <span className="kicker">{tr.editorialBarre.kicker}</span>
            <h2>{tr.editorialBarre.title}</h2>
            <p>{tr.editorialBarre.p1}</p>
            <Link href="/kurse/barre" className="btn btn--outline-dark" id="barre-link-btn">
              {tr.editorialBarre.btn}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ SECTION 7: CLASS TYPES ═══════════ */}
      <section className={styles.classTypes} id="class-types">
        <div className={styles.classTypesInner}>
          <ScrollReveal>
            <div className={styles.classTypesHeader}>
              <span className="kicker">{tr.classTypes.kicker}</span>
              <h2>{tr.classTypes.title}</h2>
            </div>
          </ScrollReveal>
          <div className={styles.classTypesGrid}>
            {tr.classTypes.items.map((ct, i) => (
              <ScrollReveal key={ct.title} delay={i * 0.1}>
                <div className={styles.classTypeCard}>
                  <div className={styles.classTypeIcon}>{ct.icon}</div>
                  <h4>{ct.title}</h4>
                  <p>{ct.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 8: PRENATAL ═══════════ */}
      <section className={styles.prenatal} id="prenatal">
        <ScrollReveal direction="left">
          <div className={styles.prenatalContent}>
            <span className="kicker">{tr.prenatal.kicker}</span>
            <h2>{tr.prenatal.title}</h2>
            <p>{tr.prenatal.p}</p>
            <Link href="/kurse/prenatal" className="btn btn--outline-dark" id="prenatal-link-btn">
              {tr.prenatal.btn}
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" className={styles.prenatalImage}>
          <Image
            src="/images/prenatal.png"
            alt="Schwangere Frau beim Pilates Training auf dem Reformer"
            fill
            quality={100}
            sizes="50vw"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        </ScrollReveal>
      </section>

      {/* ═══════════ SECTION 9: MOVE & GROW ═══════════ */}
      <section className={styles.moveGrow} id="move-grow">
        <div className={styles.moveGrowWatermark}>M&G</div>
        <div className={styles.moveGrowContent}>
          <ScrollReveal>
            <span className="kicker" style={{ color: 'var(--sand)' }}>{tr.moveGrow.kicker}</span>
            <h2>{tr.moveGrow.title}</h2>
            <p className={styles.moveGrowSub}>{tr.moveGrow.sub}</p>
            <p>{tr.moveGrow.p}</p>
            <Link href="/kurse/move-grow" className="btn btn--outline" id="movegrow-link-btn">
              {tr.moveGrow.btn}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ SECTION 10: COFFEE ═══════════ */}
      <section className={styles.coffee} id="studio-cafe">
        <ScrollReveal direction="left" className={styles.coffeeImage}>
          <Image
            src="/images/cafe-moodboard.jpg"
            alt="EFY Studio Café — Mediterranean Outdoor Space"
            width={800}
            height={1000}
            quality={100}
            sizes="50vw"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </ScrollReveal>
        <div className={styles.coffeeContent}>
          <ScrollReveal direction="right">
            <span className="kicker">{tr.coffee.kicker}</span>
            <h2>{tr.coffee.title}</h2>
            <p>{tr.coffee.p}</p>
            <div className={styles.coffeeMenu}>
              {cafeMenu.map((item) => (
                <div key={item.name} className={styles.coffeeMenuItem}>
                  {item.name}
                </div>
              ))}
            </div>
            <Link href="/cafe" className="link-arrow">{tr.coffee.link}</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ SECTION 11: GALLERY ═══════════ */}
      <section className={styles.gallery} id="gallery">
        <div className={styles.galleryInner}>
          <ScrollReveal>
            <div className={styles.galleryHeader}>
              <span className="kicker">{tr.gallery.kicker}</span>
              <h2>{tr.gallery.title}</h2>
            </div>
          </ScrollReveal>
          <div className={styles.galleryGrid}>
            {galleryImages.map((img, i) => (
              <div key={i} className={styles.galleryItem}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i === 0 ? '50vw' : '25vw'}
                  style={{ objectFit: 'cover', objectPosition: img.pos || 'center' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 12: TESTIMONIAL ═══════════ */}
      <section className={styles.testimonial} id="testimonials">
        <div className={styles.testimonialInner}>
          <ScrollReveal direction="fade">
            <div
              className={styles.testimonialSlider}
              ref={scrollRef}
              onScroll={handleScroll}
            >
              {testimonials.map((testi, i) => (
                <div className={styles.testimonialSlide} key={i}>
                  <p className={styles.testimonialQuote}>{testi.quote}</p>
                  <p className={styles.testimonialAuthor}>
                    — {testi.author}, {testi.location}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.testimonialDots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.testimonialDot} ${i === activeTestimonial ? styles.testimonialDotActive : ''}`}
                  onClick={() => scrollTo(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ SECTION 13: LOCATION ═══════════ */}
      <section className={styles.location} id="location">
        <div className={styles.locationInner}>
          <ScrollReveal direction="left">
            <div className={styles.locationContent}>
              <span className="kicker">{tr.location.kicker}</span>
              <h2>{tr.location.title}</h2>
              <div className={styles.locationAddress}>
                <p>
                  <strong>{studioInfo.address.street}</strong><br />
                  {studioInfo.address.zip} {studioInfo.address.city}<br />
                  {studioInfo.address.area}
                </p>
              </div>
              <div className={styles.locationHours}>
                <p>{studioInfo.openingHours.weekdays}</p>
                <p>{studioInfo.openingHours.saturday}</p>
                <p>{studioInfo.openingHours.sunday}</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div className={styles.locationMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.8!2d13.307!3d52.433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCurtiusstra%C3%9Fe+9%2C+12205+Berlin!5e0!3m2!1sde!2sde!4v1"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EFY Studio Standort"
              />
            </div>
          </ScrollReveal>
          </div>
        </section>
      </div>

      {/* ═══════════ SECTION 14: FINAL CTA ═══════════ */}
      <section className={styles.ctaBanner} id="final-cta">
        <div className={styles.ctaBannerInner}>
          <ScrollReveal>
            <h2>{tr.finalCta.title}</h2>
            <p>{tr.finalCta.p}</p>
            <a
              href={studioInfo.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--dark"
              id="final-booking-btn"
            >
              {tr.finalCta.btn}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
