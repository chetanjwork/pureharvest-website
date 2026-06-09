'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue } from 'framer-motion';
import { Droplet, Palette, ShieldCheck, Globe } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import TextReveal from '@/components/motion/TextReveal';
import MotionWrapper from '@/components/motion/MotionWrapper';

function BentoCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <MotionWrapper className={className} delay={delay}>
      <motion.div
        onMouseMove={onMouseMove}
        whileHover={{ y: -4, scale: 1.005 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="group p-8 md:p-12 rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-white to-gray-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-black/[0.03] transition-all cursor-pointer h-full flex flex-col relative overflow-hidden"
      >
        {/* MAGNETIC GLOW EFFECT */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[32px] md:rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, var(--color-brand-secondary)/0.03, transparent 40%)`,
          }}
        />
        
        <div className="relative z-10 h-full flex flex-col">
          {children}
        </div>
      </motion.div>
    </MotionWrapper>
  );
}

export default function Services() {
  return (
    <Section className="bg-brand-primary text-brand-accent" id="services">
      <Container>
        <div className="text-center mb-20">
          <MotionWrapper>
            <span className="text-brand-secondary font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">
              What We Do
            </span>
          </MotionWrapper>
          <MotionWrapper delay={0.15}>
            <h2 className="text-brand-accent mb-6 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              Everything You Need,<br />In One Place
            </h2>
            <p className="text-brand-accent/60 text-lg font-medium">
              From design to delivery - we handle your branded water, end to end.
            </p>
          </MotionWrapper>
        </div>

        {/* BENTO BOX GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(280px,auto)] lg:auto-rows-[320px]">
          
          {/* BENTO 1: Signature Branding */}
          <BentoCard className="lg:col-span-2 lg:row-span-2" delay={0.1}>
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-brand-secondary/10 to-transparent blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000 ease-out z-0" />
            <div className="absolute -right-10 -bottom-10 w-[120%] max-w-[500px] opacity-[0.03] pointer-events-none group-hover:scale-[1.02] group-hover:-translate-y-2 transition-transform duration-1000 ease-out z-0">
              <Image 
                src="/pureharvestherobottle.webp" 
                alt="" 
                width={500} 
                height={500} 
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-br from-[#0B2147] to-[#1E3A8A] text-white rounded-2xl flex items-center justify-center mb-8 flex-shrink-0 relative z-10 shadow-[0_10px_30px_rgba(11,33,71,0.2)] border border-white/10"
            >
              <Palette size={28} strokeWidth={2} />
            </motion.div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-brand-accent tracking-tighter leading-[0.95] relative z-10">Signature<br/>Branding</h3>
            <p className="text-brand-accent/60 leading-relaxed text-[16px] md:text-[18px] font-medium max-w-sm relative z-10 mt-auto">
              Your logo. Your brand. On every bottle. We design it to look so good, people notice before they even take a sip.
            </p>
          </BentoCard>

          {/* BENTO 2: Global Logistics */}
          <BentoCard className="lg:col-span-2 lg:row-span-1" delay={0.2}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-accent)/0.02_0%,_transparent_60%)]" />
            
            <div className="relative z-10 flex-1 flex flex-col justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-14 h-14 bg-gradient-to-br from-gray-100 to-white text-brand-accent rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 shadow-sm border border-black/5"
              >
                <Globe size={24} strokeWidth={2} />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-black mb-3 text-brand-accent tracking-tight">Global Logistics</h3>
              <p className="text-brand-accent/60 leading-relaxed text-[15px] font-medium max-w-md">
                We deliver on time, every time - across Mumbai, Thane, and all of Maharashtra.
              </p>
            </div>
          </BentoCard>

          {/* BENTO 3: Artesian Purity */}
          <BentoCard className="lg:col-span-1 lg:row-span-1" delay={0.3}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100/50 text-[#0066FF] rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 shadow-sm border border-blue-500/10"
            >
              <Droplet size={24} strokeWidth={2} />
            </motion.div>
            <h3 className="text-xl md:text-2xl font-black mb-3 text-brand-accent tracking-tight leading-tight">Crystal Clear<br/>Water</h3>
            <p className="text-brand-accent/60 leading-relaxed text-[14px] font-medium mt-auto">
              10-stage purified. No shortcuts. Just clean, great-tasting water.
            </p>
          </BentoCard>

          {/* BENTO 4: Institutional Trust */}
          <BentoCard className="lg:col-span-1 lg:row-span-1" delay={0.4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-14 h-14 bg-gradient-to-br from-gray-100 to-white text-brand-accent rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 shadow-sm border border-black/5"
            >
              <ShieldCheck size={24} strokeWidth={2} />
            </motion.div>
            <h3 className="text-xl md:text-2xl font-black mb-3 text-brand-accent tracking-tight leading-tight">100% Safe &<br/>Certified</h3>
            <p className="text-brand-accent/60 leading-relaxed text-[14px] font-medium mt-auto">
              Every batch is tested. You serve it with confidence.
            </p>
          </BentoCard>

        </div>

        {/* ROLLING BOTTLE ANIMATION (Narrative Link from Hero) */}
        <div className="absolute -left-20 bottom-0 w-64 h-96 pointer-events-none z-0 hidden lg:block overflow-hidden">
          <motion.div
            initial={{ x: -300, rotate: -90, opacity: 0 }}
            whileInView={{ x: 100, rotate: 15, opacity: 0.1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            className="w-full h-full"
          >
            <img 
              src="/classic-front.webp" 
              alt="" 
              className="w-full h-full object-contain grayscale brightness-150"
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
