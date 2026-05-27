'use client';

import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      // Use matchMedia for high-performance viewport/touch checking
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
      
      setIsMobile(isSmallScreen || isTouch);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    
    // Use modern addEventListener for MediaQueryList if available
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', checkMobile);
      return () => mediaQuery.removeEventListener('change', checkMobile);
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', checkMobile, { passive: true });
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, [breakpoint]);

  return isMobile;
}
