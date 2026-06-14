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

      const isDesktop = window.innerWidth > 768;
      const blurFilter = isDesktop ? 'blur(3px)' : 'blur(0px)';
      const xDistance = isDesktop ? 60 : 30;

      let from = {};
      if (direction === 'up')    from = { y: fromBelow ? 36 : -36, filter: blurFilter };
      else if (direction === 'down')  from = { y: fromBelow ? -36 : 36, filter: blurFilter };
      else if (direction === 'left')  from = { x: -xDistance, filter: blurFilter };
      else if (direction === 'right') from = { x: xDistance, filter: blurFilter };
      else if (direction === 'fade')  from = { filter: blurFilter };
      else if (direction === 'scale') from = { scale: 0.96, filter: blurFilter };

      controls.set({ opacity: 0, ...from });
      controls.start({
        opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)',
        transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
      });
    } else if (!isInView && prevInView.current) {
      const isDesktop = window.innerWidth > 768;
      const blurFilter = isDesktop ? 'blur(3px)' : 'blur(0px)';
      const xDistance = isDesktop ? 60 : 30;
      const rect = el.getBoundingClientRect();
      const exitedAbove = rect.bottom < 0;

      let to = {};
      if (direction === 'up')    to = { y: exitedAbove ? -24 : 24 };
      else if (direction === 'down')  to = { y: exitedAbove ? 24 : -24 };
      else if (direction === 'left')  to = { x: exitedAbove ? -xDistance : xDistance };
      else if (direction === 'right') to = { x: exitedAbove ? xDistance : -xDistance };

      controls.start({
        opacity: 0, filter: blurFilter, ...to,
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
