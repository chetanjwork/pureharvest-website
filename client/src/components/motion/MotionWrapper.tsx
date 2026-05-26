'use client';

import { motion, useInView } from 'framer-motion';
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
  // Trigger earlier so animation is done BEFORE user sees it — prevents mid-scroll jank
  const isInView = useInView(ref, { once: true, margin: '0px 0px -4% 0px' });

  const getInitial = () => {
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
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : getInitial()}
      transition={{
        duration,
        delay,
        // tween is lighter than spring for scroll-triggered animations
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
