'use client';

import { motion } from 'framer-motion';
import {
  GlassWater, Star, ShieldCheck, Clock, Building2, CheckCircle2,
  ChevronRight, Phone, MessageCircle, Info, Award, Droplets, Zap
} from 'lucide-react';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon size={14} className="text-brand-secondary" strokeWidth={2.5} />
      <span className="text-brand-secondary text-xs font-black uppercase tracking-[0.3em]">{label}</span>
    </div>
  );
}

const HOTEL_FEATURES = [
  { icon: GlassWater, title: 'Borosilicate Glass', desc: 'Shatter-resistant, high-grade glass designed for heavy rotation in hotel room service and housekeeping.' },
  { icon: Star, title: 'Logo Etching & Labels', desc: 'Permanent etching of your hotel crest or full-colour waterproof labels that survive ice buckets.' },
  { icon: ShieldCheck, title: 'BIS & FSSAI Certified', desc: 'Every bottle meets India\'s highest food-safety standards. Zero regulatory risk for your F&B director.' },
  { icon: Clock, title: '24–48 hr Mumbai Delivery', desc: 'Direct supply chain from our Badlapur facility to South Mumbai, BKC, Juhu, and Powai properties.' },
];

const HOTEL_USE_CASES = [
  { title: 'In-Room Amenity', desc: 'A beautifully branded glass bottle on the nightstand replaces cheap PET plastic, turning a routine amenity into a memorable luxury touchpoint. Guests frequently photograph these and share them on Instagram.' },
  { title: 'Banquet & Conference (MICE)', desc: 'Branded bottles at banquets and conferences carry your hotel\'s identity through every corporate meeting and gala dinner held at your property. It reinforces to event organisers that they are at a premium venue.' },
  { title: 'In-House F&B & Restaurants', desc: 'Your hotel\'s in-house restaurants can replace generic mineral water with a premium custom-label bottle that reinforces the overall dining concept and justifies premium table water pricing.' },
  { title: 'VIP Welcome Gifting', desc: 'Include a custom-etched PureHarvest bottle in welcome kits for VIP guests, honeymooners, and loyalty programme members. It serves as a premium keepsake.' },
];

const ROI_COMPARISON = [
  { factor: 'Guest Perception', generic: 'Viewed as a cheap commodity. No brand lift.', custom: 'Perceived as a high-value, curated luxury amenity.' },
  { factor: 'Sustainability ESG', generic: 'Negative impact (single-use plastic).', custom: 'Positive impact (100% reusable glass, FSC labels).' },
  { factor: 'Social Media Value', generic: 'Zero shares.', custom: 'High organic visibility when guests photograph rooms.' },
  { factor: 'Cost vs Impact', generic: 'Low cost, zero impact.', custom: 'Marginal cost increase, massive brand equity lift.' },
];

const HOTEL_QA = [
  { q: 'How do custom water bottles improve the guest experience in Mumbai hotels?', a: 'Custom glass water bottles elevate the first impression of a hotel room. When a guest arrives in a luxury suite in Colaba or a business hotel in BKC, finding a bespoke glass bottle with the hotel\'s crest signals an uncompromising commitment to quality. It replaces the cheap, commoditized feel of plastic with a premium, tactile experience.' },
  { q: 'What are the FSSAI compliance requirements for hotel water in Maharashtra?', a: 'Hotels in Maharashtra must serve water that is either filtered in-house through an approved RO system (which lacks branding and consistent quality control) or use FSSAI-licensed packaged drinking water. PureHarvest provides fully compliant, BIS-certified water (FSSAI License: 22724024000854), removing all compliance burdens from the hotel\'s F&B department.' },
  { q: 'Can we order different bottle sizes for different hotel areas?', a: 'Yes. A common strategy for Mumbai properties is using 500ml Signature Glass bottles for in-room nightstands, 750ml Classic Glass for in-house fine dining restaurants, and 300ml PET or Glass for large-scale banquets and MICE events.' },
  { q: 'How does the recurring supply model work for hotels?', a: 'We set up auto-replenishment contracts based on your hotel\'s occupancy rates and banquet schedules. Bottles are dispatched on a weekly or bi-weekly schedule to ensure you never run out, with buffer stock built-in for peak wedding season or unexpected large conferences.' },
  { q: 'Are glass bottles safe for hotel poolside use?', a: 'While our borosilicate glass is shatter-resistant, many hotels prefer to use our premium custom-labeled PET bottles specifically for poolside and gym areas to adhere to strict "no-glass" safety policies in wet zones. We provide both options under one unified branding umbrella.' }
];

const MUMBAI_HOTEL_FAQS = [
  { q: 'What is the minimum order quantity (MOQ) for hotels?', a: 'The MOQ is 500 units. This low threshold is perfect for boutique hotels in Juhu or Bandra to pilot the program, while large 5-star properties typically order in volumes of 5,000+ units.' },
  { q: 'How long does it take to get a new custom design delivered?', a: 'Initial setup and label printing take 5-7 business days. Logo etching takes 10-14 days. Subsequent reorders are delivered within 24-48 hours across Mumbai.' },
  { q: 'Can you match our hotel\'s Pantone colours on the label?', a: 'Absolutely. We use high-fidelity digital and offset printing to ensure your brand guidelines, including specific Pantone (PMS) colours, are perfectly matched on every label.' },
  { q: 'What happens to empty glass bottles?', a: 'Our glass bottles are 100% recyclable. Many hotels integrate them into their own recycling programs, or guests take them home as premium keepsakes.' },
  { q: 'Do you supply to hotels outside Mumbai?', a: 'Yes. While this page focuses on our Mumbai supply chain, we deliver to hotels across Maharashtra, including Pune, Lonavala, Mahabaleshwar, Alibaug, and Nashik.' },
];

export default function MumbaiHotelsContent() {
  return (
    <>
      <section className="py-20 md:py-28 bg-white" aria-labelledby="hotel-features-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-14">
            <SectionLabel icon={Building2} label="Hospitality Series" />
            <h2 id="hotel-features-heading" className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight leading-[1.05] mb-5">
              Premium Water Branding <br className="hidden md:block" />
              <span className="text-brand-secondary">Built for Mumbai Hotels</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              From 5-star heritage properties in South Mumbai to modern business hotels in BKC and boutique stays in Bandra, PureHarvest delivers a water experience that makes your guests feel the difference from the very first sip.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {HOTEL_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow h-full">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/5 flex items-center justify-center text-brand-secondary mb-4">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-black text-brand-accent text-sm md:text-base mb-2">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GEO: ROI COMPARISON ───────────────────── */}
      <section className="py-20 md:py-28 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-12">
            <SectionLabel icon={Award} label="The Business Case" />
            <h2 className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-4">
              Generic Plastic vs. <span className="text-brand-secondary">Custom Branded Glass</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Why Mumbai&apos;s top procurement managers and F&B directors are switching to custom branded water for their properties.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr className="bg-brand-accent text-white">
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs">Impact Factor</th>
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs text-brand-secondary">Custom Branded Glass</th>
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs opacity-60">Generic PET Plastic</th>
                  </tr>
                </thead>
                <tbody>
                  {ROI_COMPARISON.map((row, i) => (
                    <tr key={i} className={`border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-5 py-4 font-bold text-brand-accent">{row.factor}</td>
                      <td className="px-5 py-4 text-gray-700 font-medium">{row.custom}</td>
                      <td className="px-5 py-4 text-gray-400">{row.generic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── USE CASES ─────────────────────────── */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="hotel-usecases-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-14">
            <SectionLabel icon={Droplets} label="Implementation Strategy" />
            <h2 id="hotel-usecases-heading" className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-5">
              How Mumbai Hotels Integrate <span className="text-brand-secondary">PureHarvest</span>
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {HOTEL_USE_CASES.map((uc, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white border border-gray-100 rounded-2xl p-7 flex gap-4 h-full shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle2 size={24} className="text-brand-secondary shrink-0 mt-1" strokeWidth={2} />
                  <div>
                    <h3 className="font-black text-brand-accent text-lg mb-2">{uc.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── AEO: ANSWER BLOCKS ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <FadeIn className="mb-12">
            <SectionLabel icon={Zap} label="Expert Answers" />
            <h2 className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-4">
              Common Questions from Hotel F&B Directors
            </h2>
          </FadeIn>
          <div className="space-y-5">
            {HOTEL_QA.map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-sm">
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

      {/* ── EXPANDED FAQ (Accordion) ────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <FadeIn className="mb-12">
            <SectionLabel icon={Info} label="Logistics FAQ" />
            <h2 className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-4">
              Ordering & Delivery in Mumbai
            </h2>
          </FadeIn>
          <div className="space-y-3">
            {MUMBAI_HOTEL_FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.03}>
                <details className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <summary className="flex items-center justify-between gap-4 p-5 md:p-6 cursor-pointer list-none font-black text-brand-accent text-sm md:text-base tracking-tight select-none hover:text-brand-secondary transition-colors">
                    <span>{faq.q}</span>
                    <ChevronRight size={15} className="shrink-0 text-gray-300 group-open:rotate-90 transition-transform duration-200" />
                  </summary>
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-22 bg-brand-accent" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <h2 id="cta-heading" className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Upgrade Your Hotel&apos;s <br className="hidden md:block" />
              <span className="text-brand-secondary">Water Experience</span>
            </h2>
            <p className="text-white/65 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Contact our hospitality team for a customised sample kit sent directly to your Mumbai property. Minimum order just 500 bottles.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a
                href="https://wa.me/918149174975?text=Hi%20PureHarvest!%20I'm%20interested%20in%20custom%20water%20bottles%20for%20my%20hotel%20in%20Mumbai."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:opacity-90 active:scale-95 transition-all shadow-xl"
              >
                <MessageCircle size={18} strokeWidth={2} />
                WhatsApp Our Team
              </a>
              <a
                href="tel:+918149174975"
                className="flex items-center gap-3 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white/20 active:scale-95 transition-all"
              >
                <Phone size={16} strokeWidth={2} />
                Call +91 81491 74975
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
