'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import MotionWrapper from '@/components/motion/MotionWrapper';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Shield, Lock, Eye, Mail, MapPin, ArrowRight, ShieldCheck, Globe2 } from 'lucide-react';

const sections = [
  { id: 'collect', title: 'Information We Collect', icon: Eye },
  { id: 'usage', title: 'How We Use Your Information', icon: Shield },
  { id: 'sharing', title: 'Information Sharing', icon: Lock },
  { id: 'contact', title: 'Contact Us', icon: Mail },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('collect');
  const lenis = useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -120, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        const offset = 120;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <main className="min-h-screen bg-brand-primary text-brand-accent pt-40 pb-32 selection:bg-brand-accent selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-black/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/[0.01] blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[300px_1fr] gap-24 items-start">
          
          {/* ── Sidebar Navigation ── */}
          <aside className="hidden lg:block sticky top-40">
            <MotionWrapper direction="right">
              <div className="space-y-1 mb-12">
                <span className="text-brand-accent/40 text-[10px] uppercase tracking-[0.5em] font-black block mb-8">
                  Data Governance
                </span>
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className="group relative flex items-center gap-6 w-full py-4 text-left transition-all cursor-pointer outline-none"
                  >
                    <div className={`w-1 h-1 rounded-full transition-all duration-500 ${
                      activeSection === sec.id ? 'bg-brand-accent scale-[2.5] shadow-[0_0_10px_rgba(0,0,0,0.1)]' : 'bg-black/10 group-hover:bg-black/40'
                    }`} />
                    <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                      activeSection === sec.id ? 'text-brand-accent' : 'text-brand-accent/40 group-hover:text-brand-accent/70 group-hover:translate-x-2'
                    }`}>
                      {sec.title}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-8 rounded-[24px] bg-black/[0.02] border border-black/5 backdrop-blur-3xl space-y-6 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-500 cursor-default">
                <div className="w-10 h-10 rounded-2xl bg-black/[0.03] border border-black/10 flex items-center justify-center text-brand-accent/40">
                  <Lock size={18} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent/80 mb-2">Enterprise Privacy</p>
                  <p className="text-xs text-brand-accent/50 leading-relaxed font-medium">
                    Your corporate data is handled with the highest level of institutional confidentiality.
                  </p>
                </div>
              </div>
            </MotionWrapper>
          </aside>

          {/* ── Main Content Area ── */}
          <div className="relative">
            <MotionWrapper>
              <div className="flex items-center gap-4 mb-8">
                <span className="px-3 py-1.5 rounded-full bg-brand-accent text-white text-[9px] font-bold uppercase tracking-[0.2em]">
                  Privacy Directive
                </span>
                <span className="text-brand-accent/40 text-[9px] font-bold uppercase tracking-[0.2em]">
                  v2.0 / 2026
                </span>
              </div>
              <Heading level={1} className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 uppercase">
                Privacy Policy
              </Heading>
              <p className="text-brand-accent/60 text-lg font-medium mb-20 max-w-xl leading-relaxed">
                Our commitment to the integrity and security of your corporate information.
              </p>
            </MotionWrapper>

            <div className="space-y-40 pb-32">
              {/* Section 1 */}
              <div id="collect" className="scroll-mt-40 group">
                <MotionWrapper>
                  <div className="flex items-center gap-6 mb-10 border-b border-black/5 pb-6">
                    <span className="text-brand-accent/10 text-3xl font-black tracking-tighter opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500">01</span>
                    <h2 className="text-2xl font-bold tracking-tight text-brand-accent uppercase group-hover:translate-x-2 transition-all duration-500">Collection</h2>
                  </div>
                  <div className="lg:pl-16 space-y-6 text-brand-accent/60 text-base md:text-lg font-medium leading-[1.8] max-w-3xl">
                    <p className="hover:text-brand-accent/80 transition-colors duration-300">
                      At PureHarvest Enterprises, we collect information that you provide directly to us when you use our website, inquire about our corporate hydration solutions, or contact our customer support.
                    </p>
                    <p className="hover:text-brand-accent/80 transition-colors duration-300">
                      This includes your name, email address, phone number, and company name. We treat all corporate data as a high-security asset.
                    </p>
                  </div>
                </MotionWrapper>
              </div>

              {/* Section 2 */}
              <div id="usage" className="scroll-mt-40 group">
                <MotionWrapper>
                  <div className="flex items-center gap-6 mb-10 border-b border-black/5 pb-6">
                    <span className="text-brand-accent/10 text-3xl font-black tracking-tighter opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500">02</span>
                    <h2 className="text-2xl font-bold tracking-tight text-brand-accent uppercase group-hover:translate-x-2 transition-all duration-500">Utilization</h2>
                  </div>
                  <div className="lg:pl-16 space-y-6 text-brand-accent/60 text-base md:text-lg font-medium leading-[1.8] max-w-3xl">
                    <p className="hover:text-brand-accent/80 transition-colors duration-300">
                      We use the information we collect to provide, maintain, and improve our services, process your inquiries, and communicate with you about products, services, offers, and events offered by PureHarvest.
                    </p>
                  </div>
                </MotionWrapper>
              </div>

              {/* Section 3 */}
              <div id="sharing" className="scroll-mt-40 group">
                <MotionWrapper>
                  <div className="flex items-center gap-6 mb-10 border-b border-black/5 pb-6">
                    <span className="text-brand-accent/10 text-3xl font-black tracking-tighter opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500">03</span>
                    <h2 className="text-2xl font-bold tracking-tight text-brand-accent uppercase group-hover:translate-x-2 transition-all duration-500">Sharing</h2>
                  </div>
                  <div className="lg:pl-16 space-y-6 text-brand-accent/60 text-base md:text-lg font-medium leading-[1.8] max-w-3xl">
                    <p className="hover:text-brand-accent/80 transition-colors duration-300">
                      We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.
                    </p>
                  </div>
                </MotionWrapper>
              </div>

              {/* Section 4 */}
              <div id="contact" className="scroll-mt-40 group">
                <MotionWrapper>
                  <div className="flex items-center gap-6 mb-10 border-b border-black/5 pb-6">
                    <span className="text-brand-accent/10 text-3xl font-black tracking-tighter opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500">04</span>
                    <h2 className="text-2xl font-bold tracking-tight text-brand-accent uppercase group-hover:translate-x-2 transition-all duration-500">Contact</h2>
                  </div>
                  <div className="lg:pl-16 space-y-10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-[24px] bg-black/[0.01] border border-black/5 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-500 cursor-pointer group/card">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent/40 mb-6 group-hover/card:text-brand-accent/60 transition-colors">Email Line</p>
                        <p className="text-lg font-bold text-brand-accent/80">pureharvestenterprise@gmail.com</p>
                      </div>
                      <div className="p-8 rounded-[24px] bg-black/[0.01] border border-black/5 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-500 cursor-pointer group/card">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent/40 mb-6 group-hover/card:text-brand-accent/60 transition-colors">Headquarters</p>
                        <p className="text-lg font-bold text-brand-accent/80 leading-snug">Badlapur East, Maharashtra</p>
                      </div>
                    </div>
                  </div>
                </MotionWrapper>
              </div>
            </div>

            {/* ── Authority Signature ── */}
            <MotionWrapper delay={0.2} className="mt-20 pt-20 border-t border-black/5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-white font-black text-lg mb-8 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:scale-110 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-pointer">
                P
              </div>
              <h3 className="text-lg font-bold tracking-[0.2em] uppercase mb-2 text-brand-accent">PureHarvest</h3>
              <p className="text-brand-accent/40 text-[9px] font-bold uppercase tracking-[0.3em] mb-10">An Enterprise of Distinction</p>
              
              <div className="flex items-center gap-6 text-brand-accent/40 text-[9px] font-bold uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2 hover:text-brand-accent transition-colors cursor-pointer">
                  <Globe2 size={12} />
                  Global Operations
                </div>
                <div className="w-1 h-1 rounded-full bg-black/10" />
                <div className="flex items-center gap-2 hover:text-brand-accent transition-colors cursor-pointer">
                  <ShieldCheck size={12} />
                  Legally Encrypted
                </div>
              </div>
              
              <button 
                onClick={() => lenis ? lenis.scrollTo(0, { duration: 1.5 }) : window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-20 group flex flex-col items-center gap-4 text-brand-accent/30 hover:text-brand-accent transition-all cursor-pointer"
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Back to Top</span>
                <div className="w-px h-8 bg-gradient-to-b from-black/20 to-transparent group-hover:h-12 group-hover:bg-brand-accent/40 transition-all duration-500" />
              </button>
            </MotionWrapper>
          </div>
        </div>
      </Container>
    </main>
  );
}
