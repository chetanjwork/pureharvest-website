'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * PUREHARVEST CINEMATIC PRELOADER
 * Optimized for 60fps performance and high-authority brand reveal.
 */
export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const words = "PUREHARVEST".split("");

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setLoading(false);
      // Restore scroll after reveal
      setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 1000);
    }, 2400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader-curtain"
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { 
              duration: 1.1, 
              ease: [0.76, 0, 0.24, 1], // Custom Apple-style Quint Ease
              delay: 0.3 
            } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white will-change-transform"
        >
          {/* Main Logo Text Architecture */}
          <div className="flex flex-col items-center gap-14">
            <div className="flex overflow-hidden px-4">
              {words.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: { 
                      duration: 0.8, 
                      delay: i * 0.04, 
                      ease: [0.16, 1, 0.3, 1] 
                    }
                  }}
                  exit={{ 
                    y: '200%', // Optimized Drop
                    opacity: 0,
                    filter: 'blur(12px)',
                    transition: { 
                      duration: 0.7, 
                      delay: i * 0.02, 
                      ease: [0.33, 0, 0.67, 0] // Accelerating drop
                    }
                  }}
                  className="text-4xl md:text-7xl font-black tracking-tighter text-black uppercase will-change-transform"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            
            {/* Minimalist Authority Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-16 h-[1.5px] bg-black/10 rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.8em] font-black text-black/30">
                Institutional Standard
              </span>
            </motion.div>
          </div>

          {/* Optimized Depth Layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
