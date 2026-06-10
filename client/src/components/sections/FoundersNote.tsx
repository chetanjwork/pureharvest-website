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
            <span className="text-[#D4AF37] font-semibold tracking-[0.25em] uppercase text-[11px] sm:text-xs mb-4 lg:mb-6 block">
              ELEVATING HOSPITALITY
            </span>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <h2 className="text-[32px] sm:text-5xl lg:text-[56px] font-serif font-medium text-[#0A1128] mb-12 lg:mb-16 tracking-tight leading-[1.1]">
              Premium Water for Premium Brands
            </h2>
          </MotionWrapper>

          <MotionWrapper delay={0.3} className="w-full">
            <div className="relative px-4 sm:px-8 md:px-12">
              <Quote className="absolute -top-6 left-0 md:-top-10 md:-left-4 w-10 h-10 md:w-16 md:h-16 text-[#D4AF37]/10 rotate-180" strokeWidth={1} />
              <div className="flex flex-col gap-6 md:gap-8">
                <p className="font-sans text-[16px] sm:text-[18px] md:text-[21px] text-[#0A1128]/70 leading-[1.8] md:leading-[1.9] font-normal relative z-10">
                  PureHarvest was created to solve a simple problem: businesses need better water. I realized that a good hotel, restaurant, or office deserves more than just standard plastic bottles—they need premium glass bottles that look amazing.
                </p>
                <p className="font-sans text-[16px] sm:text-[18px] md:text-[21px] text-[#0A1128]/70 leading-[1.8] md:leading-[1.9] font-normal relative z-10">
                  When you work with us, we treat you like a VIP. We make sure every bottle is perfectly designed and delivered on time, so you can offer the best experience to your own customers.
                </p>
              </div>
              <Quote className="absolute -bottom-6 right-0 md:-bottom-10 md:-right-4 w-10 h-10 md:w-16 md:h-16 text-[#D4AF37]/10" strokeWidth={1} />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.4} className="mt-16 lg:mt-20 flex flex-col items-center text-center">
            <span className="font-serif font-semibold text-2xl md:text-3xl lg:text-4xl text-[#0A1128] mb-2 tracking-tight block">
              Mrunal Devras
            </span>
            <span className="text-brand-accent/50 font-medium tracking-[0.2em] text-[11px] md:text-xs block uppercase">
              Founder, PureHarvest
            </span>
          </MotionWrapper>

        </div>
      </Container>
    </Section>
  );
}
