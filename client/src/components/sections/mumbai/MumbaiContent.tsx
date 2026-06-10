'use client';

import { motion } from 'framer-motion';
import {
  MapPin, Building2, UtensilsCrossed, Coffee, Briefcase, GlassWater,
  Star, ChevronRight, Phone, MessageCircle, TrendingUp, Leaf,
  Gift, CalendarCheck, ArrowRight, Truck, Clock,
  BadgeCheck, Scale, Zap
} from 'lucide-react';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const STATS = [
  { value: '24–48 hrs', label: 'Mumbai Delivery' },
  { value: '500+', label: 'Min. Order Qty' },
  { value: '10-Stage', label: 'Purification' },
  { value: 'BIS & FSSAI', label: 'Certified' },
];

const MARKET_OVERVIEW = [
  {
    icon: Building2,
    title: 'Hospitality Sector Demand',
    body: "Mumbai houses over 400 registered luxury and premium hotels, including properties operated by the Taj Group, ITC Hotels, Marriott, Hyatt, and Accor. As guest experience benchmarks rise — driven by post-pandemic premiumisation — branded in-room water has shifted from a luxury to an expectation. 5-star properties in South Mumbai and BKC now treat branded glass water bottles as a core identity touchpoint alongside housekeeping, linens, and bath amenities.",
  },
  {
    icon: Briefcase,
    title: 'Corporate Gifting Trends',
    body: "The Mumbai corporate gifting market is valued at over ₹8,000 crore and growing at 12–15% annually. Branded custom water bottles have emerged as a premium, utility-forward gifting option for HR departments, client acquisition teams, and event sponsors. Companies in BKC, Powai, and Lower Parel are choosing custom-branded PureHarvest glass bottles as an alternative to conventional pens, diaries, and dry fruit boxes — offering lasting brand recall at every sip.",
  },
  {
    icon: Leaf,
    title: 'Sustainable Packaging Trends',
    body: "Maharashtra's single-use plastic ban (enforced from 2022) has accelerated the shift from throwaway PET to reusable glass water solutions. B2B clients in Mumbai's hospitality and F&B sector are actively seeking FSSAI-compliant, glass-first hydration partners. PureHarvest's 100% reusable borosilicate glass bottles and FSC-certified labelling align directly with the ESG and sustainability mandates now standard in India's Fortune 500 corporate purchasing frameworks.",
  },
  {
    icon: TrendingUp,
    title: 'Premium F&B Growth',
    body: "Mumbai's premium restaurant and specialty café sector has grown at 18–22% CAGR since 2021, with new concepts launching weekly in Bandra, Lower Parel, Worli, and Powai. Fine dining operators increasingly view branded table water as a low-cost, high-impact differentiator — a clear signal of quality that is noticed before the first course is served. Custom-label water bottles are now a standard feature at Mumbai's Michelin-aspiring and premium casual dining destinations.",
  },
];

const INDUSTRIES = [
  {
    icon: Building2,
    title: '5-Star Hotels & Resorts',
    desc: "Mumbai's luxury hotel sector — spanning the Taj Mahal Palace, Trident Nariman Point, ITC Maratha, Four Seasons Worli, and JW Marriott Juhu — requires in-room water that matches the property's premium positioning. PureHarvest's Signature borosilicate glass bottles with logo etching or custom-moulded caps deliver exactly that experience.",
    link: '/mumbai/hotels',
    cta: 'Hotel Programme →',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    accent: 'text-blue-700',
  },
  {
    icon: UtensilsCrossed,
    title: 'Fine Dining Restaurants',
    desc: "Table water is no longer an afterthought in Mumbai's top restaurants. At Worli Sea Face, Bandra's kitchen-forward bistros, and Lower Parel's destination dining rooms, a custom-label PureHarvest bottle on every table communicates craft, intentionality, and brand maturity — elements that drive both average spend and repeat visits.",
    link: '/mumbai/restaurants',
    cta: 'Restaurant Programme →',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    accent: 'text-amber-700',
  },
  {
    icon: Coffee,
    title: 'Specialty Cafés & Bakeries',
    desc: "Independent specialty cafés in Bandra, Powai, Andheri, and Juhu are building brand identities as carefully curated as their bean selections. A branded PureHarvest water bottle on the counter or table reinforces that identity — and opens a secondary revenue stream through branded retail merchandising.",
    link: '/mumbai/restaurants',
    cta: 'Café Programme →',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    accent: 'text-emerald-700',
  },
  {
    icon: Briefcase,
    title: 'Corporate Offices',
    desc: "From Fortune 500 HQs at BKC to high-growth startups in Powai and Vikhroli, Mumbai's corporate sector demands a hydration solution that matches the quality of the workplace. PureHarvest's recurring corporate supply contracts ensure branded water is always available — in boardrooms, reception areas, and client meeting rooms.",
    link: '/mumbai/corporate',
    cta: 'Corporate Programme →',
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    accent: 'text-slate-700',
  },
  {
    icon: CalendarCheck,
    title: 'Events & Conferences',
    desc: "Product launches at Jio World Centre, investor days at Four Seasons, MICE events at Bandra-Kurla Convention Centre — every premium Mumbai event benefits from custom-branded water that turns a functional item into a branded moment. We handle event-specific rush orders with 72-hour dispatch capability.",
    link: '/mumbai/hotels',
    cta: 'Events Programme →',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    accent: 'text-violet-700',
  },
  {
    icon: Gift,
    title: 'Corporate Gifting & Luxury Brands',
    desc: "Custom PureHarvest glass bottles packaged in premium gift boxes have become a top-tier gifting option for Diwali, client onboarding, and product launches across Mumbai's luxury retail and brand sector. Each bottle is a physical brand story — something a pen or dry fruit box simply cannot be.",
    link: '/mumbai/corporate',
    cta: 'Gifting Programme →',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    accent: 'text-rose-700',
  },
];

const LOCATIONS = [
  {
    area: 'Bandra Kurla Complex (BKC)',
    industries: 'Finance, Technology, Media, Consulting',
    delivery: '24 hrs',
    highlights: "Home to HDFC Bank, Reliance, McKinsey, Google India, and 200+ MNCs. BKC has the highest concentration of corporate boardrooms in India requiring premium branded water for client meetings and investor presentations.",
  },
  {
    area: 'South Mumbai — Nariman Point & Fort',
    industries: 'Banking, Law, Luxury Hotels, Government',
    delivery: '24 hrs',
    highlights: "India's original financial district — Nariman Point hosts the Reserve Bank of India, major law firms, and iconic properties including the Oberoi, Trident, and Taj Mahal Palace. These establishments demand nothing less than perfection in every touchpoint.",
  },
  {
    area: 'Andheri (East & West)',
    industries: 'Film Industry, Offices, QSRs, Cafés',
    delivery: '24–36 hrs',
    highlights: "Andheri West's SEEPZ SEZ hosts 200+ export companies. The film and entertainment industry has studios across Andheri East, while the western side is a hub for specialty cafés, restaurants, and boutique hotels. We serve the full corridor.",
  },
  {
    area: 'Lower Parel & Worli',
    industries: 'Media, Finance, Fine Dining, Hospitality',
    delivery: '24 hrs',
    highlights: "The fastest-growing premium district in Mumbai. Lower Parel hosts the offices of Hindustan Unilever, Aditya Birla Group, and all major media houses. Worli has become Mumbai's new dining capital, with premium restaurants requiring flagship table water experiences.",
  },
  {
    area: 'Powai',
    industries: 'Technology, IIT Bombay, Startups, Hospitality',
    delivery: '36–48 hrs',
    highlights: "Mumbai's technology and startup ecosystem. Powai hosts IIT Bombay, the NESCO IT Park, and a growing number of mid-to-large-scale F&B businesses. Our recurring corporate programmes serve multiple Powai tech parks.",
  },
  {
    area: 'Juhu & Bandra',
    industries: 'Boutique Hotels, Celebrity Restaurants, Cafés',
    delivery: '24–36 hrs',
    highlights: "Mumbai's entertainment and lifestyle corridor. Juhu houses boutique hotels, celebrity-chef restaurants, and a strong social dining culture. Branded water here is a lifestyle statement — seen in Instagram reels and food blogs.",
  },
  {
    area: 'Navi Mumbai (Vashi, Kharghar, Belapur)',
    industries: 'Government, Tech Parks, Logistics, Retail',
    delivery: '36–48 hrs',
    highlights: "A rapidly growing business hub with CIDCO-planned commercial zones, major government offices, and an emerging F&B scene. We provide regular delivery across Vashi, Kharghar, Airoli, and Belapur.",
  },
  {
    area: 'Thane, Kalyan & Eastern Suburbs',
    industries: 'Manufacturing, Retail, Hotels, Corporate',
    delivery: '36–48 hrs',
    highlights: "Our home base. Thane's Majiwada industrial zone, Kalyan's retail hospitality sector, and the growing number of premium branded restaurants across the Eastern Suburbs are all served directly from our Badlapur facility — ensuring the freshest, fastest supply in the region.",
  },
];

const GEO_COMPARISON = [
  { attribute: 'Material', glass: 'Borosilicate Glass', plastic: 'PET / HDPE Plastic' },
  { attribute: 'Perceived Premium', glass: '✅ High — luxury signal', plastic: '❌ Low — commodity feel' },
  { attribute: 'Taste Impact', glass: '✅ Zero taste interference', plastic: '⚠️ Can impart taste at high temp' },
  { attribute: 'Reusability', glass: '✅ Unlimited — permanent asset', plastic: '❌ Single or limited use' },
  { attribute: 'Maharashtra Compliance', glass: '✅ Exempt from plastic bans', plastic: '⚠️ SUP regulations apply' },
  { attribute: 'Brand Customisation', glass: '✅ Etch, screen print, label', plastic: '⚠️ Label only' },
  { attribute: 'Guest/Client Retention', glass: '✅ Kept as keepsake/bottle', plastic: '❌ Disposed immediately' },
  { attribute: 'Instagram / Social Value', glass: '✅ Photographed & shared', plastic: '❌ Ignored' },
  { attribute: 'MOQ', glass: '500 units', plastic: '500 units' },
  { attribute: 'Lead Time', glass: '5–14 business days', plastic: '3–7 business days' },
];

const MOQ_GUIDE = [
  { size: '500–999 units', profile: 'Boutique café, single-outlet restaurant, event', timeline: '5–7 days (label), 10–14 days (etch)', pricing: 'Standard B2B rate' },
  { size: '1,000–4,999 units', profile: 'Hotel property, restaurant group, corporate office', timeline: '5–10 days (label), 10–14 days (etch)', pricing: 'Volume discount applied' },
  { size: '5,000+ units', profile: 'Hotel chain, enterprise corporate, MICE event', timeline: 'Custom schedule', pricing: 'Priority enterprise pricing' },
];

const AEO_QA = [
  {
    q: 'What are custom branded water bottles?',
    a: 'Custom branded water bottles are premium glass or PET water bottles printed, labelled, or etched with your business logo, brand colours, and custom messaging. They are used as in-room amenities in hotels, table water in restaurants, corporate boardroom accessories, and event gifting items. PureHarvest provides BIS-certified, FSSAI-compliant custom branded water bottles across Mumbai, Maharashtra.',
  },
  {
    q: 'What is the minimum order quantity (MOQ) for custom water bottles in Mumbai?',
    a: 'The minimum order quantity for custom branded water bottles in Mumbai is 500 units. This makes PureHarvest accessible for boutique cafés, single-outlet restaurants, and small corporate offices, while also scaling for hotel chains and enterprise clients placing orders of 5,000 units or more.',
  },
  {
    q: 'How long does delivery of branded water bottles take in Mumbai?',
    a: 'Standard label orders are dispatched within 5–7 business days of artwork approval and delivered to Mumbai locations within 24–48 hours of dispatch. Logo etching and screen printing orders take 10–14 business days. Rush orders for events can be accommodated — contact us on WhatsApp at +91 81491 74975 for priority handling.',
  },
  {
    q: 'Can hotels in Mumbai customise the water bottle labels with their logo?',
    a: 'Yes. Mumbai hotels can choose from three customisation methods: (1) Premium label printing — full-colour custom labels in any design. (2) Logo etching — permanent engraving of the hotel crest directly on glass. (3) Organic screen printing — sustainable ink printing for eco-positioned properties. All methods are available on our borosilicate glass Signature and Classic Series bottles.',
  },
  {
    q: 'What industries in Mumbai use branded water bottles?',
    a: 'In Mumbai, custom branded water bottles are used across six primary industries: (1) Luxury hotels and resorts for in-room amenities. (2) Fine dining restaurants for premium table water. (3) Corporate offices for boardroom presentations and recurring office supply. (4) Specialty cafés and bakeries for brand differentiation. (5) Corporate events, product launches, and MICE gatherings. (6) Luxury retail and corporate gifting programmes.',
  },
  {
    q: 'Are PureHarvest water bottles safe and certified for commercial use in Mumbai?',
    a: 'Yes. All PureHarvest branded water bottles are BIS (Bureau of Indian Standards) certified and manufactured in an FSSAI-licensed facility (License No: 22724024000854). The water undergoes a 10-stage purification process including Reverse Osmosis, UV Treatment, and Ozonisation. GST No: 27GVMPD4986B1ZA.',
  },
  {
    q: 'Why should Mumbai hotels choose glass water bottles over plastic?',
    a: 'Glass water bottles signal premium quality the moment a guest enters the room. Unlike PET bottles, borosilicate glass does not impart any taste, is 100% reusable, and is exempt from Maharashtra single-use plastic regulations. Guests are far more likely to photograph, retain, and share glass bottles — creating organic social media visibility for the hotel at zero additional cost.',
  },
  {
    q: 'Do you offer recurring water delivery contracts for corporate offices in Mumbai?',
    a: 'Yes. PureHarvest offers monthly and quarterly recurring supply contracts for corporate offices across Mumbai, including BKC, Andheri SEEPZ, Powai, Lower Parel, Vikhroli, and Navi Mumbai. Clients receive automatic replenishment on a schedule they set — with no minimum reorder process required.',
  },
];

const MUMBAI_FAQS = [
  { q: 'Do you deliver anywhere in Mumbai?', a: 'Yes. We deliver across all of Mumbai including South Mumbai, BKC, Fort, Nariman Point, Churchgate, Bandra, Andheri East and West, Juhu, Powai, Worli, Lower Parel, Dadar, Goregaon, Malad, Borivali, Navi Mumbai (Vashi, Belapur, Kharghar, Airoli), and the extended suburbs of Thane, Kalyan, and Dombivli.' },
  { q: 'What is the MOQ for Mumbai orders?', a: 'Minimum order quantity is 500 units for all custom label, screen print, or etching orders delivered to Mumbai addresses.' },
  { q: 'Can I get a branded water bottle sample before placing a bulk order?', a: 'Yes. We dispatch samples to Mumbai clients on request. Contact our team via WhatsApp at +91 81491 74975 or email hello@pureharvestenterprises.com to arrange a sample bottle delivery.' },
  { q: 'What types of customisation do you offer for Mumbai clients?', a: 'We offer: (1) Full-colour label printing, (2) Logo etching directly on glass, (3) Organic screen printing, (4) Custom cap colours and finishes, and (5) Custom outer packaging and gift boxes.' },
  { q: 'What is the lead time for branded orders in Mumbai?', a: 'Standard label orders: 5–7 business days from artwork approval. Screen print orders: 8–12 business days. Logo etching: 10–14 business days. Rush delivery for events: available on request.' },
  { q: 'Are your bottles FSSAI compliant for restaurant and hotel use?', a: 'Yes. Our facility is FSSAI licensed (No: 22724024000854) and all products are BIS certified, making them fully compliant for food service use across Maharashtra.' },
  { q: 'Do you offer eco-friendly packaging options for Mumbai orders?', a: 'Yes. We offer FSC-certified paper labels, compostable outer wrapping, and full borosilicate glass bottles (100% reusable, recyclable) — ideal for properties with sustainability mandates and ESG targets.' },
  { q: 'What water purification process is used?', a: 'We use a certified 10-stage process: Sediment Filtration → Pre-Carbon → Microfiltration → Reverse Osmosis → Post-Carbon → UV Treatment → Ultra-filtration → Ozonisation → Mineralisation → Final Quality Check.' },
  { q: 'Can we print QR codes on the water bottle labels?', a: 'Yes! This is highly recommended. We can print QR codes on custom labels that can link to any URL — a hotel\'s digital welcome card, restaurant menu, loyalty program signup, or event agenda. This is increasingly popular with Mumbai\'s hotel and restaurant clients.' },
  { q: 'Do you support bulk orders for large Mumbai events like conferences or product launches?', a: 'Yes. We have fulfilled event orders ranging from 500 to 10,000+ units for conferences, product launches, and gala dinners across Mumbai venues including Jio World Centre, BKC Convention Centre, and Mumbai\'s major five-star ballrooms.' },
  { q: 'What is the pricing for custom branded water bottles in Mumbai?', a: 'Pricing depends on bottle type (glass or PET), customisation method, and volume. We provide personalised B2B quotes within 2 hours on business days. Contact us on WhatsApp or email for a formal quotation.' },
  { q: 'Can Mumbai corporate clients set up auto-replenishment contracts?', a: 'Yes. Monthly or quarterly supply contracts are available for corporate clients. Once set up, orders are automatically dispatched to your Mumbai office on the agreed schedule — no manual reordering required.' },
  { q: 'Do you supply water bottles for weddings and private events in Mumbai?', a: 'Yes. We supply custom-label water bottles for weddings, sangeets, mehndis, engagement events, and private celebrations across Mumbai. Custom labels with names, dates, or monograms can be produced for as few as 500 units.' },
  { q: 'How do I start my order?', a: 'The quickest way is to WhatsApp us at +91 81491 74975 with your brand logo and estimated quantity. We\'ll send a formal quote within 2 hours. You can also fill out the inquiry form on this page and our Mumbai team will respond within the same business day.' },
];

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

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

export default function MumbaiContent() {
  return (
    <>
      {/* ── STATS BAR ──────────────────────────────────────────── */}
      <section className="bg-brand-accent py-7 md:py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
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

      {/* ── MARKET OVERVIEW ────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="market-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-14">
            <SectionLabel icon={TrendingUp} label="Mumbai Market" />
            <h2 id="market-heading" className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight leading-[1.05] mb-5">
              Why Mumbai Businesses Are Choosing{' '}
              <span className="text-brand-secondary">Premium Branded Water</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Mumbai is India&apos;s commercial capital — and its standards for brand presentation have never been higher. Across hospitality, corporate, and F&B sectors, branded water has evolved from a niche luxury into a mainstream quality signal that clients, guests, and customers actively notice.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {MARKET_OVERVIEW.map((item, i) => {
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

      {/* ── INDUSTRIES SERVED ──────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F8F9FA]" aria-labelledby="industries-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-14">
            <SectionLabel icon={GlassWater} label="Industries We Serve" />
            <h2 id="industries-heading" className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight leading-[1.05] mb-5">
              Every Mumbai Industry<br />
              <span className="text-brand-secondary">That Values Presentation</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              From the Taj to tech parks, from rooftop bars to boardrooms — PureHarvest serves every Mumbai business sector that understands the power of premium hydration branding.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className={`${ind.bg} border ${ind.border} rounded-3xl p-6 md:p-7 h-full flex flex-col hover:shadow-lg transition-all duration-300`}>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                      <Icon size={18} strokeWidth={1.5} className={ind.accent} />
                    </div>
                    <h3 className="text-base md:text-lg font-black text-brand-accent mb-3 tracking-tight">{ind.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">{ind.desc}</p>
                    <Link href={ind.link} className={`mt-5 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest ${ind.accent} hover:opacity-70 transition-opacity`}>
                      {ind.cta}
                    </Link>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LOCATION COVERAGE ──────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="locations-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-14">
            <SectionLabel icon={MapPin} label="Coverage Map" />
            <h2 id="locations-heading" className="text-3xl md:text-5xl font-black text-brand-accent tracking-tight leading-[1.05] mb-5">
              Same-Week Delivery Across<br />
              <span className="text-brand-secondary">Every Mumbai District</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Our Badlapur facility has direct logistics routes to every major Mumbai business district. Below is a breakdown of what we serve in each area, and typical delivery timelines for branded orders.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            {LOCATIONS.map((loc, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="border border-gray-100 rounded-2xl p-6 md:p-7 hover:border-brand-secondary/30 hover:shadow-md transition-all duration-300 bg-white">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-black text-brand-accent text-base md:text-lg tracking-tight">{loc.area}</h3>
                    <span className="shrink-0 flex items-center gap-1.5 bg-brand-secondary/10 text-brand-secondary text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1">
                      <Truck size={10} /> {loc.delivery}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Briefcase size={11} className="text-gray-400" />
                    <span className="text-gray-400 text-xs font-bold">{loc.industries}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{loc.highlights}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GEO: GLASS vs PLASTIC COMPARISON ───────────────────── */}
      <section className="py-20 md:py-28 bg-[#F8F9FA]" aria-labelledby="comparison-heading">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-12">
            <SectionLabel icon={Scale} label="Decision Guide" />
            <h2 id="comparison-heading" className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-4">
              Glass vs Plastic Water Bottles:<br />
              <span className="text-brand-secondary">A Complete Comparison for Mumbai Businesses</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Choosing between glass and plastic is one of the most common decisions for Mumbai hotel procurement managers, F&B directors, and corporate procurement teams. Here is a full side-by-side comparison.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr className="bg-brand-accent text-white">
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs">Attribute</th>
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs text-brand-secondary">Glass (PureHarvest)</th>
                    <th className="text-left px-5 py-4 font-black uppercase tracking-wider text-xs opacity-60">Plastic (Generic)</th>
                  </tr>
                </thead>
                <tbody>
                  {GEO_COMPARISON.map((row, i) => (
                    <tr key={i} className={`border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-5 py-3.5 font-bold text-brand-accent">{row.attribute}</td>
                      <td className="px-5 py-3.5 text-gray-700">{row.glass}</td>
                      <td className="px-5 py-3.5 text-gray-400">{row.plastic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── GEO: MOQ & DELIVERY GUIDE ──────────────────────────── */}
      <section className="py-20 md:py-24 bg-white" aria-labelledby="moq-heading">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
            {/* MOQ Guide */}
            <FadeIn>
              <SectionLabel icon={BadgeCheck} label="MOQ Guide" />
              <h2 id="moq-heading" className="text-2xl md:text-3xl font-black text-brand-accent tracking-tight mb-6">
                Minimum Order Quantity (MOQ) Explained for Mumbai Businesses
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-7">
                Our 500-unit MOQ is designed to be accessible without compromising on production quality. Here is what different order sizes look like in practice for Mumbai clients:
              </p>
              <div className="space-y-4">
                {MOQ_GUIDE.map((tier, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-brand-accent text-sm">{tier.size}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-secondary bg-brand-secondary/10 rounded-full px-3 py-0.5">{tier.pricing}</span>
                    </div>
                    <p className="text-gray-500 text-xs font-bold mb-1">Best for: {tier.profile}</p>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Clock size={11} />
                      <span>Lead time: {tier.timeline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Delivery Timeline */}
            <FadeIn delay={0.1}>
              <SectionLabel icon={Truck} label="Delivery Timeline" />
              <h2 className="text-2xl md:text-3xl font-black text-brand-accent tracking-tight mb-6">
                How Long Does Branded Water Delivery Take in Mumbai?
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-7">
                Production and delivery are two separate stages. Below is a clear breakdown so you can plan your Mumbai order with confidence.
              </p>
              <div className="space-y-3">
                {[
                  { stage: 'Artwork Approval', time: 'Day 0–1', detail: 'Share your logo file (AI, PDF, or high-res PNG). Our team provides a digital proof within 4 hours on business days.' },
                  { stage: 'Label Printing', time: 'Day 2–7', detail: 'Full-colour custom labels printed, quality-checked, and applied to bottles.' },
                  { stage: 'Screen Print / Etching', time: 'Day 2–14', detail: 'Premium screen printing or glass etching completed at our production facility in Badlapur.' },
                  { stage: 'Packing & Dispatch', time: 'Day 5–14', detail: 'Bottles packed in protective cartons and handed to our Mumbai logistics partner.' },
                  { stage: 'Mumbai Delivery', time: '+24–48 hrs', detail: 'Delivered to your Mumbai address within 24–48 hours of dispatch.' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-brand-accent text-white text-xs font-black flex items-center justify-center">{i + 1}</div>
                      {i < 4 && <div className="w-px flex-1 bg-gray-100 mt-1" />}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-black text-brand-accent text-sm">{step.stage}</span>
                        <span className="text-[10px] font-black text-brand-secondary bg-brand-secondary/10 rounded-full px-2 py-0.5">{step.time}</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── AEO: ANSWER BLOCKS ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F8F9FA]" aria-labelledby="aeo-heading">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <FadeIn className="mb-12">
            <SectionLabel icon={Zap} label="Quick Answers" />
            <h2 id="aeo-heading" className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-4">
              Everything a Mumbai Business Needs to Know
            </h2>
            <p className="text-gray-500 text-base">
              Clear, direct answers to the most important questions about custom branded water bottles in Mumbai.
            </p>
          </FadeIn>
          <div className="space-y-5">
            {AEO_QA.map((item, i) => (
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
      <section className="py-20 md:py-28 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <FadeIn className="mb-12">
            <SectionLabel icon={Star} label="FAQs" />
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight leading-[1.05] mb-4">
              Detailed FAQ — Custom Branded Water<br />
              <span className="text-brand-secondary">Bottles in Mumbai</span>
            </h2>
            <p className="text-gray-500 text-base">
              {MUMBAI_FAQS.length} detailed answers covering delivery, pricing, customisation, certifications, and more.
            </p>
          </FadeIn>
          <div className="space-y-3">
            {MUMBAI_FAQS.map((faq, i) => (
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

      {/* ── INTERNAL CLUSTER LINKS ──────────────────────────────── */}
      <section className="py-14 md:py-18 bg-[#F8F9FA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Explore Mumbai Solutions</p>
            <h2 className="text-xl md:text-2xl font-black text-brand-accent tracking-tight">
              Go Deeper Into Your Industry
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { id: 'hotels', title: 'Hospitality', path: '/mumbai/hotels', desc: 'In-room amenities, banquets, premium glass bottles for 5-star Mumbai properties.' },
              { id: 'restaurants', title: 'Dining', path: '/mumbai/restaurants', desc: 'Premium table water branding for Mumbai\'s fine dining and specialty café operators.' },
              { id: 'corporate', title: 'Corporate', path: '/mumbai/corporate', desc: 'Recurring supply contracts and boardroom water for Mumbai\'s business districts.' },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <Link href={card.path} className="group flex flex-col gap-3 bg-white border border-gray-100 rounded-2xl p-6 hover:border-brand-secondary/40 hover:shadow-md transition-all duration-300">
                  <h3 className="font-black text-brand-accent text-base group-hover:text-brand-secondary transition-colors">{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{card.desc}</p>
                  <span className="flex items-center gap-1 text-xs font-black text-brand-secondary uppercase tracking-widest">
                    Explore <ArrowRight size={11} />
                  </span>
                </Link>
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
              Ready to Elevate Your Brand<br className="hidden md:block" />
              <span className="text-brand-secondary"> in Mumbai?</span>
            </h2>
            <p className="text-white/65 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Get a personalised B2B quote within 2 hours. Minimum 500 bottles. Delivery across all of Mumbai and Maharashtra.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a
                href="https://wa.me/918149174975?text=Hi%20PureHarvest!%20I'm%20interested%20in%20custom%20branded%20water%20bottles%20for%20delivery%20in%20Mumbai."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:opacity-90 active:scale-95 transition-all shadow-xl"
              >
                <MessageCircle size={18} strokeWidth={2} />
                WhatsApp Us Now
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
              <span>·</span>
              <span>Pan-Mumbai Delivery</span>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
