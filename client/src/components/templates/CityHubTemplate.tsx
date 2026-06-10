'use client';

import { motion } from 'framer-motion';
import { Truck, Zap, Phone, MessageCircle } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';
import { SectionLabel } from '@/components/ui/SectionLabel';
import React from 'react';

export interface CityHubData {
  city: string;
  stats: { value: string; label: string }[];
  marketOverview: {
    icon: React.ElementType;
    title: string;
    body: string;
  }[];
  marketIcon: React.ElementType;
  marketHeading: React.ReactNode;
  marketDesc: string;
  industries: {
    icon: React.ElementType;
    title: string;
    desc: string;
    bg: string;
    border: string;
    accent: string;
  }[];
  industryIcon: React.ElementType;
  industryHeading: React.ReactNode;
  locations: {
    area: string;
    focus: string;
    delivery: string;
  }[];
  locationIcon: React.ElementType;
  locationHeading: React.ReactNode;
  qaData: {
    q: string;
    a: string;
  }[];
  ctaHeading: React.ReactNode;
  ctaDesc: string;
}

export default function CityHubTemplate({ data }: { data: CityHubData }) {
  const { city, stats, marketOverview, marketIcon, marketHeading, marketDesc, industries, industryIcon, industryHeading, locations, locationIcon, locationHeading, qaData, ctaHeading, ctaDesc } = data;

  return (
    <>
      <section className="bg-brand-accent py-7 md:py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-brand-secondary text-2xl md:text-3xl font-black leading-none mb-1">{s.value}</span>
              <span className="text-white/55 text-[10px] uppercase tracking-[0.25em] font-bold">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white" aria-labelledby="market-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-14">
            <SectionLabel icon={marketIcon} label={`${city} Market`} />
            <h2 id="market-heading" className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight leading-[1.05] mb-5">
              {marketHeading}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {marketDesc}
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {marketOverview.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="bg-gray-50 border border-gray-100 rounded-3xl p-7 md:p-8 h-full hover:shadow-md transition-shadow">
                    <div className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-brand-secondary mb-5">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-brand-accent mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.body}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F8F9FA]" aria-labelledby="industries-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-14">
            <SectionLabel icon={industryIcon} label="Industries We Serve" />
            <h2 id="industries-heading" className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight leading-[1.05] mb-5">
              {industryHeading}
            </h2>
          </FadeIn>
          <div className={`grid sm:grid-cols-2 md:grid-cols-${industries.length === 3 ? '3' : '4'} gap-5`}>
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className={`${ind.bg} border ${ind.border} rounded-3xl p-6 h-full flex flex-col hover:shadow-lg transition-all duration-300`}>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                      <Icon size={18} strokeWidth={1.5} className={ind.accent} />
                    </div>
                    <h3 className="text-base font-black text-brand-accent mb-2 tracking-tight">{ind.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">{ind.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white" aria-labelledby="locations-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-14">
            <SectionLabel icon={locationIcon} label="Coverage Map" />
            <h2 id="locations-heading" className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight leading-[1.05] mb-5">
              {locationHeading}
            </h2>
          </FadeIn>
          <div className={`grid sm:grid-cols-2 md:grid-cols-${locations.length <= 4 ? '4' : '3'} gap-5`}>
            {locations.map((loc, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="border border-gray-100 rounded-2xl p-6 hover:border-brand-secondary/30 hover:shadow-md transition-all duration-300 bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-brand-accent text-base tracking-tight mb-2">{loc.area}</h3>
                    <div className="flex items-center gap-1.5 mb-2 text-brand-secondary text-xs font-bold uppercase">
                      <Truck size={12} /> {loc.delivery}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{loc.focus}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <FadeIn className="mb-12">
            <SectionLabel icon={Zap} label={`${city} Quick Answers`} />
            <h2 className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-4">
              {city} Logistics & Ordering
            </h2>
          </FadeIn>
          <div className="space-y-5">
            {qaData.map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-black text-brand-accent text-sm md:text-base mb-3 flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-brand-secondary/10 text-brand-secondary text-xs flex items-center justify-center font-black mt-0.5">Q</span>
                    {item.q}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed pl-9">{item.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-22 bg-brand-accent" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <h2 id="cta-heading" className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              {ctaHeading}
            </h2>
            <p className="text-white/65 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              {ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a
                href={`https://wa.me/918149174975?text=Hi%20PureHarvest!%20I'm%20interested%20in%20custom%20branded%20water%20bottles%20for%20delivery%20in%20${city}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:opacity-90 active:scale-95 transition-all shadow-xl"
              >
                <MessageCircle size={18} strokeWidth={2} />
                WhatsApp For Quote
              </a>
              <a
                href="tel:+918149174975"
                className="flex items-center gap-3 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white/20 active:scale-95 transition-all"
              >
                <Phone size={16} strokeWidth={2} />
                +91 81491 74975
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-5 text-white/40 text-[10px] uppercase tracking-[0.25em] font-black">
              <span>BIS Approved</span>
              <span>·</span>
              <span>FSSAI Certified</span>
              <span>·</span>
              <span>GST: 27GVMPD4986B1ZA</span>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
