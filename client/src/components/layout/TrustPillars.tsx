'use client';

import Container from '../ui/Container';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import MotionWrapper from '../motion/MotionWrapper';
import { ShieldCheck, Award, Palette, Hotel, Zap } from 'lucide-react';

const pillars = [
  {
    title: 'Premium Sustainability',
    desc: 'Displace single-use plastics. We supply lead-free Borosilicate and ultra-clear tempered Clarity Glass options to match the ecological commitments of elite hospitality and corporate venues.',
    icon: ShieldCheck,
  },
  {
    title: 'Signature Identity',
    desc: 'Your logo, beautifully printed or branded on the bottle. Every bottle becomes a premium asset for your brand.',
    icon: Palette,
  },
  {
    title: 'Artisanal Mastery',
    desc: 'Stunning design details and custom caps that get noticed by everyone.',
    icon: Award,
  },
  {
    title: 'Hospitality DNA',
    desc: 'We understand premium hospitality. Built specifically for hotels, corporate offices, cafes, and exclusive suites.',
    icon: Hotel,
  },
  {
    title: 'Seamless Delivery',
    desc: 'You focus on your guests while we handle all the design, production, and on-time delivery across Mumbai & Thane.',
    icon: Zap,
  },
];

export default function TrustPillars() {
  return (
    <Section className="bg-brand-accent text-white py-32" id="why-choose-us">
      <Container>
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="lg:w-1/3 relative lg:sticky lg:top-32 z-10 mb-8 lg:mb-0">
            <MotionWrapper>
              <span className="text-white/20 font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">The Value Proposition</span>
              <Heading level={2} className="text-5xl md:text-6xl font-black tracking-tighter mb-8">
                Why Business <br />Leaders Choose <br /><span className="text-white/40">PureHarvest.</span>
              </Heading>
              <p className="text-white/40 text-xl font-light leading-relaxed max-w-sm">
                We don't just deliver water. We help you make a premium statement that your clients and guests will always remember.
              </p>
            </MotionWrapper>
          </div>

          <div className="lg:w-2/3 grid gap-6">
            {pillars.map((pillar, i) => (
              <MotionWrapper key={i} delay={i * 0.1} className="group">
                <div className="bg-white/[0.02] border border-white/5 hover:border-white/20 p-8 md:p-12 rounded-[32px] transition-all duration-500 hover:bg-white/[0.04]">
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                      <pillar.icon size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight text-white mb-2 uppercase">{pillar.title}</h3>
                      <p className="text-white/40 text-lg font-light leading-relaxed max-w-xl">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
