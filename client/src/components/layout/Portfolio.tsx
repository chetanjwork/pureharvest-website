'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';

interface BottleItem {
  id: string;
  title: string;
  client: string;
  caption: string;
  image: string;
}

const BRAND_MAPPING: Record<string, { title: string; client: string; caption: string }> = {
  'C_Bottle1.png': {
    title: 'Classic Series',
    client: 'Purohit Bhojnalaya',
    caption: 'Classic custom print designed for prestigious traditional dining hubs.'
  },
  'C_Bottle2.png': {
    title: 'Classic Series',
    client: 'Sai Metroland',
    caption: 'Bespoke custom label tailored for premier catering services and banquets.'
  },
  'C_Bottle3.png': {
    title: 'Classic Series',
    client: 'Copper Chimney',
    caption: 'Clean screen print layout engineered for elite corporate conference rooms.'
  },
  'C_Bottle4.png': {
    title: 'Classic Series',
    client: 'Anotti · Badlapur',
    caption: 'High-sentiment custom label built for local luxury bistros and cafés.'
  },
  'C_Bottle5.png': {
    title: 'Classic Series',
    client: 'Tandoor Indian Cuisine',
    caption: 'Sophisticated branding for premium fine-dining banquet suites.'
  },
  'C_Bottle6.png': {
    title: 'Classic Series',
    client: 'Delicious Shadu Corner',
    caption: 'Vibrant custom-branded PET label designed for elite local dining destinations.'
  },
  'S_Bottle1.png': {
    title: 'Signature Series',
    client: 'Siro · All Day Eatery',
    caption: 'Laser-etched Borosilicate Glass. Elegant custom design for distinguished lounges.'
  },
  'S_Bottle2.png': {
    title: 'Signature Series',
    client: 'Brews & Beans',
    caption: 'Sleek minimalist custom branding. Curated to elevate premium café tables.'
  },
  'S_Bottle3.png': {
    title: 'Signature Series',
    client: 'Error 101',
    caption: 'Bespoke custom printed glass bottle designed for high-sentiment bars and lounges.'
  },
  'S_Bottle4.png': {
    title: 'Signature Series',
    client: 'Martini - 56',
    caption: 'Sophisticated permanent screen print, perfect for modern fine-dining clubs.'
  },
  'S_Bottle5.png': {
    title: 'Signature Series',
    client: 'Sairaj · Green Village',
    caption: 'Premium custom-branded glass bottle, curated for luxury heritage resort suites.'
  },
  'S_Bottle6.png': {
    title: 'Signature Series',
    client: 'Guilgoz · Mahesh Fine Dine',
    caption: 'Elite custom packaging designed to complement royal coastal hospitality aesthetics.'
  }
};

const GLOW_COLORS: Record<string, string> = {
  'C_Bottle1.png': 'rgba(234, 179, 8, 0.07)',
  'C_Bottle2.png': 'rgba(13, 148, 136, 0.07)',
  'C_Bottle3.png': 'rgba(234, 88, 12, 0.07)',
  'C_Bottle4.png': 'rgba(139, 92, 246, 0.07)',
  'C_Bottle5.png': 'rgba(220, 38, 38, 0.07)',
  'C_Bottle6.png': 'rgba(249, 115, 22, 0.07)',
  'S_Bottle1.png': 'rgba(0, 102, 255, 0.07)',
  'S_Bottle2.png': 'rgba(6, 182, 212, 0.07)',
  'S_Bottle3.png': 'rgba(59, 130, 246, 0.07)',
  'S_Bottle4.png': 'rgba(16, 185, 129, 0.07)',
  'S_Bottle5.png': 'rgba(34, 197, 94, 0.07)',
  'S_Bottle6.png': 'rgba(29, 78, 216, 0.07)',
};

// Returns the visual "slot" for each bottle relative to active index
// slot 0 = center, slot -1 = left, slot 1 = right, else hidden
function getSlot(index: number, active: number, total: number): number {
  if (total === 0) return 99;
  const diff = ((index - active) % total + total) % total;
  if (diff === 0) return 0;
  if (diff === 1) return 1;
  if (diff === total - 1) return -1;
  return 99; // hidden
}

// Per-slot transform values
function slotStyle(slot: number): React.CSSProperties {
  if (slot === 0) {
    return {
      transform: 'translateX(0%) translateZ(0px) scale(1)',
      zIndex: 30,
      opacity: 1,
      filter: 'none',
    };
  }
  if (slot === -1) {
    return {
      transform: 'translateX(-54%) translateZ(-180px) scale(0.78)',
      zIndex: 10,
      opacity: 0.45,
      filter: 'brightness(0.85) contrast(0.95) blur(1px)',
    };
  }
  if (slot === 1) {
    return {
      transform: 'translateX(54%) translateZ(-180px) scale(0.78)',
      zIndex: 10,
      opacity: 0.45,
      filter: 'brightness(0.85) contrast(0.95) blur(1px)',
    };
  }
  // Hidden
  return {
    transform: 'translateX(0%) translateZ(-400px) scale(0.4)',
    zIndex: 0,
    opacity: 0,
    pointerEvents: 'none',
  };
}

export default function Portfolio() {
  const [bottles, setBottles] = useState<BottleItem[]>([]);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartX = useRef<number | null>(null);
  const total = bottles.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const next = useCallback(() => {
    if (total === 0) return;
    setTilt({ x: 0, y: 0 });
    setActive(a => (a + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    if (total === 0) return;
    setTilt({ x: 0, y: 0 });
    setActive(a => (a - 1 + total) % total);
  }, [total]);

  // Load all PNG bottles dynamically from client/public at runtime
  useEffect(() => {
    fetch('/api/bottles')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.bottles) {
          const mapped = data.bottles.map((file: string, idx: number) => {
            const isClassic = file.startsWith('C_');
            const pngKey = file.replace(/\.webp$/i, '.png');
            const defaultMap = BRAND_MAPPING[pngKey] || BRAND_MAPPING[file] || {
              title: isClassic ? 'Classic Series' : 'Signature Series',
              client: file.replace(/\.(png|webp)$/i, '').replace('_', ' ').replace('C ', 'Bottle ').replace('S ', 'Bottle '),
              caption: 'Premium custom-branded packaged drinking water curated for distinguished hospitality and corporate venues.'
            };
            return {
              id: String(idx + 1),
              title: defaultMap.title,
              client: defaultMap.client,
              caption: defaultMap.caption,
              image: `/${file}`
            };
          });
          setBottles(mapped);
        }
      })
      .catch((err) => console.error('Failed to fetch dynamic bottles:', err));
  }, []);

  // Auto-advance every 4s
  const resetAuto = useCallback(() => {
    if (total === 0) return;
    if (autoRef.current) clearTimeout(autoRef.current);
    autoRef.current = setTimeout(next, 4000);
  }, [next, total]);

  useEffect(() => {
    setMounted(true);
    resetAuto();
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  }, [resetAuto]);

  useEffect(() => { resetAuto(); }, [active, resetAuto]);

  const handleNav = (dir: 'prev' | 'next') => {
    dir === 'next' ? next() : prev();
  };

  // Drag / swipe handlers
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    dragStartX.current = null;
  };

  // Pointer-tracking tilt handler (desktop only)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  if (!mounted) return null;

  if (bottles.length === 0) {
    return (
      <Section className="bg-brand-primary text-brand-accent py-24 overflow-hidden relative" id="portfolio">
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 rounded-full border-2 border-brand-secondary border-t-transparent animate-spin mb-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-accent/30">Loading Custom Renders...</span>
          </div>
        </Container>
      </Section>
    );
  }

  const bottle = bottles[active];
  const activeBottleFile = bottle?.image.split('/').pop() || '';
  const glowKey = activeBottleFile.replace(/\.webp$/i, '.png');
  const activeGlowColor = GLOW_COLORS[glowKey] || GLOW_COLORS[activeBottleFile] || 'rgba(0, 102, 255, 0.07)';

  return (
    <Section className="bg-brand-primary text-brand-accent pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden relative" id="portfolio">
      {/* Luxury Subtle Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 40%, rgba(11,33,71,0.12) 0%, transparent 70%), 
                            linear-gradient(to right, rgba(11,33,71,0.15) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(11,33,71,0.15) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 50px 50px, 50px 50px',
          maskImage: 'radial-gradient(circle at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 30%, transparent 75%)',
          zIndex: 0,
        }}
      />

      {/* Dynamic Ambient Aura Glow (Shines through transparent glass bottles) */}
      <div
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-1000 ease-out"
        style={{
          width: 'min(480px, 90vw)',
          height: 'min(480px, 90vw)',
          background: `radial-gradient(circle, ${activeGlowColor.replace('0.07', '0.15')} 0%, transparent 70%)`,
          filter: 'blur(35px)',
          zIndex: 0,
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 sm:gap-8">
          <div className="text-center md:text-left">
            <span className="text-brand-accent/40 font-black tracking-[0.3em] uppercase text-[10px] mb-3 block">
              Selected Works
            </span>
            <Heading
              level={2}
              className="text-3xl sm:text-5xl lg:text-6xl tracking-tighter !font-black uppercase leading-[0.9]"
            >
              Crafted for the <br className="hidden md:block" />Distinguished
            </Heading>
          </div>
          <p className="text-brand-accent/60 max-w-sm font-medium text-sm sm:text-[15px] leading-relaxed text-center md:text-left mx-auto md:mx-0">
            Discover our latest collaborations with global enterprises and luxury hospitality chains.
          </p>
        </div>

        {/* 3D Coverflow Stage (Dynamic Height for Single Page Viewports on Mobile) */}
        <div
          className="relative mx-auto select-none h-[380px] sm:h-[480px] lg:h-[550px] w-full"
          style={{ maxWidth: 1000, perspective: '1200px' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {bottles.map((item, i) => {
            const slot = getSlot(i, active, total);
            const style = slotStyle(slot);
            const isActive = slot === 0;

            const isTransitioning = tilt.x === 0 && tilt.y === 0;
            const activeTransform = isActive
              ? `translateX(0%) translateZ(40px) scale(1.05) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
              : style.transform;
            const activeTransition = isActive
              ? (isTransitioning
                ? 'transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.65s ease, filter 0.65s ease'
                : 'transform 0.1s ease-out, opacity 0.65s ease, filter 0.65s ease')
              : 'transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.65s ease, filter 0.65s ease';

            return (
              <div
                key={item.id}
                onClick={() => !isActive && (slot === -1 ? prev() : slot === 1 ? next() : null)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  width: '38%',
                  height: '100%',
                  marginLeft: '-19%',
                  transformStyle: 'preserve-3d',
                  transition: activeTransition,
                  cursor: isActive ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...style,
                  filter: isMobile ? 'none' : style.filter,
                  transform: activeTransform,
                  willChange: 'transform, opacity, filter',
                }}
              >
                {/* Bottle Relative Wrapper to guarantee pixel-perfect shadow anchoring at the very bottom */}
                <div className="relative flex items-center justify-center h-[95%] max-h-[480px] aspect-[2/3]">
                  {/* Bottle Image using highly optimized Next.js component */}
                  <Image
                    src={item.image}
                    alt={item.client}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    draggable={false}
                    className="object-contain select-none z-10"
                    style={{
                      // Contoured drop shadow on the glass/PET itself that shifts with mouse movement
                      filter: isActive
                        ? (isMobile
                          ? 'none'
                          : `drop-shadow(${tilt.x * -0.8}px ${12 + tilt.y * 0.8}px ${18 + Math.abs(tilt.x) * 0.5}px rgba(11,33,71,0.12)) 
                              drop-shadow(${tilt.x * -0.3}px ${4 + tilt.y * 0.3}px 6px rgba(11,33,71,0.06))`)
                        : 'none',
                      transition: isTransitioning ? 'filter 0.5s ease' : 'none',
                    }}
                  />

                  {/* 1. Sharp dark contact shadow at the very bottom base */}
                  <div
                    className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 rounded-full bg-black/40 pointer-events-none z-0"
                    style={{
                      width: isActive ? '45%' : '35%',
                      height: isActive ? '3.5px' : '2.5px',
                      filter: 'blur(1.5px)',
                      opacity: isActive ? 0.8 : 0.25,
                      transform: `scaleX(1.15) translateX(${tilt.x * -0.4}px) translateY(${tilt.y * 0.15}px)`,
                      transition: isTransitioning ? 'all 0.5s ease' : 'opacity 0.5s ease',
                    }}
                  />

                  {/* 2. Wider soft ambient shadow */}
                  <div
                    className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 rounded-full bg-black/10 pointer-events-none z-0"
                    style={{
                      width: isActive ? '68%' : '50%',
                      height: isActive ? '9px' : '6px',
                      filter: 'blur(4px)',
                      opacity: isActive ? 0.45 : 0.15,
                      transform: `scaleX(1.15) translateX(${tilt.x * -0.6}px) translateY(${tilt.y * 0.2}px)`,
                      transition: isTransitioning ? 'all 0.5s ease' : 'opacity 0.5s ease',
                    }}
                  />

                  {/* 3. Glass refraction caustic colored glow (Simulates light refraction on the floor) */}
                  <div
                    className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 rounded-full pointer-events-none z-0"
                    style={{
                      width: isActive ? '35%' : '24%',
                      height: isActive ? '5px' : '3px',
                      background: `radial-gradient(circle, ${activeGlowColor.replace('0.07', '0.75')} 0%, transparent 70%)`,
                      filter: 'blur(2.2px)',
                      opacity: isActive ? 0.85 : 0,
                      transform: `scaleX(1.15) translateX(${tilt.x * -0.5}px) translateY(${tilt.y * 0.15}px)`,
                      transition: isTransitioning ? 'all 0.5s ease' : 'opacity 0.5s ease',
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* Left Arrow (Sleek Glassmorphic Inset Control) */}
          <button
            onClick={() => handleNav('prev')}
            className="absolute left-2 sm:left-[-2rem] md:left-[-3rem] top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 md:bg-white/60 hover:bg-white/95 hover:scale-110 active:scale-95 md:backdrop-blur-md border border-white/80 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group cursor-pointer"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-0.5 transition-transform duration-300">
              <path d="M15 19l-7-7 7-7" stroke="#0B2147" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Right Arrow (Sleek Glassmorphic Inset Control) */}
          <button
            onClick={() => handleNav('next')}
            className="absolute right-2 sm:right-[-2rem] md:right-[-3rem] top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 md:bg-white/60 hover:bg-white/95 hover:scale-110 active:scale-95 md:backdrop-blur-md border border-white/80 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group cursor-pointer"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-300">
              <path d="M9 5l7 7-7 7" stroke="#0B2147" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Active Bottle Caption (Tightened spacing and responsive padding) */}
        <div className="mt-8 sm:mt-12 text-center" style={{ minHeight: 90 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={bottle.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-brand-accent mb-1.5">
                {bottle.title}
              </h2>
              <p className="text-brand-secondary font-black uppercase tracking-[0.25em] text-[10px] mb-3">
                {bottle.client}
              </p>
              <p className="text-brand-accent/50 text-xs sm:text-sm font-medium max-w-md mx-auto leading-relaxed px-4">
                {bottle.caption}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Navigation */}
        <div className="flex items-center justify-center mt-6 sm:mt-8">
          {bottles.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to bottle ${i + 1}`}
              className="w-11 h-11 flex items-center justify-center group cursor-pointer focus:outline-none -mx-1"
            >
              <div 
                className="transition-all duration-500 rounded-full"
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  background: i === active ? '#0066FF' : '#0B2147',
                  opacity: i === active ? 1 : 0.15,
                }}
              />
            </button>
          ))}
        </div>
      </Container>
    </Section>
  );
}

