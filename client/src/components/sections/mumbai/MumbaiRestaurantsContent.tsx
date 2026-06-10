'use client';

import { motion } from 'framer-motion';
import {
  UtensilsCrossed, CheckCircle2, ChevronRight, Phone, MessageCircle, Info,
  Star, ShieldCheck, Clock, Layers, Award, Zap
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

const RESTAURANT_FEATURES = [
  { icon: Layers, title: 'Full-Colour Custom Labels', desc: 'Waterproof labels that survive ice buckets and condensation, perfectly matching your restaurant\'s visual identity.' },
  { icon: Star, title: 'Premium Table Setting', desc: 'Replace generic plastic with a branded glass bottle that transforms a functional item into a curated brand statement.' },
  { icon: ShieldCheck, title: 'FSSAI Compliant (Table Service)', desc: '10-stage purified water with full FSSAI licensing and BIS certification. Zero compliance risk for your operations team.' },
  { icon: Clock, title: 'Reliable Recurring Supply', desc: 'Set up an auto-replenishment schedule so you never run out during a busy Friday night dinner service in Bandra or Worli.' },
];

const RESTAURANT_SEGMENTS = [
  { name: 'Fine Dining & Michelin-Aspiring', desc: 'For premium dining rooms in South Mumbai and BKC. We recommend our Signature Borosilicate Glass with elegant logo etching to match high average cover values.' },
  { name: 'Specialty Cafés & Bakeries', desc: 'For independent coffee shops in Bandra and Powai. Branded bottles serve as a canvas for artisanal label designs and become a retail merchandising opportunity.' },
  { name: 'QSR & Fast Casual Chains', desc: 'Cost-effective, high-volume branded PET or Classic Glass programmes for quick-service chains looking to elevate their beverage offering across multiple Mumbai outlets.' },
  { name: 'Cloud Kitchens & Delivery Concepts', desc: 'Include a branded water bottle in your premium delivery packaging. It creates a memorable unboxing experience that drives Zomato/Swiggy repeat orders.' },
];

const ROI_COMPARISON = [
  { factor: 'Table Presentation', generic: 'Utilitarian, detracts from carefully designed interiors.', custom: 'Enhances table setting, aligns with interior design.' },
  { factor: 'Customer Perceived Value', generic: 'Guests resent paying a markup on a bottle they can buy at a local store.', custom: 'Guests perceive it as a house specialty or premium offering, justifying the price.' },
  { factor: 'Brand Recall', generic: 'Forgettable.', custom: 'High recall. The bottle stays on the table for the entire meal.' },
  { factor: 'Social Media', generic: 'Moved out of the frame when guests take photos of food.', custom: 'Included in flatlays and Instagram stories, generating organic reach.' },
];

const RESTAURANT_QA = [
  { q: 'How does custom table water increase revenue?', a: 'When you serve a generic mineral water brand, guests know the exact retail price, creating friction when you apply a restaurant markup. A custom-branded bottle is perceived as a premium, curated offering exclusive to your restaurant. This elevates the perceived value, removes price friction, and turns water from a low-margin necessity into a profitable menu item.' },
  { q: 'Can the bottle labels withstand condensation and ice buckets?', a: 'Yes. We use premium synthetic, waterproof labels that do not peel, wrinkle, or lose colour when exposed to condensation or submerged in an ice bucket. Your brand remains pristine from the moment it leaves the fridge to the end of the meal.' },
  { q: 'Is the water suitable for all types of cuisines?', a: 'Yes. Our 10-stage purification process (including RO, UV, and Ozonisation) yields a highly purified, neutral-tasting water with a balanced mineral profile. It acts as a perfect palate cleanser without interfering with the complex flavours of your food or wine.' },
  { q: 'We have multiple outlets in Mumbai. Can you deliver to all of them?', a: 'Absolutely. We manage multi-outlet delivery logistics. You can place a single bulk order, and we will distribute the inventory across your various locations in Colaba, Bandra, Andheri, Powai, or anywhere else in the MMR region on a scheduled basis.' },
  { q: 'Do you offer custom glass bottles for restaurants?', a: 'Yes. We offer both borosilicate glass (which is highly durable for restaurant environments and dishwasher safe) and premium clarity glass. Glass is the preferred choice for fine dining establishments aiming to eliminate single-use plastics.' }
];

const MUMBAI_RESTAURANT_FAQS = [
  { q: 'What is the minimum order for a standalone cafe?', a: 'Our MOQ is just 500 units, making it highly accessible for single-location cafes and newly launched restaurants in Mumbai.' },
  { q: 'Can we print QR codes on the water bottle labels?', a: 'Yes! This is highly recommended. We can print a QR code linking directly to your digital menu, Instagram page, or loyalty program signup.' },
  { q: 'How much space do I need to store 500 bottles?', a: '500 bottles (PET or Glass) typically arrive in about 20-21 compact cartons, which can easily be stacked in a standard restaurant dry store or back office.' },
  { q: 'What happens if we run out during a busy weekend?', a: 'We recommend our recurring supply model, which includes buffer stock. However, for emergencies, we offer expedited 24-hour delivery for existing Mumbai clients.' },
  { q: 'Are there hidden setup fees for label design?', a: 'No. As long as you provide the logo or artwork (in high resolution), the label printing and setup are included in your per-bottle quote.' },
];

export default function MumbaiRestaurantsContent() {
  return (
    <>
      <section className="py-20 md:py-28 bg-white" aria-labelledby="restaurant-features-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-14">
            <SectionLabel icon={UtensilsCrossed} label="Restaurant Series" />
            <h2 id="restaurant-features-heading" className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight leading-[1.05] mb-5">
              Turn Every Table Into <br className="hidden md:block" />
              <span className="text-brand-secondary">a Brand Moment</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Mumbai&apos;s most discerning diners notice the details. A custom-branded PureHarvest bottle on your table signals quality, attention to detail, and brand maturity before the first course even arrives.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {RESTAURANT_FEATURES.map((f, i) => {
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

      {/* ── GEO: RESTAURANT SEGMENTS ───────────────────── */}
      <section className="py-20 md:py-28 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-12">
            <SectionLabel icon={Layers} label="Tailored Solutions" />
            <h2 className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-4">
              Restaurant Segments We Serve in Mumbai
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Different dining concepts require different hydration strategies. We offer tailored packaging solutions for every type of F&B operation.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {RESTAURANT_SEGMENTS.map((seg, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4 h-full">
                  <CheckCircle2 size={24} className="text-amber-600 shrink-0 mt-1" strokeWidth={2} />
                  <div>
                    <h3 className="font-black text-brand-accent text-lg mb-2">{seg.name}</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{seg.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GEO: ROI COMPARISON ───────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-12">
            <SectionLabel icon={Award} label="The Business Case" />
            <h2 className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-4">
              Generic Mineral Water vs. <span className="text-brand-secondary">Custom Branded Water</span>
            </h2>
          </FadeIn>
          <FadeIn>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr className="bg-brand-accent text-white">
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs">Restaurant Impact</th>
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs text-brand-secondary">Custom Branded Water</th>
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs opacity-60">Generic Mineral Water</th>
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

      {/* ── AEO: ANSWER BLOCKS ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <FadeIn className="mb-12">
            <SectionLabel icon={Zap} label="Expert Answers" />
            <h2 className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-4">
              Common Questions from F&B Operators
            </h2>
          </FadeIn>
          <div className="space-y-5">
            {RESTAURANT_QA.map((item, i) => (
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
            {MUMBAI_RESTAURANT_FAQS.map((faq, i) => (
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
              Elevate Your Restaurant&apos;s <br className="hidden md:block" />
              <span className="text-brand-secondary">Table Presentation</span>
            </h2>
            <p className="text-white/65 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Get a custom quote for your Mumbai restaurant within 2 hours. Minimum 500 bottles. Fast delivery across the city.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a
                href="https://wa.me/918149174975?text=Hi%20PureHarvest!%20I'm%20interested%20in%20custom%20water%20bottles%20for%20my%20restaurant%20in%20Mumbai."
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
