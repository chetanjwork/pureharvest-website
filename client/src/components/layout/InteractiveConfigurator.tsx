'use client';

import { useState, useEffect } from 'react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import MotionWrapper from '../motion/MotionWrapper';
import TextReveal from '../motion/TextReveal';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Scale, Layers } from 'lucide-react';

const SERIES_OPTIONS = [
  {
    id: 'signature',
    name: 'Signature Series',
    tagline: 'Elegant & Sleek Design',
    description: 'Our most premium bottle. Thick-walled PET plastic, custom logo branding, matte aluminum cap. Perfect for corporate offices, boardrooms, and premium client presentations.',
    frontImage: '/signature.webp',
    backImage: '/signature.webp',
    width: 309,
    height: 1008,
    bgGlow: 'radial-gradient(ellipse 60% 80% at 50% 60%, rgba(13, 71, 161, 0.08) 0%, transparent 70%)',
    specs: [
      { label: 'Material', value: 'High-Density Premium PET', icon: Scale },
      { label: 'Cap Finish', value: 'Matte Aluminum Seal', icon: ShieldCheck },
      { label: 'Logo Method', value: 'Precision Custom Branding', icon: Sparkles },
      { label: 'Best For', value: 'VIP & Boardroom Tables', icon: Layers }
    ],
    waMessage: 'Hi PureHarvest, I want to know more about the Signature Series bottles.'
  },
  {
    id: 'classic',
    name: 'Classic Series',
    tagline: 'Clean, Simple, Classy',
    description: 'Light, durable, and beautifully branded. Anti-slip ridged grip, brushed silver cap, screen-printed logo. Great for cafés, restaurants, weddings, and high-volume events.',
    frontImage: '/classic.webp',
    backImage: '/classic.webp',
    width: 427,
    height: 1338,
    bgGlow: 'radial-gradient(ellipse 60% 80% at 50% 60%, rgba(0, 102, 255, 0.06) 0%, transparent 70%)',
    specs: [
      { label: 'Material', value: 'High-Durability Food PET', icon: Scale },
      { label: 'Cap Finish', value: 'Brushed Silver Cap', icon: ShieldCheck },
      { label: 'Logo Method', value: 'Organic Screen Printing', icon: Sparkles },
      { label: 'Best For', value: 'Cafés & High-Volume Events', icon: Layers }
    ],
    waMessage: 'Hi PureHarvest, I want to know more about the Classic Series bottles.'
  }
];

export default function InteractiveConfigurator() {
  const [activeSeries, setActiveSeries] = useState(SERIES_OPTIONS[0]);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSeriesChange = (series: typeof SERIES_OPTIONS[0]) => {
    setActiveSeries(series);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Section
      className="bg-gradient-to-b from-[#f8f8f8] to-[#f1f1f1] text-brand-accent py-32 border-t border-brand-accent/5 relative overflow-hidden"
      id="configurator"
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012] z-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      <Container className="relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ─── LEFT: Bottle Studio ─── */}
          <div
            className="relative flex items-center justify-center rounded-[48px] border border-white/80 overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #ffffff 0%, #f4f4f4 100%)',
              boxShadow: '0 40px 120px -30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              minHeight: '700px',
            }}
          >

            {/* Dynamic ambient glow */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`glow-${activeSeries.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                style={{ background: activeSeries.bgGlow }}
                className="absolute inset-0 pointer-events-none"
              />
            </AnimatePresence>

            {/* Top light bleed */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-10" />
            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#f4f4f4]/80 to-transparent pointer-events-none z-10" />

            {/* ── Bottle (explicit width/height — never collapses) ── */}
            <motion.div
              animate={isMobile ? { y: 0 } : { y: [0, -14, 0] }}
              transition={isMobile ? { duration: 0.1 } : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-20 flex items-center justify-center py-12 px-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`bottle-${activeSeries.id}`}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  whileHover={isMobile ? {} : { scale: 1.025, rotate: 0.5 }}
                  style={{ cursor: 'pointer', willChange: 'transform' }}
                >
                  <Image
                    src={activeSeries.frontImage}
                    alt={activeSeries.name}
                    width={activeSeries.width}
                    height={activeSeries.height}
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    style={{
                      width: 'auto',
                      height: isMobile ? 'min(45vh, 320px)' : 'min(72vh, 640px)',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: isMobile 
                        ? 'none' 
                        : 'drop-shadow(0 40px 60px rgba(0,0,0,0.12)) drop-shadow(0 8px 16px rgba(0,0,0,0.06))',
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Floor contact shadow — synced to float */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <motion.div
                animate={isMobile ? { scaleX: 1, opacity: 0.14 } : { scaleX: [1, 0.88, 1], opacity: [0.10, 0.18, 0.10] }}
                transition={isMobile ? { duration: 0.1 } : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 120,
                  height: 12,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.9)',
                  filter: 'blur(8px)',
                  willChange: 'transform, opacity',
                }}
              />
            </div>

            {/* Live render badge */}
            <div className="absolute bottom-5 right-7 flex items-center gap-2 pointer-events-none z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/50 animate-ping" />
              <span className="text-[8px] font-black uppercase tracking-[0.25em] text-brand-accent/25">
                Ultra-Sharp Render
              </span>
            </div>
          </div>

          {/* ─── RIGHT: Details Panel ─── */}
          <div className="flex flex-col justify-center">
            <MotionWrapper>
              <span className="text-brand-secondary font-black tracking-[0.35em] uppercase text-[9px] mb-5 block">
                Our Bottle Range
              </span>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <TextReveal
                text="Choose Your Bottle"
                as="h2"
                className="text-brand-accent tracking-tighter !font-black text-4xl sm:text-5xl lg:text-6xl mb-4 uppercase leading-[0.95]"
              />
            </MotionWrapper>

            <MotionWrapper delay={0.15}>
              <h3 className="text-brand-accent/50 font-bold uppercase tracking-[0.1em] text-sm sm:text-base mb-5">
                {activeSeries.tagline}
              </h3>
              <p className="text-brand-accent/60 leading-relaxed text-base font-medium max-w-lg mb-10">
                {activeSeries.description}
              </p>
            </MotionWrapper>

            {/* Apple-style segmented toggle */}
            <div className="bg-[#F8F9FA] md:bg-black/[0.03] border border-black/[0.06] p-1 rounded-full flex gap-1 mb-10 max-w-md md:backdrop-blur-sm">
              {SERIES_OPTIONS.map((series) => (
                <button
                  key={series.id}
                  onClick={() => handleSeriesChange(series)}
                  className="flex-1 relative py-3 rounded-full text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-500 cursor-pointer"
                >
                  {activeSeries.id === series.id && (
                    <motion.div
                      layoutId="activePremiumSegment"
                      className="absolute inset-0 bg-white border border-black/5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.07)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${activeSeries.id === series.id ? 'text-brand-accent' : 'text-brand-accent/35'}`}>
                    {series.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Spec cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {activeSeries.specs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <MotionWrapper
                    key={spec.label}
                    delay={0.2 + i * 0.06}
                    className="bg-white/95 md:bg-white/50 md:backdrop-blur-md border border-white/70 p-5 rounded-2xl flex items-center gap-4 hover:border-black/10 hover:bg-white/70 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] transition-all duration-400 group cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] md:bg-black/[0.02] border border-black/[0.06] flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary/10 transition-all shrink-0">
                      <Icon size={16} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.2em] text-brand-accent/40 font-bold mb-0.5">{spec.label}</div>
                      <div className="text-xs font-black uppercase text-brand-accent tracking-wide leading-snug">{spec.value}</div>
                    </div>
                  </MotionWrapper>
                );
              })}
            </div>

            {/* CTA */}
            <MotionWrapper delay={0.45} className="pt-10 mt-10 border-t border-black/[0.06] flex flex-col sm:flex-row items-center gap-6">
              <a
                href={`https://wa.me/918149174975?text=${encodeURIComponent(activeSeries.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-between gap-8 bg-[#18181B] text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] hover:bg-black hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 group cursor-pointer"
              >
                <span>Get a Free Mockup</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </a>
              <p className="text-[10px] text-brand-accent/40 font-black uppercase tracking-[0.2em] text-center sm:text-left leading-relaxed">
                We'll design it<br />in under 5 mins
              </p>
            </MotionWrapper>
          </div>

        </div>
      </Container>
    </Section>
  );
}
