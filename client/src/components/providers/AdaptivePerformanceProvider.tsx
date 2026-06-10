'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AdaptivePerformanceContextType {
  isLowEndDevice: boolean;
  reduceMotion: boolean;
  lowMemoryMode: boolean;
}

const AdaptivePerformanceContext = createContext<AdaptivePerformanceContextType>({
  isLowEndDevice: false,
  reduceMotion: false,
  lowMemoryMode: false,
});

export function AdaptivePerformanceProvider({ children }: { children: React.ReactNode }) {
  const [performanceState, setPerformanceState] = useState<AdaptivePerformanceContextType>({
    isLowEndDevice: false,
    reduceMotion: false,
    lowMemoryMode: false,
  });

  useEffect(() => {
    // We only run this on the client
    const checkPerformance = () => {
      let isLowEnd = false;
      let lowMem = false;

      // Check logical processors (cores)
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      if (hardwareConcurrency < 4) {
        isLowEnd = true;
      }

      // Check device memory (GB) - only supported in Chromium-based browsers
      if ('deviceMemory' in navigator) {
        const memory = (navigator as unknown as { deviceMemory: number }).deviceMemory || 4;
        if (memory < 4) {
          isLowEnd = true;
          lowMem = true;
        }
      }

      // Check connection speed (optional, if we want to reduce preload assets)
      if ('connection' in navigator) {
        const conn = (navigator as unknown as { connection: { saveData: boolean, effectiveType: string } }).connection;
        if (conn && (conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || conn.effectiveType === '3g')) {
          isLowEnd = true;
        }
      }

      // Check user preference for reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setPerformanceState({
        isLowEndDevice: isLowEnd,
        reduceMotion: prefersReducedMotion || isLowEnd,
        lowMemoryMode: lowMem,
      });
    };

    checkPerformance();
  }, []);

  return (
    <AdaptivePerformanceContext.Provider value={performanceState}>
      {children}
    </AdaptivePerformanceContext.Provider>
  );
}

export function useAdaptivePerformance() {
  return useContext(AdaptivePerformanceContext);
}
