'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import MotionWrapper from '@/components/motion/MotionWrapper';
import { Quote } from 'lucide-react';

export default function FoundersNote() {
  return (
    <Section className="bg-white text-brand-accent py-16 md:py-20 lg:py-24 relative overflow-hidden" id="founders-note">
      {/* Subtle luxury background element */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-[#D4AF37]/[0.02] blur-25 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-[#0D47A1]/[0.02] blur-25 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      <Container>
        <div className="max-w-3xl lg:max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          
          <MotionWrapper delay={0.1}>
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-2.5 md:text-xs mb-6 lg:mb-8 block">
              ELEVATING HOSPITALITY
            </span>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-brand-accent mb-12 lg:mb-16 tracking-tight leading-tight">
              Premium Water for Premium Brands
            </h2>
          </MotionWrapper>

          <MotionWrapper delay={0.3} className="w-full">
            <div className="relative px-6 md:px-12">
              <Quote className="absolute -top-6 left-0 md:-top-10 md:-left-4 w-12 h-12 md:w-16 md:h-16 text-[#D4AF37]/10 rotate-180" strokeWidth={1} />
              <div className="flex flex-col gap-5 md:gap-6">
                <p className="font-sans text-4 md:text-4.5 lg:text-5 text-brand-accent/80 leading-[1.7] md:leading-[1.8] font-normal relative z-10">
                  PureHarvest was created to solve a simple problem: businesses need better water. I realized that a good hotel, restaurant, or office deserves more than just standard plastic bottles—they need premium glass bottles that look amazing.
                </p>
                <p className="font-sans text-4 md:text-4.5 lg:text-5 text-brand-accent/80 leading-[1.7] md:leading-[1.8] font-normal relative z-10">
                  When you work with us, we treat you like a VIP. We make sure every bottle is perfectly designed and delivered on time, so you can offer the best experience to your own customers.
                </p>
              </div>
              <Quote className="absolute -bottom-6 right-0 md:-bottom-10 md:-right-4 w-12 h-12 md:w-16 md:h-16 text-[#D4AF37]/10" strokeWidth={1} />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.4} className="mt-16 lg:mt-20 flex flex-col items-center text-center">
            <span className="font-serif font-black text-3xl md:text-4xl lg:text-5xl text-brand-accent mb-3 tracking-tighter block">
              Mrunal Devras
            </span>
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-2.25 md:text-2.5 block mb-1.5">
              Founder
            </span>
            <span className="text-brand-accent/50 font-bold tracking-[0.35em] text-2 md:text-2.25 block">
              Pure Harvest.
            </span>
          </MotionWrapper>

        </div>
      </Container>
    </Section>
  );
}
