'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ReactNode, useRef, useState, useEffect } from 'react';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

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
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
