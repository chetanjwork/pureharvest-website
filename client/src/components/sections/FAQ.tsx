'use client';

import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Container from '../ui/Container';
import Section from '../ui/Section';

export default function FAQ() {
  return (
    <Section className="bg-[#F8F9FA] py-16 md:py-20 lg:py-24 border-t border-black/4 relative overflow-hidden" id="faq">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(0,102,255,0.015)_0%,_transparent_60%)]" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          
          {/* Tagline */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F9FA] md:bg-black/2 border border-black/4 text-brand-secondary text-2.25 font-black uppercase tracking-[0.25em] mb-6"
          >
            <HelpCircle size={10} className="text-brand-secondary" />
            Knowledge Base
          </motion.span>
          
          {/* Headings */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] text-brand-accent mb-6"
          >
            Got Questions?<br />
            <span className="text-brand-accent/20">We&apos;ve Got Answers.</span>
          </motion.h2>
          
          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-accent/50 text-sm sm:text-base font-semibold leading-relaxed max-w-lg mb-10"
          >
            Read our comprehensive, structured guides covering water purification chemistry, luxury glass bottle packaging options, ordering logistics, and fast delivery timelines.
          </motion.p>
          
          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary redirect to FAQ page */}
            <Link
              href="/faq"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-accent text-white font-black uppercase tracking-widest text-2.25 px-10 py-5 rounded-full hover:bg-brand-accent/90 transition-all hover:scale-105 active:scale-95 shadow-[0_8px_30pxrgba(11,33,71,0.12)] cursor-pointer"
            >
              Explore FAQ Library
              <ArrowRight size={12} strokeWidth={2.5} />
            </Link>
            
            {/* Secondary WhatsApp concierge inquiry */}
            <a
              href="https://wa.me/918149174975?text=Hi%20PureHarvest%2C%20I%20have%20a%20question%20about%20your%20branded%20water%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white border border-black/6 text-brand-accent font-black uppercase tracking-widest text-2.25 px-8 py-4.5 rounded-full hover:border-black/20 hover:bg-black/1 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageSquare size={13} fill="currentColor" stroke="none" className="text-[#25D366]" />
              Ask on WhatsApp
            </a>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
