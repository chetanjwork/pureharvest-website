'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import MotionWrapper from '@/components/motion/MotionWrapper';
import { Quote } from 'lucide-react';

export default function FoundersNote() {
  return (
    <Section className="bg-white text-brand-accent py-24 md:py-32 lg:py-40 relative overflow-hidden" id="founders-note">
      {/* Subtle luxury background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/[0.02] blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0D47A1]/[0.02] blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      <Container>
        <div className="max-w-3xl lg:max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          
          <MotionWrapper delay={0.1}>
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 lg:mb-8 block">
              ELEVATING HOSPITALITY
            </span>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-brand-accent mb-12 lg:mb-16 tracking-tight leading-tight">
              A Standard of Purity, Crafted for Excellence
            </h2>
          </MotionWrapper>

          <MotionWrapper delay={0.3} className="w-full">
            <div className="relative px-6 md:px-12">
              <Quote className="absolute -top-6 left-0 md:-top-10 md:-left-4 w-12 h-12 md:w-16 md:h-16 text-[#D4AF37]/10 rotate-180" strokeWidth={1} />
              <div className="flex flex-col gap-8 md:gap-10">
                <p className="font-serif italic text-[18px] md:text-[24px] lg:text-[28px] text-brand-accent/80 leading-[1.9] md:leading-[2] font-medium relative z-10">
                  PureHarvest wasn’t simply built to manufacture bottles; it was created to solve a quiet problem in luxury hospitality. I realized that a truly premium hotel or corporate boardroom deserves more than just standard water - it requires an uncompromising aesthetic and absolute purity.
                </p>
                <p className="font-serif italic text-[18px] md:text-[24px] lg:text-[28px] text-brand-accent/80 leading-[1.9] md:leading-[2] font-medium relative z-10">
                  When you partner with us, you aren't just another account. We engineer our signature series with the exact same meticulous care you offer your own VIP guests - ensuring every table, event, and suite reflects absolute perfection. For us, the bottle is just the vessel; elevating your brand's experience is everything.
                </p>
              </div>
              <Quote className="absolute -bottom-6 right-0 md:-bottom-10 md:-right-4 w-12 h-12 md:w-16 md:h-16 text-[#D4AF37]/10" strokeWidth={1} />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.4} className="mt-16 lg:mt-20 flex flex-col items-center">
            <span className="font-serif font-black text-3xl md:text-4xl lg:text-5xl text-brand-accent mb-4 tracking-tighter block">
              Mrunal Devras
            </span>
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
              FOUNDER, PUREHARVEST
            </span>
          </MotionWrapper>

        </div>
      </Container>
    </Section>
  );
}
