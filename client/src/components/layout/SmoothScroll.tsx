'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    // lerp: 0.08 = snappy but smooth. duration: 1.0 = fast response.
    // wheelMultiplier: 1 = natural wheel speed, no over-amplification
    // touchMultiplier: 1.5 = mobile swipe feels natural
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
