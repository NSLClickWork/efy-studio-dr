'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 1.05,
  threshold = 0.12,
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: true });
  const controls = useAnimation();
  const animated = useRef(false);

  useEffect(() => {
    if (!isInView || animated.current) return;
    animated.current = true;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const fromBelow = rect.top > window.innerHeight * 0.35;
    const xDistance = window.innerWidth > 768 ? 60 : 30;

    let from = {};
    if (direction === 'up')    from = { y: fromBelow ? 36 : -36 };
    else if (direction === 'down')  from = { y: fromBelow ? -36 : 36 };
    else if (direction === 'left')  from = { x: -xDistance };
    else if (direction === 'right') from = { x: xDistance };
    else if (direction === 'scale') from = { scale: 0.96 };

    controls.set({ opacity: 0, ...from });
    controls.start({
      opacity: 1, y: 0, x: 0, scale: 1,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    });
  }, [isInView, controls, direction, duration, delay]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
