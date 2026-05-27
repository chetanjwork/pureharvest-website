'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Hero from '@/components/layout/Hero';
import Container from '@/components/ui/Container';
import MotionWrapper from '@/components/motion/MotionWrapper';
import Heading from '@/components/ui/Heading';
import Section from '@/components/ui/Section';
import { motion } from 'framer-motion';

import { useEffect } from 'react';

// Premium Skeleton Component Factory for uniform lazy loading
const SectionSkeleton = ({ title }: { title: string }) => (
  <div className="w-full py-32 flex flex-col items-center justify-center bg-[#F3F4F6] gap-4">
    <div className="w-8 h-8 rounded-full border-2 border-brand-accent border-t-transparent animate-spin" />
    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-accent/40 animate-pulse">
      Loading {title}...
    </span>
  </div>
);

// Dynamic Imports with Skeletons
const Services = dynamic(() => import('@/components/layout/Services'), {
  loading: () => <SectionSkeleton title="Solutions" />
});
const InteractiveConfigurator = dynamic(() => import('@/components/layout/InteractiveConfigurator'), {
  ssr: false,
  loading: () => <SectionSkeleton title="Configurator" />
});
const Purification = dynamic(() => import('@/components/layout/Purification'), {
  loading: () => <SectionSkeleton title="Purification" />
});
const Industries = dynamic(() => import('@/components/layout/Industries'), {
  loading: () => <SectionSkeleton title="Industries" />
});
const Process = dynamic(() => import('@/components/layout/Process'), {
  loading: () => <SectionSkeleton title="Process" />
});
const TrustPillars = dynamic(() => import('@/components/layout/TrustPillars'), {
  loading: () => <SectionSkeleton title="Trust Pillars" />
});
const Portfolio = dynamic(() => import('@/components/layout/Portfolio'), {
  ssr: false, // Disabling SSR for heavy 3D WebGL/Image processing
  loading: () => <SectionSkeleton title="Portfolio Renders" />
});
const FAQ = dynamic(() => import('@/components/layout/FAQ'), {
  loading: () => <SectionSkeleton title="FAQ" />
});

const EnterpriseOnboarding = dynamic(() => import('@/components/layout/EnterpriseOnboarding'), {
  ssr: false,
  loading: () => (
    <div className="py-32 bg-[#F8F9FA] text-center text-brand-accent/40 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
      Loading Enterprise Studio Onboarding...
    </div>
  )
});

export default function Home() {
  useEffect(() => {
    // Force scroll to top on page load/refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Hero />
      
      <Services />

      <Portfolio />

      <InteractiveConfigurator />

      <Purification />

      <Industries />
      
      <Process />

      <TrustPillars />

      <FAQ />

      <EnterpriseOnboarding />

      {/* Premium WhatsApp CTA Section */}
      <Section className="bg-brand-primary relative overflow-hidden py-24">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#25D366]/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 bg-black/[0.02] border border-black/5 backdrop-blur-md rounded-[48px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 group hover:border-black/10 transition-all duration-500"
          >
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                Live Inquiry
              </span>
              <Heading level={2} className="text-brand-accent mb-6 leading-tight">
                Ready to elevate <br />your brand experience?
              </Heading>
              <p className="text-brand-accent/60 text-lg font-medium leading-relaxed">
                Chat with our team for custom design mockups, bulk pricing, and samples — made for your business.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
              <a
                href="https://wa.me/918149174975?text=Hello%20PureHarvest%2C%20I%20am%20interested%20in%20your%20premium%20hydration%20solutions."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-full hover:bg-[#25D366]/90 transition-all shadow-[0_20px_40px_rgba(37,211,102,0.2)] hover:shadow-[0_25px_50px_rgba(37,211,102,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
              <p className="text-brand-accent/40 text-[10px] uppercase tracking-[0.2em] font-bold hidden sm:block">
                Response time <br />{'< 5 mins'}
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>
      
      <footer className="py-20 bg-brand-primary border-t border-black/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-black/[0.02] blur-[100px] rounded-full pointer-events-none" />
        
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-xl">
                  <Image 
                    src="/logo.png" 
                    alt="PureHarvest Logo" 
                    width={48} 
                    height={48} 
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-black tracking-widest uppercase text-brand-accent">PureHarvest</span>
              </div>
              <p className="text-brand-accent/60 text-sm max-w-sm leading-relaxed mb-8 font-medium">
                Premium custom branded water. We deliver custom glass bottles and pure, refreshing water for hotels, offices, cafes, and celebrations.
              </p>
              <div className="text-brand-accent/40 text-[11px] uppercase tracking-[0.2em] font-black">
                GST NO: 27GVMPD4986B1ZA
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-brand-accent font-black text-xs uppercase tracking-[0.3em] text-brand-accent/40">Information</h4>
              <ul className="space-y-5">
                <li><Link href="/faq" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Frequently Asked Qs</Link></li>
                <li><Link href="/privacy" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-brand-accent font-black text-xs uppercase tracking-[0.3em] text-brand-accent/40">Social</h4>
              <ul className="space-y-5">
                <li><a href="https://wa.me/918149174975" target="_blank" rel="noopener noreferrer" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">WhatsApp</a></li>
                <li><a href="https://www.instagram.com/pure_harvest.enterprise" target="_blank" rel="noopener noreferrer" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-brand-accent/30 text-[9px] uppercase tracking-[0.3em] font-black text-center md:text-left leading-relaxed max-w-md">
              © 2026 PureHarvest Enterprises. <br className="md:hidden" />Crafted for Excellence.
            </p>
            <div className="flex gap-4 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
              <span className="text-brand-accent/20 text-[9px] uppercase tracking-[0.3em] font-black">All Rights Reserved</span>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
