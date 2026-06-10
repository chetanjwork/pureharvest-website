'use client';

import { motion } from 'framer-motion';
import {
  Briefcase, CheckCircle2, ChevronRight, Phone, MessageCircle, Info,
  RefreshCcw, ShieldCheck, BarChart3, Users, Award, Zap
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

const CORPORATE_FEATURES = [
  { icon: RefreshCcw, title: 'Recurring Contracts', desc: 'Monthly or quarterly automatic supply to your BKC, Powai, or Andheri office. Set it once, never run out of premium water.' },
  { icon: BarChart3, title: 'B2B Volume Pricing', desc: 'The more you order, the sharper the per-unit cost. Transparent B2B pricing with no hidden design or setup fees.' },
  { icon: ShieldCheck, title: 'FSSAI Certified', desc: 'Fully compliant for office pantries and corporate cafeterias. Zero health or compliance risk for your administration team.' },
  { icon: Users, title: 'Dedicated Event Support', desc: 'Product launches, investor days, town halls — we dispatch event-specific branded bottles on short notice across Mumbai.' },
];

const CORPORATE_SEGMENTS = [
  { name: 'Boardroom Presentations', desc: 'Elevate your client meetings in BKC or Nariman Point. High-clarity glass bottles with your company logo communicate stability, attention to detail, and premium brand positioning.' },
  { name: 'Daily Office Supply', desc: 'Replace unhygienic water dispensers or cheap plastic bottles in employee cafeterias with premium custom-labeled PET bottles for daily hydration.' },
  { name: 'Corporate Events & MICE', desc: 'For annual general meetings (AGMs), investor summits, or offsites. Turn functional hydration into a continuous brand touchpoint for attendees.' },
  { name: 'Premium Corporate Gifting', desc: 'Custom etched glass bottles packaged in premium gift boxes for Diwali, client onboarding, or employee milestone celebrations.' },
];

const ROI_COMPARISON = [
  { factor: 'Client Impression', generic: 'Standard. Blends into the background.', custom: 'Premium. Signals high attention to detail and brand pride.' },
  { factor: 'Internal Culture', generic: 'Commodity hydration.', custom: 'Fosters brand belonging and premium workplace environment.' },
  { factor: 'Event Sponsorship Value', generic: 'Missed branding opportunity.', custom: 'Turns every attendee into a carrier of your brand.' },
  { factor: 'Administration Effort', generic: 'Constant manual reordering.', custom: 'Automated recurring delivery contracts.' },
];

const CORPORATE_QA = [
  { q: 'Why do Fortune 500 companies in Mumbai switch to custom branded water?', a: 'Top-tier firms in BKC and Lower Parel understand that every physical touchpoint matters. Serving a client a generic water brand in a multi-million dollar pitch is a missed opportunity. Custom-branded glass bottles align the physical environment with the corporate brand\'s high standards.' },
  { q: 'How does the recurring corporate supply contract work?', a: 'We analyse your office\'s average monthly consumption. Based on this, we set up an auto-replenishment schedule (e.g., delivering every alternate Tuesday). Your admin team doesn\'t need to manually reorder, and we buffer for unexpected surges in office attendance.' },
  { q: 'Can we place a one-off bulk order for an upcoming corporate event?', a: 'Yes. While we specialise in recurring contracts, we regularly fulfill one-off orders for product launches, AGMs, and town halls in Mumbai. We can process standard event orders within 5-7 days and offer rush delivery for urgent requirements.' },
  { q: 'Is there a difference in pricing for glass vs. PET for offices?', a: 'Yes. Glass (borosilicate or clarity) is a premium product typically reserved for boardrooms, executive suites, and VIP gifting. PET bottles are more cost-effective and are often used for general employee cafeterias or large-scale outdoor corporate events. We provide volume pricing for both.' },
  { q: 'Do you provide GST invoices for corporate orders?', a: 'Absolutely. We provide fully compliant B2B GST invoices (GST: 27GVMPD4986B1ZA) for all orders, allowing your finance team to claim input tax credit (ITC) seamlessly.' }
];

const MUMBAI_CORPORATE_FAQS = [
  { q: 'What are the delivery areas for corporate offices?', a: 'We cover all major Mumbai business districts: BKC, Nariman Point, Lower Parel, Worli, Andheri (East & West), SEEPZ, Powai, Goregaon (NESCO), Vikhroli, and Navi Mumbai.' },
  { q: 'What is the minimum order quantity (MOQ)?', a: 'The MOQ is 500 units per order. For recurring contracts, this minimum applies per delivery drop.' },
  { q: 'Can we change the label design for different internal events?', a: 'Yes. Many corporate clients use a standard logo for daily boardroom supply, but request specific event-themed labels (e.g., "Annual Summit 2024") for special occasions. Setup is quick and easy.' },
  { q: 'Are your bottles compliant with corporate ESG and sustainability policies?', a: 'Yes. Our glass bottles are 100% reusable and exempt from plastic bans. We also offer FSC-certified paper labels and compostable outer packaging for companies with strict ESG mandates.' },
  { q: 'How do we request a corporate quote?', a: 'Simply reach out via WhatsApp (+91 81491 74975) or email with your estimated monthly volume and preferred bottle type. We provide formal quotations within 2 hours during business days.' },
];

export default function MumbaiCorporateContent() {
  return (
    <>
      <section className="py-20 md:py-28 bg-white" aria-labelledby="corporate-features-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-14">
            <SectionLabel icon={Briefcase} label="Corporate Programme" />
            <h2 id="corporate-features-heading" className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight leading-[1.05] mb-5">
              Branded Water for <br className="hidden md:block" />
              <span className="text-brand-secondary">Mumbai&apos;s Business Districts</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              From the boardroom to the break room — PureHarvest corporate water programmes give your office a premium, consistent hydration experience that clients and employees actively notice.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {CORPORATE_FEATURES.map((f, i) => {
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

      {/* ── GEO: CORPORATE SEGMENTS ───────────────────── */}
      <section className="py-20 md:py-28 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-12">
            <SectionLabel icon={Users} label="Corporate Solutions" />
            <h2 className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-4">
              How Mumbai Companies Use Branded Water
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {CORPORATE_SEGMENTS.map((seg, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4 h-full">
                  <CheckCircle2 size={24} className="text-slate-600 shrink-0 mt-1" strokeWidth={2} />
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
              The Value of Corporate Branding
            </h2>
          </FadeIn>
          <FadeIn>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr className="bg-brand-accent text-white">
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs">Business Impact</th>
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs text-brand-secondary">Custom Branded Water</th>
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs opacity-60">Generic Bottled Water</th>
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
              Common Questions from Administration Teams
            </h2>
          </FadeIn>
          <div className="space-y-5">
            {CORPORATE_QA.map((item, i) => (
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
              Corporate Ordering & Delivery
            </h2>
          </FadeIn>
          <div className="space-y-3">
            {MUMBAI_CORPORATE_FAQS.map((faq, i) => (
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
              Start Your Corporate <br className="hidden md:block" />
              <span className="text-brand-secondary">Water Programme</span>
            </h2>
            <p className="text-white/65 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Get a B2B quote within 2 hours. Recurring contracts available. Volume pricing included. Delivery across Mumbai.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a
                href="https://wa.me/918149174975?text=Hi%20PureHarvest!%20I'm%20interested%20in%20corporate%20branded%20water%20bottles%20for%20our%20Mumbai%20office."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:opacity-90 active:scale-95 transition-all shadow-xl"
              >
                <MessageCircle size={18} strokeWidth={2} />
                WhatsApp For B2B Quote
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
