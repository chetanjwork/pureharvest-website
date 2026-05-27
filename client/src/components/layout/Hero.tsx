'use client';

import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import MotionWrapper from '../motion/MotionWrapper';
import TextReveal from '../motion/TextReveal';
import { ArrowRight, Users, Droplet, Target, MessageCircle, Sparkles, ShieldCheck, Utensils, Coffee, GlassWater, Wine, Flame, Compass, Waves } from 'lucide-react';

const CLIENT_BRANDS = [
  { name: "Siro Eatery", icon: Utensils, tracking: "tracking-[0.25em]" },
  { name: "Copper Chimney", icon: Flame, tracking: "tracking-[0.22em]" },
  { name: "Brews & Beans", icon: Coffee, tracking: "tracking-[0.2em]" },
  { name: "Error 101", icon: GlassWater, tracking: "tracking-[0.35em]" },
  { name: "Martini 56", icon: Wine, tracking: "tracking-[0.25em]" },
  { name: "Anotti Bistro", icon: Utensils, tracking: "tracking-[0.22em]" },
  { name: "Tandoor Cuisine", icon: Flame, tracking: "tracking-[0.22em]" },
  { name: "Sairaj Resort", icon: Compass, tracking: "tracking-[0.25em]" },
  { name: "Mahesh Fine Dine", icon: Waves, tracking: "tracking-[0.2em]" }
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const disableAnimations = shouldReduceMotion;

  // Track scroll position of the hero section for premium, lag-free parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Bypass heavy physics engines (useSpring) and connect directly to raw hardware-accelerated scroll.
  // This completely eliminates Main Thread math blocking on initial load for older phones.
  const bottleY = useTransform(scrollYProgress, [0, 1], ["0px", "200px"]);
  const bottleScale = useTransform(scrollYProgress, [0, 1], [1.15, 0.90]);
  const bottleRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const bottleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] will-change-transform pt-[10vh] lg:pt-[12vh] pb-[6vh] lg:pb-[8vh] bg-[#F3F4F6] overflow-hidden flex flex-col snap-start snap-always" id="hero">

      {/* 1. Cinematic Studio Spotlight (Radial Gradient) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_#FFFFFF_0%,_#F3F4F6_50%,_#E5E7EB_100%)] z-0" />

      {/* 2. Massive Background Watermark (Depth) */}
      <div className="absolute top-[40%] lg:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center z-0 pointer-events-none select-none overflow-hidden">
        <h2 className="font-sans font-black text-[12rem] sm:text-[24rem] lg:text-[45rem] text-[#000000] opacity-[0.03] tracking-[-0.05em] leading-none whitespace-nowrap">
          PURE
        </h2>
      </div>

      {/* Main Container - perfectly aligned with Navbar */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 w-full relative z-20 flex-1 flex flex-col justify-center">
        {/* Main Layout - Flex Col on Mobile, Row on Desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-between flex-1 relative w-full pt-10 lg:pt-0 pb-16 lg:pb-0 min-h-[85vh] lg:min-h-0">

          {/* LEFT COLUMN: Typography & CTA */}
          <div className="w-full lg:w-[35%] flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-30 order-1 lg:order-none mb-10 lg:mb-0">
            <MotionWrapper delay={0.1}>
              <span className="text-[#0D47A1] font-bold tracking-[0.25em] uppercase text-[9px] sm:text-[10px] mb-3 lg:mb-5 block">
                Premium Custom Hydration
              </span>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <h1 className="!font-sans !font-black leading-[0.95] lg:leading-[1.0] tracking-[-0.04em] text-[3.2rem] sm:text-[5rem] lg:text-[5.5rem] xl:text-[6.2rem] uppercase mb-4 lg:mb-5 flex flex-col lg:flex-row">
                <span className="text-brand-accent">PREMIUM BRANDED</span>
                <span className="text-[#0D47A1] lg:ml-4">WATER</span>
              </h1>
            </MotionWrapper>

            <TextReveal
              text="Your brand deserves water that makes a statement. We put your logo on premium bottles — so every sip feels like an experience."
              delay={0.3}
              className="text-[#4B5563] text-[14px] sm:text-[15px] max-w-[320px] lg:max-w-[450px] font-medium leading-[1.6] mb-8 lg:mb-10 mx-auto lg:mx-0 justify-center lg:justify-start"
            />

            <MotionWrapper delay={0.4}>
              <div className="flex flex-col items-center lg:items-start gap-5">
                <button
                  onClick={() => document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-between gap-8 bg-brand-accent text-white px-10 py-4.5 rounded-full text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl hover:opacity-90 hover:scale-[1.05] active:scale-95 transition-all w-max group"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-white/80" strokeWidth={3} />
                </button>
              </div>
            </MotionWrapper>
          </div>

          {disableAnimations ? (
            <div className="w-full flex items-center justify-center z-10 order-2 py-6 pointer-events-none">
              <div className="relative w-full h-full flex items-center justify-center animate-mobile-hero">
                <Image
                  src="/pureharvestherobottle.png"
                  alt="PureHarvest Premium Branded Water Bottle"
                  width={1536}
                  height={1024}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-contain md:drop-shadow-[0_24px_48px_rgba(0,0,0,0.12)] max-h-[50vh]"
                />
              </div>
            </div>
          ) : (
            <motion.div
              className="w-full lg:w-auto lg:absolute lg:left-1/2 lg:top-[50%] lg:-translate-x-1/2 lg:-translate-y-[48%] flex items-center justify-center z-10 order-2 lg:order-none py-6 lg:py-0 pointer-events-none"
              style={{
                y: bottleY,
                scale: bottleScale,
                rotate: bottleRotate,
                opacity: bottleOpacity,
                z: 0, // Forces GPU hardware acceleration layer
                willChange: "transform, opacity"
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: [0, -15, 0] }}
                transition={{
                  opacity: { duration: 0.8 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ z: 0 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src="/pureharvestherobottle.png"
                  alt="PureHarvest Premium Branded Water Bottle"
                  width={1536}
                  height={1024}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-contain md:drop-shadow-[0_40px_70px_rgba(0,0,0,0.18)] max-h-[82vh]"
                />
              </motion.div>
            </motion.div>
          )}

          {/* RIGHT COLUMN: Glass Metrics Cards */}
          <div className="w-full lg:w-[32%] flex flex-col justify-center gap-3 lg:gap-4 z-20 order-3 lg:order-none pb-4 lg:pb-0">
            {/* Metric 1 */}
            <MotionWrapper delay={0.4}>
              <div className="bg-white md:bg-[#FFFFFF]/80 md:backdrop-blur-xl border border-gray-100 md:border-white/60 shadow-sm md:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] rounded-xl h-[75px] lg:h-[100px] flex items-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-[70px] lg:w-[100px] h-full flex items-center justify-center border-r border-[#E5E7EB] border-opacity-80">
                  <Users size={20} strokeWidth={1.5} className="text-[#1E50FF] lg:w-7 lg:h-7" />
                </div>
                <div className="pl-4 lg:pl-6 flex flex-col justify-center">
                  <div className="text-[24px] lg:text-[32px] leading-none font-sans font-medium text-brand-accent tracking-tight mb-0.5 lg:mb-1">5+</div>
                  <div className="text-[7px] lg:text-[9px] uppercase tracking-[0.2em] font-bold text-[#6B7280]">Exclusive Brands</div>
                </div>
              </div>
            </MotionWrapper>

            {/* Metric 2 */}
            <MotionWrapper delay={0.5}>
              <div className="bg-white md:bg-[#FFFFFF]/80 md:backdrop-blur-xl border border-gray-100 md:border-white/60 shadow-sm md:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] rounded-xl h-[75px] lg:h-[100px] flex items-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-[70px] lg:w-[100px] h-full flex items-center justify-center border-r border-[#E5E7EB] border-opacity-80">
                  <ShieldCheck size={20} strokeWidth={1.5} className="text-[#1E50FF] lg:w-7 lg:h-7" />
                </div>
                <div className="pl-4 lg:pl-6 flex flex-col justify-center">
                  <div className="text-[24px] lg:text-[32px] leading-none font-sans font-medium text-brand-accent tracking-tight mb-0.5 lg:mb-1">100%</div>
                  <div className="text-[7px] lg:text-[9px] uppercase tracking-[0.2em] font-bold text-[#6B7280]">Recyclable PET</div>
                </div>
              </div>
            </MotionWrapper>

            {/* Metric 3 */}
            <MotionWrapper delay={0.6}>
              <div className="bg-white md:bg-[#FFFFFF]/80 md:backdrop-blur-xl border border-gray-100 md:border-white/60 shadow-sm md:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] rounded-xl h-[75px] lg:h-[100px] flex items-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-[70px] lg:w-[100px] h-full flex items-center justify-center border-r border-[#E5E7EB] border-opacity-80">
                  <Droplet size={20} strokeWidth={1.5} className="text-[#1E50FF] lg:w-7 lg:h-7" />
                </div>
                <div className="pl-4 lg:pl-6 flex flex-col justify-center">
                  <div className="text-[24px] lg:text-[32px] leading-none font-sans font-medium text-brand-accent tracking-tight mb-0.5 lg:mb-1">10-Stage</div>
                  <div className="text-[7px] lg:text-[9px] uppercase tracking-[0.2em] font-bold text-[#6B7280]">Filtered Purity</div>
                </div>
              </div>
            </MotionWrapper>
          </div>

        </div>
      </div>

      {/* BOTTOM MARQUEE / TRUSTED BY */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-20 pb-4 lg:pb-8 overflow-hidden bg-gradient-to-t from-[#F3F4F6] via-[#F3F4F6] to-transparent pt-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10 flex items-center opacity-90 transition-all duration-500">

          {/* Trusted By Text - Static */}
          <div className="w-auto pr-4 lg:pr-12 relative z-20">
            <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] text-brand-accent/60 whitespace-nowrap">Trusted By</span>
          </div>

          {/* Animated Scrolling Logos Marquee */}
          <div className="flex-1 overflow-hidden relative flex items-center">

            {/* Inject CSS Animation for 60fps buttery scrolling */}
            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee-scroll {
                display: flex;
                width: max-content;
                animation: marqueeScroll 35s linear infinite;
              }
              .animate-marquee-scroll:hover {
                animation-play-state: paused;
              }
            `}} />

            {/* Left/Right Fade Gradients for seamless edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 lg:w-32 bg-gradient-to-r from-[#F3F4F6] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 lg:w-32 bg-gradient-to-l from-[#F3F4F6] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-scroll items-center gap-6 lg:gap-12 pl-4 lg:pl-8">
              {[0, 1].map((set) => (
                <div key={set} className="flex items-center gap-6 lg:gap-12 min-w-max">
                  {CLIENT_BRANDS.map((client, index) => {
                    const Icon = client.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 lg:gap-4.5">
                        <Icon className="text-brand-secondary/80 w-[12px] h-[12px] lg:w-[15px] lg:h-[15px] stroke-[2]" />
                        <span className={`font-sans font-black text-[11px] lg:text-[13px] ${client.tracking} text-brand-accent/90 uppercase whitespace-nowrap`}>
                          {client.name}
                        </span>
                        <span className="h-3.5 w-[1px] bg-black/10 block ml-3.5 lg:ml-7" />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
