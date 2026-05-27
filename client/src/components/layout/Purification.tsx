'use client';

import React, { useState } from 'react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import MotionWrapper from '../motion/MotionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets, Zap, Filter, Wind, FlaskConical,
  Sparkles, Plus, Layers, Shield, RefreshCw,
  Activity, Gauge, ShieldCheck, Check
} from 'lucide-react';

const STAGES = [
  { 
    number: '01', 
    name: 'Reverse Osmosis', 
    abbr: 'RO', 
    purpose: 'Eliminates heavy dissolved solids, chemical trace elements, and mineral scaling at a molecular level.', 
    icon: Filter,
    action: 'Molecular Filtration',
    index: 'IS 14543 Certified',
    taste: 'Neutral & Balanced'
  },
  { 
    number: '02', 
    name: 'UV Treatment', 
    abbr: 'UV', 
    purpose: 'Exposes water to high-intensity ultraviolet sterilisation to destroy 99.99% of biological pathogens.', 
    icon: Zap,
    action: 'Pathogen Eradication',
    index: 'FSSAI Compliant',
    taste: 'Crisp & Sterile'
  },
  { 
    number: '03', 
    name: 'Sand Filtration', 
    abbr: 'SF', 
    purpose: 'Routes water through multi-graded silica sand beds to remove suspended micro-particulate matters.', 
    icon: Layers,
    action: 'Particulate Removal',
    index: 'Zero Turbidity',
    taste: 'Clean & Ultra-Pure'
  },
  { 
    number: '04', 
    name: 'Activated Carbon', 
    abbr: 'AC', 
    purpose: 'Adsorbs free chlorine, organic compound remnants, and neutralises completely any residual odour.', 
    icon: Wind,
    action: 'Organic Adsorption',
    index: 'Chemical Free',
    taste: 'Naturally Sweet'
  },
  { 
    number: '05', 
    name: 'Hardness Remover', 
    abbr: 'HR', 
    purpose: 'Balances calcium and magnesium mineral ratios to soften the water and ensure lightweight ingestion.', 
    icon: Droplets,
    action: 'Mineral Softening',
    index: 'TDS Controlled',
    taste: 'Soft & Velvety'
  },
  { 
    number: '06', 
    name: 'Spring Blend', 
    abbr: 'SB', 
    purpose: 'Calibrates oxygenation and micro-aeration to recreate the premium light character of glacier spring water.', 
    icon: Sparkles,
    action: 'pH Calibration',
    index: 'pH 7.2 Balanced',
    taste: 'Very Refreshing'
  },
  { 
    number: '07', 
    name: 'Added Minerals', 
    abbr: 'AM', 
    purpose: 'Infuses optimal counts of health electrolytes including Calcium, Magnesium, and Potassium.', 
    icon: Plus,
    action: 'Electrolyte Infusion',
    index: 'Calcium Replenished',
    taste: 'Smooth & Mineral-Rich'
  },
  { 
    number: '08', 
    name: 'GAC Polishing', 
    abbr: 'GAC', 
    purpose: 'Polishes water through granular active carbon for a crystal-clear luster and exceptional clarity.', 
    icon: FlaskConical,
    action: 'Polishing Filtration',
    index: 'Turbidity < 0.5 NTU',
    taste: 'Highly Polished'
  },
  { 
    number: '09', 
    name: 'Ozonisation', 
    abbr: 'O₃', 
    purpose: 'Injects active oxygen (ozone) for microbiological sterilization inside the bottle prior to hermetic sealing.', 
    icon: Shield,
    action: 'Sterile Preservation',
    index: 'Microbiologically Safe',
    taste: 'Long-Lasting Freshness'
  },
  { 
    number: '10', 
    name: 'Final RO Pass', 
    abbr: 'RO+', 
    purpose: 'A final high-velocity double check RO filtration ensuring absolute standard batch consistency.', 
    icon: RefreshCw,
    action: 'Quality Safeguard',
    index: 'IS 14543 Double Safe',
    taste: 'Perfect Hydration'
  },
];

export default function Purification() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Keep first stage open by default as a visual hint

  return (
    <Section 
      className="bg-[#F8F9FA] text-brand-accent py-20 sm:py-32 border-t border-black/[0.04] relative overflow-hidden scroll-mt-24 sm:scroll-mt-32" 
      id="purification"
    >
      
      {/* Absolute Dynamic Grid Mesh (Brand Accent Linked) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,33,71,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,33,71,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      <Container className="relative z-10">

        {/* ── Section Header ── */}
        <div className="mb-12 sm:mb-16 text-center lg:text-left">
          <MotionWrapper>
            <span className="text-brand-secondary font-black tracking-[0.35em] uppercase text-[9px] mb-4 block">
              Water Science
            </span>
          </MotionWrapper>
          <MotionWrapper delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              10-Stage<br />
              <span className="text-brand-accent/25">Purification Science</span>
            </h2>
          </MotionWrapper>
          <MotionWrapper delay={0.15}>
            <p className="text-brand-accent/50 text-sm sm:text-base font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Every drop of PureHarvest water undergoes ten rigorous molecular filtration steps. The complete specs sheet and official certifications are indexed below.
            </p>
          </MotionWrapper>
        </div>

        {/* ── B2B Purity Checkpoints (Scannable Executive Summary) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 relative z-10">
          <MotionWrapper delay={0.1}>
            <div className="bg-white/95 md:bg-white/40 md:backdrop-blur-md border border-black/[0.04] p-5 sm:p-6 rounded-2xl flex gap-4 hover:bg-white hover:border-brand-secondary/15 hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/5 border border-brand-secondary/15 flex items-center justify-center text-brand-secondary shrink-0">
                <Check size={18} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-brand-accent mb-1">Biological Sterility</h4>
                <p className="text-[11px] text-brand-accent/50 leading-relaxed font-semibold">Dual high-intensity UV sterilisation and active ozone packaging ensures 100% germ-free hydration.</p>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.15}>
            <div className="bg-white/95 md:bg-white/40 md:backdrop-blur-md border border-black/[0.04] p-5 sm:p-6 rounded-2xl flex gap-4 hover:bg-white hover:border-brand-secondary/15 hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/5 border border-brand-secondary/15 flex items-center justify-center text-brand-secondary shrink-0">
                <Check size={18} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-brand-accent mb-1">Mineral Balance (7.2 pH)</h4>
                <p className="text-[11px] text-brand-accent/50 leading-relaxed font-semibold">Optimal TDS calibration infused with healthy Calcium, Magnesium, and Potassium electrolytes.</p>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <div className="bg-white/95 md:bg-white/40 md:backdrop-blur-md border border-black/[0.04] p-5 sm:p-6 rounded-2xl flex gap-4 hover:bg-white hover:border-emerald-500/15 hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] shrink-0">
                <Check size={18} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-brand-accent mb-1">FSSAI & BIS Compliant</h4>
                <p className="text-[11px] text-brand-accent/50 leading-relaxed font-semibold">Fully certified under mandatory national IS 14543 water codes for legal B2B procurement.</p>
              </div>
            </div>
          </MotionWrapper>
        </div>

        {/* ── DESKTOP: Laboratory Specifications Table ── */}
        <div className="hidden lg:block w-full overflow-hidden bg-white/95 md:bg-white/60 md:backdrop-blur-md border border-black/[0.03] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/[0.05] bg-black/[0.01]">
                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-wider text-brand-accent/50 w-[80px]">Stage</th>
                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-wider text-brand-accent/50 w-[240px]">Process Name</th>
                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-wider text-brand-accent/50 w-[200px]">Primary Action</th>
                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-wider text-brand-accent/50 w-[200px]">Purity Rating</th>
                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-wider text-brand-accent/50 w-[180px]">Taste Profile</th>
                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-wider text-brand-accent/50 w-[60px] text-right"></th>
              </tr>
            </thead>
            <tbody>
              {STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                const isExpanded = expandedIndex === idx;
                return (
                  <React.Fragment key={stage.number}>
                    <tr 
                      onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                      className={`border-b border-black/[0.02] last:border-none transition-all duration-300 cursor-pointer hover:bg-black/[0.01] ${
                        isExpanded ? 'bg-black/[0.005]' : ''
                      }`}
                    >
                      <td className="py-4 px-8 text-xs font-semibold text-brand-accent/30 tabular-nums">{stage.number}</td>
                      <td className="py-4 px-8">
                        <div className="flex items-center gap-3.5">
                          <div className="w-8 h-8 rounded-xl bg-[#F8F9FA] md:bg-black/[0.02] border border-black/5 flex items-center justify-center text-brand-accent/50 shrink-0">
                            <Icon size={13} strokeWidth={1.8} />
                          </div>
                          <span className="text-xs font-bold text-brand-accent">
                            {stage.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-8 text-xs font-semibold text-brand-accent/50">{stage.action}</td>
                      <td className="py-4 px-8">
                        <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#F8F9FA] md:bg-black/[0.02] text-brand-accent/65 border border-black/5">
                          {stage.index}
                        </span>
                      </td>
                      <td className="py-4 px-8 text-xs font-bold text-brand-accent/70">{stage.taste}</td>
                      <td className="py-4 px-8 text-right text-brand-accent/20 font-black">
                        <span className={`inline-block transition-transform duration-300 ${isExpanded ? 'rotate-90 text-brand-secondary' : ''}`}>→</span>
                      </td>
                    </tr>
                    {/* Collapsible details row */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={6} className="p-0 bg-black/[0.005]">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden border-b border-black/[0.02]"
                          >
                            <div className="px-16 py-6 text-xs font-semibold leading-relaxed text-brand-accent/50 flex items-start gap-4">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary mt-1.5 shrink-0 animate-pulse" />
                              <p className="max-w-3xl">{stage.purpose}</p>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── MOBILE & TABLET: Micro-Accordion Specifications Index ── */}
        <div className="lg:hidden w-full flex flex-col gap-2.5 relative z-10">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isExpanded = expandedIndex === idx;
            return (
              <div 
                key={stage.number}
                className={`bg-white/95 md:bg-white/60 md:backdrop-blur-md border border-black/[0.03] rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'bg-white shadow-[0_12px_30px_rgba(0,0,0,0.03)] border-black/10' : ''
                }`}
              >
                {/* Mobile Header Row */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between py-3.5 px-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold text-brand-accent/30 tabular-nums w-4">{stage.number}</span>
                    <div className="w-7 h-7 rounded-lg bg-[#F8F9FA] md:bg-black/[0.02] border border-black/5 flex items-center justify-center text-brand-accent/50 shrink-0">
                      <Icon size={12} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-brand-accent leading-none">
                        {stage.name}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F8F9FA] md:bg-black/[0.02] text-brand-accent/60 border border-black/5 shrink-0 leading-none">
                      {stage.index.replace(' Certified', '').replace(' Compliant', '').replace(' Double Safe', '')}
                    </span>
                    <span className={`text-[10px] text-brand-accent/30 transition-transform duration-300 font-bold shrink-0 ${isExpanded ? 'rotate-90 text-brand-secondary' : ''}`}>
                      →
                    </span>
                  </div>
                </button>

                {/* Collapsible Mobile Content */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-black/[0.02] bg-black/[0.005]">
                      <p className="text-[11px] font-semibold leading-relaxed text-brand-accent/50 mb-3.5 pl-7">
                        {stage.purpose}
                      </p>
                      
                      {/* Compact parameters using standard Tailwind spacing */}
                      <div className="grid grid-cols-3 gap-2 pl-7">
                        <div className="bg-black/[0.015] border border-black/[0.03] rounded-xl p-3 flex flex-col justify-between">
                          <span className="text-[6px] font-bold uppercase tracking-widest text-brand-accent/30 block mb-0.5">Action</span>
                          <span className="text-[8px] font-black text-brand-accent/75 uppercase truncate">{stage.action}</span>
                        </div>
                        <div className="bg-black/[0.015] border border-black/[0.03] rounded-xl p-3 flex flex-col justify-between">
                          <span className="text-[6px] font-bold uppercase tracking-widest text-brand-accent/30 block mb-0.5">Standard</span>
                          <span className="text-[8px] font-black text-brand-accent/75 uppercase truncate">{stage.index}</span>
                        </div>
                        <div className="bg-black/[0.015] border border-black/[0.03] rounded-xl p-3 flex flex-col justify-between">
                          <span className="text-[6px] font-bold uppercase tracking-widest text-brand-accent/30 block mb-0.5">Taste</span>
                          <span className="text-[8px] font-black text-brand-accent/75 uppercase truncate">{stage.taste}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>


        {/* ── Bottom Certification Divider ── */}
        <MotionWrapper delay={0.3} className="mt-16 sm:mt-20 pt-12 border-t border-black/[0.04] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-brand-accent/20 text-[9px] font-black uppercase tracking-[0.35em] text-center md:text-left">
            PureHarvest Water Science Division · Certified Quality Control
          </p>
          <div className="flex gap-4">
            <span className="text-brand-accent/20 text-[9px] font-black uppercase tracking-[0.25em] bg-[#F8F9FA] md:bg-black/[0.02] border border-black/[0.04] px-3 py-1 rounded-full">
              FSSAI Standard
            </span>
            <span className="text-brand-accent/20 text-[9px] font-black uppercase tracking-[0.25em] bg-[#F8F9FA] md:bg-black/[0.02] border border-black/[0.04] px-3 py-1 rounded-full">
              BIS Standard
            </span>
          </div>
        </MotionWrapper>

      </Container>
    </Section>
  );
}
