'use client';

import Image from 'next/image';
import Container from '../ui/Container';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import MotionWrapper from '../motion/MotionWrapper';
import ParallaxImage from '../motion/ParallaxImage';
import TextReveal from '../motion/TextReveal';
import { motion } from 'framer-motion';

export default function Transformation() {
  return (
    <Section className="bg-black text-white pt-64 pb-32 relative z-20 -mt-[1px]" id="transformation">
      <Container>
        <div className="text-center mb-32 relative z-30">
          <MotionWrapper>
            <span className="text-white/20 font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">The Transformation</span>
            <Heading level={2} className="text-5xl md:text-6xl lg:text-7xl !font-sans !font-black tracking-tighter mb-10 uppercase">
              ORDINARY VS. <br /><span className="text-white/40">EXTRAORDINARY</span>
            </Heading>
            <TextReveal
              text="Branded water is more than just a drink. It's a statement of style and quality that shows your guests you care about every detail."
              delay={0.2}
              className="text-white/40 text-xl font-light leading-relaxed max-w-2xl mx-auto justify-center"
            />
          </MotionWrapper>
        </div>

        <div className="grid lg:grid-cols-2 border border-white/10 rounded-[32px] md:rounded-[48px] overflow-hidden bg-[#0A0A0A]">
          
          {/* BEFORE: The Ordinary */}
          <div className="relative group overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
            <ParallaxImage
              src="/before.webp"
              alt="Ordinary Water Setup"
              className="relative aspect-[4/5] grayscale group-hover:grayscale-0 transition-all duration-1000"
              imageClassName="opacity-60 scale-105 group-hover:scale-100 transition-transform duration-1000"
              speed={12}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-white/20" />
                <span className="text-white/30 text-[9px] uppercase tracking-[0.4em] font-black">Stage 01</span>
              </div>
              <h3 className="text-3xl font-black tracking-tight text-white/40 mb-3 uppercase">Brand Disconnect</h3>
              <p className="text-white/20 text-lg font-light leading-snug max-w-xs">
                Generic, plastic bottles that don't match your brand's unique identity.
              </p>
            </div>
          </div>

          {/* AFTER: The Extraordinary */}
          <div className="relative group overflow-hidden">
            <ParallaxImage
              src="/after.webp"
              alt="PureHarvest Brand Experience"
              className="relative aspect-[4/5]"
              imageClassName="scale-110 group-hover:scale-105 transition-transform duration-1000"
              speed={12}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
            
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-white" />
                <span className="text-white text-[9px] uppercase tracking-[0.4em] font-black">Stage 02</span>
              </div>
              <motion.h3 
                animate={{ color: ['#FFFFFF', '#E5C100', '#FFFFFF'] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-3xl font-black tracking-tight text-white mb-3 uppercase"
              >
                Brand Elevation
              </motion.h3>
              <p className="text-white/60 text-lg font-light leading-snug max-w-xs">
                Premium, custom glass bottles that complement your aesthetic and leave a lasting impression.
              </p>
            </div>

            {/* Premium Badge */}
            <div className="absolute top-8 right-8 bg-white text-black px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl">
              100% Impact
            </div>
          </div>

        </div>

        <div className="mt-20 text-center">
          <MotionWrapper delay={0.4}>
            <div className="inline-flex flex-col items-center gap-6">
              <div className="h-20 w-px bg-gradient-to-b from-white/20 to-transparent" />
              <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-black">Transform Your Property Today</p>
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </Section>
  );
}
