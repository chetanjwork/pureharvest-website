'use client';

import Container from '../ui/Container';
import Section from '../ui/Section';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel, Coffee, Gem, Briefcase, UtensilsCrossed, ArrowUpRight, MessageCircle } from 'lucide-react';
import ScrollTextReveal from '../motion/ScrollTextReveal';
import Heading from '../ui/Heading';

const industries = [
  {
    id: 'hotels',
    label: 'Hotels',
    Icon: Hotel,
    color: 'from-[#0A1128] to-[#030612]',
    iconColor: '#D4AF37', // Refined Gold
    headline: 'Imperial Hotel Standard',
    description: 'Establish a presence that lingers. Custom-etched PureHarvest vessels designed for the world’s most prestigious suites and fine-dining environments.',
    stat: 'Elite',
    statLabel: 'Hospitality',
    tags: ['Royal Suites', 'Concierge', 'Michelin Star'],
    waMessage: 'Hi PureHarvest! I am interested in premium custom branded water bottles for our luxury hotel/resort suites.'
  },
  {
    id: 'cafes',
    label: 'Cafés',
    Icon: Coffee,
    color: 'from-[#3A2218] to-[#1A0C05]',
    iconColor: '#D29C6B', // Warm Latte/Bronze
    headline: 'Signature Café Identity',
    description: 'Craft a narrative on every table. PureHarvest vessels provide the final touch of artisanal excellence for world-class roasteries and boutique cafés.',
    stat: '3×',
    statLabel: 'Visual Impact',
    tags: ['Artisanal Brew', 'Boutique Service', 'Signature Est.'],
    waMessage: 'Hi PureHarvest! I would love to get a quote and mockups for custom branded bottles for our cafe/roastery.'
  },
  {
    id: 'weddings',
    label: 'Weddings',
    Icon: Gem,
    color: 'from-[#2A1017] to-[#12050A]',
    iconColor: '#E2A9B6', // Refined Rose Gold
    headline: 'Unforgettable Celebrations',
    description: 'Make every detail count. Custom PureHarvest bottles at wedding tables become cherished keepsakes for your guests.',
    stat: '100%',
    statLabel: 'Personalized',
    tags: ['Custom Label', 'Guest Gifts', 'Premium'],
    waMessage: 'Hi PureHarvest! I am interested in custom branded water bottles for an upcoming wedding/celebration.'
  },
  {
    id: 'corporate',
    label: 'Corporate',
    Icon: Briefcase,
    color: 'from-[#0A1222] to-[#030712]',
    iconColor: '#8E9EAF', // Refined Silver
    headline: 'Corporate Brand Statement',
    description: 'From boardroom meetings to summit events - branded water communicates attention to detail and corporate excellence.',
    stat: 'Fortune',
    statLabel: '500 Ready',
    tags: ['Events', 'Boardrooms', 'Conferences'],
    waMessage: 'Hi PureHarvest! We would like to inquire about branded custom water bottles for our corporate boardrooms and corporate events.'
  },
  {
    id: 'restaurants',
    label: 'Restaurants',
    Icon: UtensilsCrossed,
    color: 'from-[#052219] to-[#010C09]',
    iconColor: '#639C8A', // Refined Jade
    headline: 'Fine Dining Standards',
    description: 'Complement your menu with a water experience that matches your culinary vision. Premium bottles that fit seamlessly into your story.',
    stat: 'Premium',
    statLabel: 'Table Setting',
    tags: ['Fine Dining', 'Artisanal', 'Tasting Menu'],
    waMessage: 'Hi PureHarvest! I am interested in premium custom branded water bottles to elevate our restaurant table settings.'
  },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];
  const CurrentIcon = current.Icon;

  return (
    <Section className="bg-brand-primary text-brand-accent py-24" id="industries">
      <Container>
        <div className="text-center mb-16">
          <span className="text-brand-accent/40 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Who We Serve</span>
          <Heading level={2} className="text-brand-accent mb-6">
            Elite Industries We Serve <br />with Custom Branded Water
          </Heading>
          <p className="text-brand-accent/60 text-lg font-medium max-w-2xl mx-auto">
            From luxury hospitality suites to global corporate headquarters, we codify brand excellence through premium hydration solutions.
          </p>
        </div>

        {/* Tab Switcher - Apple Style Segmented Control */}
        <div className="flex justify-center mb-14 px-6">
          <div className="flex gap-2 p-1.5 bg-[#F8F9FA] md:bg-black/[0.03] border border-black/[0.05] rounded-full overflow-x-auto no-scrollbar shadow-inner">
            {industries.map((ind, i) => (
              <button
                key={ind.id}
                onClick={() => setActive(i)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                  active === i ? 'text-brand-accent' : 'text-brand-accent/40 hover:text-brand-accent/70'
                }`}
              >
                <ind.Icon size={14} className="relative z-10" />
                <span className="relative z-10">{ind.label}</span>
                {active === i && (
                  <motion.div
                    layoutId="activeTabIndustry"
                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-black/[0.04]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`grid lg:grid-cols-2 gap-12 items-center border border-white/[0.05] rounded-[48px] p-10 md:p-16 bg-gradient-to-br ${current.color} shadow-2xl relative overflow-hidden`}
          >
            {/* Dark glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div 
                  className={`w-12 h-12 rounded-[14px] bg-white/[0.03] shadow-inner border border-white/[0.1] flex items-center justify-center`}
                  style={{ color: current.iconColor }}
                >
                  <CurrentIcon size={22} strokeWidth={2} />
                </div>
                <span className="text-[11px] uppercase tracking-widest text-white/50 font-bold">{current.label}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-[1.1] tracking-tight">{current.headline}</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10 font-medium">{current.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-12">
                {current.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 text-[10px] uppercase tracking-[0.2em] font-bold shadow-sm backdrop-blur-md">{tag}</span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={`https://wa.me/918149174975?text=${encodeURIComponent(current.waMessage)}`}
                  target="_blank"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <MessageCircle size={16} />
                  Initiate Quote
                </a>
                <button
                  onClick={() => document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
                >
                  Request Samples
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
            
            {/* Minimal Stat Display (Dark Premium Widget Style) */}
            <div className="flex justify-center lg:justify-end relative z-10">
              <div className="relative w-full max-w-[340px] aspect-square rounded-[40px] bg-white/[0.02] border border-white/[0.06] shadow-2xl md:backdrop-blur-3xl flex flex-col items-center justify-center p-8 overflow-hidden">
                <div 
                  className={`relative z-10 w-24 h-24 rounded-[24px] bg-white/[0.03] shadow-inner border border-white/[0.1] flex items-center justify-center mb-8`}
                  style={{ color: current.iconColor }}
                >
                  <CurrentIcon size={40} strokeWidth={1.5} />
                </div>
                <div className="relative z-10 text-center">
                  <div className="text-5xl font-heading font-black text-white tracking-tighter">{current.stat}</div>
                  <div className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-bold mt-4">{current.statLabel}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </Container>
    </Section>
  );
}
