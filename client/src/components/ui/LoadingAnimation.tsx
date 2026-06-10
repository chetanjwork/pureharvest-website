'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Triple-layered parallax waves for extreme realism
// Layer 1: Base (Deep Blue)
// Layer 2: Mid (Lighter, higher frequency)
// Layer 3: Shine (Surface highlight)
const waveSvg = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230088ff'/%3E%3Cstop offset='100%25' stop-color='%230047AB'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0,420 C200,550 200,300 400,420 C600,550 600,300 800,420 L800,800 L0,800 Z' fill='url(%23g)' opacity='0.3'/%3E%3Cpath d='M0,400 C200,300 200,500 400,400 C600,300 600,500 800,400 L800,800 L0,800 Z' fill='url(%23g)'/%3E%3Cpath d='M0,395 C200,340 200,460 400,395 C600,340 600,460 800,395 L800,405 L0,405 Z' fill='white' opacity='0.4'/%3E%3C/svg%3E`;

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);
  const [bubbles, setBubbles] = useState<{ id: number; x: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      delay: Math.random() * 3,
      size: 1.5 + Math.random() * 4,
    }));
    setTimeout(() => setBubbles(newBubbles), 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-999 bg-[#FFFFFF] flex items-center justify-center overflow-hidden"
        >
          <style dangerouslySetInnerHTML={{__html: `
            .water-fill-text {
              background-image: url("${waveSvg}");
              background-size: 250% 160%;
              background-repeat: repeat-x;
              -webkit-background-clip: text;
              color: transparent;
              animation: 
                parallaxX 2.5s linear infinite,
                verticalFill 3.5s cubic-bezier(0.7, 0, 0.3, 1) forwards;
              will-change: background-position;
            }
            
            @keyframes parallaxX {
              0% { background-position-x: 0%; }
              100% { background-position-x: 100%; }
            }
            
            @keyframes verticalFill {
              0% { background-position-y: -15%; }
              100% { background-position-y: 115%; }
            }
          `}} />

          <div className="relative flex flex-col items-center justify-center">
            
            <div className="relative">
              {/* LAYER 1: The Faded Outline */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className="text-[13vw] md:text-[9vw] font-black tracking-tighter uppercase text-transparent m-0 leading-none"
                  style={{ WebkitTextStroke: '1.5px rgba(0,0,0,0.03)' }}
                >
                  PUREHARVEST
                </div>
              </div>

              {/* LAYER 2: The Optimized Fluid Fill */}
              <div className="water-fill-text text-[13vw] md:text-[9vw] font-black tracking-tighter uppercase m-0 leading-none select-none z-10 relative">
                PUREHARVEST
                
                {/* Micro-Bubbles Overlay */}
                <div className="absolute inset-0 overflow-hidden opacity-40 mix-blend-overlay">
                  {bubbles.map((b) => (
                    <motion.div
                      key={b.id}
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ 
                        y: '-10%', 
                        opacity: [0, 1, 0],
                        x: [0, Math.sin(b.id) * 15, 0] 
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        delay: b.delay,
                        ease: "linear"
                      }}
                      className="absolute bg-white rounded-full blur-[0.5px]"
                      style={{ 
                        left: `${b.x}%`, 
                        width: b.size, 
                        height: b.size 
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Progress Indicator */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              transition={{ delay: 0.5, duration: 2.5, ease: "easeOut" }}
              className="mt-12 h-px bg-black/5 relative overflow-hidden hidden md:block"
            >
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-linear-to-r from-transparent via-brand-secondary/20 to-transparent"
              />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
