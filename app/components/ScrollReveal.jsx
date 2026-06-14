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
  const isInView = useInView(ref, { amount: threshold, once: false });
  const controls = useAnimation();
  const prevInView = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isInView && !prevInView.current) {
      // Determine entry direction by checking where the element sits in the viewport.
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const fromBelow = rect.top > vh * 0.35;

      let from = {};
      if (direction === 'up')    from = { y: fromBelow ? 36 : -36 };
      else if (direction === 'down')  from = { y: fromBelow ? -36 : 36 };
      else if (direction === 'left')  from = { x: -30 };
      else if (direction === 'right') from = { x: 30 };
      else if (direction === 'fade')  from = { };
      else if (direction === 'scale') from = { scale: 0.96 };

      controls.set({ opacity: 0, ...from });
      controls.start({
        opacity: 1, y: 0, x: 0, scale: 1,
        transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
      });
    } else if (!isInView && prevInView.current) {
      const rect = el.getBoundingClientRect();
      const exitedAbove = rect.bottom < 0;

      let to = {};
      if (direction === 'up')    to = { y: exitedAbove ? -24 : 24 };
      else if (direction === 'down')  to = { y: exitedAbove ? 24 : -24 };

      controls.start({
        opacity: 0, ...to,
        transition: { duration: 0.38, ease: 'easeOut' },
      });
    }

    prevInView.current = isInView;
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
