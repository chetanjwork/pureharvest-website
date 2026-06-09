'use client';

import { useState, useEffect, useRef } from 'react';

interface InViewLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export default function InViewLoader({ 
  children, 
  fallback = null, 
  threshold = 0, 
  rootMargin = '100px' 
}: InViewLoaderProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Once it's in view, we can disconnect the observer so it stays loaded
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref}>
      {inView ? children : fallback}
    </div>
  );
}
