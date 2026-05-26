'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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
  const words = text.split(" ");

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
