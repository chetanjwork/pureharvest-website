'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode, useState, useEffect } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
