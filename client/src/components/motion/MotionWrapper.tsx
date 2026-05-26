'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export default function MotionWrapper({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  direction = 'up',
  className = '',
}: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -4% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 1, y: 0, x: 0 };
    switch (direction) {
      case 'up':    return { opacity: 0, y: yOffset };
      case 'down':  return { opacity: 0, y: -yOffset };
      case 'left':  return { opacity: 0, x: yOffset };
      case 'right': return { opacity: 0, x: -yOffset };
      case 'none':  return { opacity: 0 };
      default:      return { opacity: 0, y: yOffset };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={shouldReduceMotion ? { opacity: 1, y: 0, x: 0 } : (isInView ? { opacity: 1, y: 0, x: 0 } : getInitial())}
      transition={shouldReduceMotion ? { duration: 0.05 } : {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
