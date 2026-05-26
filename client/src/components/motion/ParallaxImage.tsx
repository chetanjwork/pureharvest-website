'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image, { ImageProps } from 'next/image';

interface ParallaxImageProps extends Omit<ImageProps, 'src' | 'alt' | 'fill' | 'className'> {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  speed?: number; // Higher is faster (e.g. 10 means -10% to +10%)
}

export default function ParallaxImage({ 
  src, 
  alt, 
  className = '', 
  imageClassName = '',
  speed = 15,
  ...props 
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate the movement. If speed is 15, it moves from -15% to +15%
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        className="absolute left-0 right-0"
        style={{
            top: `-${speed}%`,
            bottom: `-${speed}%`,
            y
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${imageClassName}`}
          {...props}
        />
      </motion.div>
    </div>
  );
}
