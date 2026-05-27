'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export default function TextReveal({ text, className = '', delay = 0, as = 'p' }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' });
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

  const Component = motion[as as keyof typeof motion] as any;
  const words = text.split(' ');

  if (shouldReduceMotion) {
    const RawComponent = as;
    return (
      <RawComponent ref={ref} className={className}>
        {text}
      </RawComponent>
    );
  }

  if (isMobile) {
    return (
      <Component
        ref={ref}
        initial={{ opacity: 0.6, y: 5 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 5 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay }}
        className={className}
        style={{ willChange: 'transform, opacity' }}
      >
        {text}
      </Component>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween' as const,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <Component
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
