'use client';

import Container from '../ui/Container';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import MotionWrapper from '../motion/MotionWrapper';
import { motion } from 'framer-motion';
import { MessageSquare, Layers, Zap, Truck } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Tell Us Your Brand',
    description: 'Share your logo, colors, and what makes your brand unique. We listen, understand, and plan the perfect bottle for you.',
    Icon: MessageSquare,
  },
  {
    number: '02',
    title: 'We Design Your Bottle',
    description: 'Our design team creates a mockup that matches your brand exactly. You review, approve, and we get it perfect.',
    Icon: Layers,
  },
  {
    number: '03',
    title: 'We Make It',
    description: 'Your branded bottles are produced with precision - clean, safe, and quality-checked at every step.',
    Icon: Zap,
  },
  {
    number: '04',
    title: 'Delivered To You',
    description: 'We deliver directly to your hotel, office, café, or event - on time, every time, anywhere in Mumbai & Thane.',
    Icon: Truck,
  },
];

export default function Process() {
  return (
    <Section className="bg-brand-primary text-brand-accent py-24" id="process">
      <Container>
        <div className="text-center mb-24">
          <MotionWrapper>
            <span className="text-brand-accent/40 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
              How It Works
            </span>
          </MotionWrapper>
          <MotionWrapper delay={0.15}>
            <Heading level={2} className="text-brand-accent tracking-tight !font-semibold">
              Simple. Fast.<br />Done Right.
            </Heading>
          </MotionWrapper>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {/* Connector line (Apple style soft line) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-black/[0.04] z-0" />

          {steps.map((step, index) => {
            const Icon = step.Icon;
            return (
              <MotionWrapper key={index} delay={index * 0.1} className="relative group z-10">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="flex flex-col h-full bg-white/95 md:bg-white/50 md:backdrop-blur-sm rounded-[32px] p-8 border border-black/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] hover:bg-white transition-all duration-300 cursor-default"
                >
                  {/* Step icon circle */}
                  <div className="w-16 h-16 rounded-[20px] bg-white shadow-sm border border-black/[0.04] flex items-center justify-center mb-8 relative group-hover:scale-105 transition-transform duration-500 ease-out">
                    <Icon size={24} strokeWidth={1.5} className="text-brand-secondary" />
                    {/* Step number badge */}
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-accent rounded-full text-brand-primary text-[10px] font-bold flex items-center justify-center shadow-md">
                      {index + 1}
                    </span>
                  </div>

                  <h2 className="text-[19px] font-semibold mb-4 text-brand-accent tracking-tight">
                    {step.title}
                  </h2>
                  <p className="text-brand-accent/60 leading-relaxed text-[15px] font-medium">
                    {step.description}
                  </p>
                </motion.div>
              </MotionWrapper>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <MotionWrapper delay={0.5} className="mt-24 text-center">
          <a
            href="https://wa.me/918149174975?text=Hello%20PureHarvest%2C%20I%20want%20to%20start%20the%20customization%20process."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-accent text-brand-primary px-10 py-5 rounded-full text-[13px] font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Start Your Order
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </a>
        </MotionWrapper>
      </Container>
    </Section>
  );
}
