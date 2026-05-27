'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode, useState, useEffect } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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
  if (isMobile) {
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
