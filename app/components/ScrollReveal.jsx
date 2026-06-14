'use client';

import { useEffect, useRef } from 'react';

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.12,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) el.style.transitionDelay = `${delay}s`;
          el.classList.add('reveal-visible');
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`reveal reveal-${direction} ${className}`}>
      {children}
    </div>
  );
}
