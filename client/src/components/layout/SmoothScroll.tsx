'use client';

import dynamic from 'next/dynamic';
import { ReactNode, useState, useEffect } from 'react';

// Dynamically import ReactLenis to prevent it from blocking the main thread on mobile
const ReactLenis = dynamic(() => import('lenis/react').then(mod => mod.ReactLenis), { ssr: false });

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent instant load on desktop until checked

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      // Disable if viewport is under 768px OR if the device has a coarse pointer (touch screen)
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.innerWidth < 768;
      
      setIsMobile(isSmallScreen || isTouch);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Return raw children without Lenis wrapper on mobile to ensure 100% native OS scrolling
  if (!mounted || isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.0,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
