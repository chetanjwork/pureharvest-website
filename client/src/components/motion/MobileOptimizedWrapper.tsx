'use client';

import { ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

interface MobileOptimizedWrapperProps {
  children: ReactNode;
  /** Heavy components should be rendered inside this function so they can be skipped entirely on mobile */
  renderHeavyDesktopComponent: (props: any) => ReactNode;
}

/**
 * Example Component: Wraps heavy animated content.
 * On Desktop: Runs complex scroll physics and heavy parallax animations.
 * On Mobile: Strips away physics and relies purely on GPU-accelerated CSS `whileInView` fade-ins.
 */
export default function MobileOptimizedWrapper({ 
  children, 
  renderHeavyDesktopComponent 
}: MobileOptimizedWrapperProps) {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  
  // These springs will still be initialized by React, but because we don't bind them to 
  // elements on mobile, the browser doesn't have to composite the layout updates.
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const desktopY = useTransform(smoothProgress, [0, 1], ["0px", "300px"]);

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        // Force GPU hardware acceleration on mobile
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        className="w-full flex flex-col items-center justify-center"
      >
        {/* On mobile, we skip rendering the heavy math elements and just return a static/faded-in version */}
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ y: desktopY, willChange: "transform" }}
      className="hidden md:flex w-full items-center justify-center"
    >
      {/* On desktop, we run the complex physics/WebGL components */}
      {renderHeavyDesktopComponent({ scrollProgress: smoothProgress })}
    </motion.div>
  );
}
