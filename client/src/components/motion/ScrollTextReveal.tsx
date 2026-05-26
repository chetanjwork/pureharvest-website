'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface ScrollTextRevealProps {
  text: string;
  className?: string;
}

/**
 * SCROLL TEXT REVEAL
 * Animates word opacity based on scroll position for a professional 'Apple' reveal effect.
 */
export default function ScrollTextReveal({ text, className = "" }: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const words = text.split(" ");

  if (isMobile) {
    return (
      <motion.p
        initial={{ opacity: 0.6, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {text}
      </motion.p>
    );
  }

  return (
    <div ref={containerRef} className={`relative flex flex-wrap gap-x-[0.3em] gap-y-0 ${className}`}>
      {words.map((word, i) => (
        <Word key={i} index={i} total={words.length} containerRef={containerRef}>
          {word}
        </Word>
      ))}
    </div>
  );
}

function Word({ children, index, total, containerRef }: { children: string, index: number, total: number, containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const start = index / total;
  const end = start + (1 / total);
  
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="relative inline-block">
      {children}
    </motion.span>
  );
}
