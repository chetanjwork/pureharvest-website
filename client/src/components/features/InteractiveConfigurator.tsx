'use client';

import { useState, useEffect } from 'react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import MotionWrapper from '../motion/MotionWrapper';
import TextReveal from '../motion/TextReveal';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Scale, Layers } from 'lucide-react';
import { useAdaptivePerformance } from '../providers/AdaptivePerformanceProvider';

const SERIES_OPTIONS = [
  {
    id: 'signature',
    name: 'Signature Series',
    tagline: 'Elegant & Sleek',
    description: 'Thick-walled premium PET with matte aluminum caps. Designed for corporate headquarters, boardrooms, and high-end client hospitality.',
    frontImage: '/signature.webp',
    backImage: '/signature.webp',
    width: 309,
    height: 1008,
    bgGlow: 'radial-gradient(ellipse 60% 80% at 50% 60%, rgba(13, 71, 161, 0.08) 0%, transparent 70%)',
    specs: [
      { label: 'Material', value: 'Premium PET', icon: Scale },
      { label: 'Cap Finish', value: 'Matte Aluminum', icon: ShieldCheck },
      { label: 'Logo Method', value: 'Precision Branding', icon: Sparkles },
      { label: 'Best For', value: 'Executive Spaces', icon: Layers }
    ],
    waMessage: 'Hi PureHarvest, I want to know more about the Signature Series bottles.'
  },
  {
    id: 'classic',
    name: 'Classic Series',
    tagline: 'Clean & Durable',
    description: 'Lightweight, durable, and beautifully screen-printed. Features a secure grip and brushed finish. Perfect for cafés, restaurants, and high-volume hospitality.',
    frontImage: '/classic.webp',
    backImage: '/classic.webp',
    width: 427,
    height: 1338,
    bgGlow: 'radial-gradient(ellipse 60% 80% at 50% 60%, rgba(0, 102, 255, 0.06) 0%, transparent 70%)',
    specs: [
      { label: 'Material', value: 'Food-Grade PET', icon: Scale },
      { label: 'Cap Finish', value: 'Brushed Silver', icon: ShieldCheck },
      { label: 'Logo Method', value: 'Screen Printing', icon: Sparkles },
      { label: 'Best For', value: 'Cafes & Events', icon: Layers }
    ],
    waMessage: 'Hi PureHarvest, I want to know more about the Classic Series bottles.'
  }
];

export default function InteractiveConfigurator() {
  const [activeSeries, setActiveSeries] = useState(SERIES_OPTIONS[0]);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isLowEndDevice, reduceMotion } = useAdaptivePerformance();

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
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
      className="bg-linear-to-b from-[#f8f8f8] to-[#f1f1f1] text-brand-accent py-16 md:py-20 lg:py-24 border-t border-brand-accent/5 relative overflow-hidden"
      id="configurator"
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.01] z-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      <Container className="relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ─── LEFT: Bottle Studio ─── */}
          <div
            className="relative flex items-center justify-center rounded-[32px] lg:rounded-[48px] border border-white/80 overflow-hidden min-h-[420px] lg:min-h-[660px] w-full"
            style={{
              background: 'linear-gradient(160deg, #ffffff 0%, #f4f4f4 100%)',
              boxShadow: '0 40px 120px -30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
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
            <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-white/60 to-transparent pointer-events-none z-10" />
            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-[#f4f4f4]/80 to-transparent pointer-events-none z-10" />

            {/* -- Bottle (explicit width/height - never collapses) -- */}
            <motion.div
              animate={isMobile || isLowEndDevice ? { y: 0 } : { y: [0, -14, 0] }}
              transition={isMobile || isLowEndDevice ? { duration: 0.1 } : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-20 flex items-center justify-center py-12 px-8"
            >
              {mounted && (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`bottle-${activeSeries.id}`}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, rotateY: 30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={isLowEndDevice ? { opacity: 0 } : { opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={isLowEndDevice ? { duration: 0.2 } : { duration: 0.45, ease: 'easeInOut' }}
                    whileHover={isLowEndDevice || isMobile ? {} : { scale: 1.025, rotate: 0.5 }}
                    viewport={{ margin: "200px" }}
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
                        height: isMobile ? 'min(45vh, 300px)' : 'min(72vh, 600px)',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: isMobile 
                          ? 'none' 
                          : 'drop-shadow(0 40px 60px rgba(0,0,0,0.12)) drop-shadow(0 8px 16px rgba(0,0,0,0.06))',
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>

            {/* Floor contact shadow - synced to float */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <motion.div
                animate={isMobile ? { scaleX: 1, opacity: 0.1 } : { scaleX: [1, 0.88, 1], opacity: [0.08, 0.14, 0.08] }}
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
              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/40 animate-ping" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-accent/30">
                Studio Render
              </span>
            </div>
          </div>

          {/* ─── RIGHT: Details Panel ─── */}
          <div className="flex flex-col justify-center">
            <MotionWrapper>
              <span className="text-brand-secondary font-semibold tracking-[0.2em] uppercase text-xs mb-3 block">
                The Collection
              </span>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <TextReveal
                text="Choose Your Bottle"
                as="h2"
                className="text-brand-accent tracking-tight font-semibold text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight"
              />
            </MotionWrapper>

            <MotionWrapper delay={0.15}>
              <h3 className="text-brand-secondary font-medium text-base sm:text-lg mb-3">
                {activeSeries.tagline}
              </h3>
              <p className="text-brand-accent/60 leading-relaxed text-sm sm:text-base font-medium max-w-lg mb-8">
                {activeSeries.description}
              </p>
            </MotionWrapper>

            {/* Apple-style segmented toggle */}
            <div className="bg-black/[0.03] border border-black/5 p-1 rounded-full flex gap-1 mb-8 max-w-xs">
              {SERIES_OPTIONS.map((series) => (
                <button
                  key={series.id}
                  onClick={() => handleSeriesChange(series)}
                  className="flex-1 relative py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                >
                  {activeSeries.id === series.id && (
                    <motion.div
                      layoutId="activePremiumSegment"
                      className="absolute inset-0 bg-white border border-black/5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${activeSeries.id === series.id ? 'text-brand-accent' : 'text-brand-accent/40'}`}>
                    {series.name.replace(' Series', '')}
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
                    className="bg-white/40 backdrop-blur-xs border border-black/[0.03] p-4 rounded-xl flex items-center gap-3.5 hover:border-black/10 hover:bg-white/60 transition-all duration-300 group cursor-default"
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/[0.02] border border-black/[0.04] flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary/5 transition-all shrink-0">
                      <Icon size={14} strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-brand-accent/40 font-medium mb-0.5">{spec.label}</div>
                      <div className="text-xs font-semibold text-brand-accent/80 tracking-wide leading-none">{spec.value}</div>
                    </div>
                  </MotionWrapper>
                );
              })}
            </div>

            {/* CTA */}
            <MotionWrapper delay={0.45} className="pt-8 mt-8 border-t border-black/5 flex flex-col sm:flex-row items-center gap-5">
              <a
                href={`https://wa.me/918149174975?text=${encodeURIComponent(activeSeries.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-between gap-6 bg-brand-accent text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-brand-accent/90 active:scale-95 transition-all duration-300 group cursor-pointer"
              >
                <span>Get a Free Mockup</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </a>
              <p className="text-[10px] text-brand-accent/40 font-semibold uppercase tracking-wider text-center sm:text-left leading-relaxed">
                We&apos;ll design it<br />in under 5 mins
              </p>
            </MotionWrapper>
          </div>

        </div>
      </Container>
    </Section>
  );
}
