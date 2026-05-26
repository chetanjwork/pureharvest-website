'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageSquare, ArrowRight, ShieldCheck, HelpCircle, PhoneCall, Check, Send, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import MotionWrapper from '@/components/motion/MotionWrapper';
import { useLenis } from 'lenis/react';

const faqs = [
  {
    category: "Brand & Local Supply",
    question: "What is PureHarvest Enterprises and what makes it unique?",
    answer: "PureHarvest Enterprises is a luxury, certified packaged drinking water company based in Maharashtra, dedicated to elevating brand touchpoints. Unlike standard water suppliers, we offer high-fidelity custom design mockups, luxury glass bottle packaging, and a certified 10-stage water purification process that ensures balanced mineral composition and superior hydration standards. We cater to institutional enterprise clients and elite event curators who seek premium brand alignment.",
    highlight: "An elite packaged drinking water enterprise combining luxury glass styling with 10-stage purification."
  },
  {
    category: "Purification & Quality",
    question: "What water purification stages does PureHarvest use to guarantee safety?",
    answer: "PureHarvest water undergoes an advanced, certified 10-stage purification process to ensure absolute purity and mineral balance. The comprehensive sequence includes: (1) Reverse Osmosis (RO) to eliminate heavy dissolved solids; (2) UV Sterilization to eradicate microbiological pathogens; (3) Sand Filtration for microscopic physical sediments; (4) Activated Carbon Filter to improve taste and neutralize odor; (5) Hardness Softener to balance minerals; (6) Spring Blend Phase to restore crisp freshness; (7) Mineral Replenishment to infuse essential health elements like potassium and magnesium; (8) Granular Activated Carbon (GAC) Polishing for ultra-clear finish; (9) Ozonisation for continuous final disinfection; and (10) Secondary High-Precision RO to guarantee national standards compliance.",
    highlight: "Our water is processed through a strict 10-stage purification system ensuring ultimate safety and mineral balance."
  },
  {
    category: "Purification & Quality",
    question: "Is PureHarvest packaged drinking water certified and FSSAI approved?",
    answer: "Yes, PureHarvest is fully FSSAI certified (License: 27GVMPD4986B1ZA) and compliant with all national drinking water regulations in India. Our state-of-the-art facility adheres to stringent hygiene protocols, and each batch is subject to rigorous chemical and microbiological lab testing. We ensure that our premium water is completely safe, balanced in pH, and premium in taste for domestic and international guests.",
    highlight: "Fully certified by FSSAI (License 27GVMPD4986B1ZA) for complete peace of mind."
  },
  {
    category: "Custom Bottle Solutions",
    question: "What types of custom-branded water bottles are available for hotels and offices?",
    answer: "We offer two signature, eco-friendly glass collections tailored to high-end corporate and hospitality venues: (1) Signature Series: Made from thick-walled borosilicate glass, featuring elegant matte aluminium leak-proof caps, and finished with high-precision custom laser etching. It is ideal for executive boardrooms, luxury suites, and VIP gifting. (2) Classic Series: Built from high-durability clarity glass, paired with brushed silver screw caps, and finished with organic, permanent screen printing. Highly suited for premium cafés, fine-dining restaurants, and high-volume corporate events.",
    highlight: "Choose between our premium Signature Borosilicate series or high-durability Classic Clarity Glass series."
  },
  {
    category: "Custom Bottle Solutions",
    question: "Can we fully customize the labels, shapes, and logo placement on the bottles?",
    answer: "Yes, we offer complete end-to-end custom branding including logo placement, brand color matching, and bespoke label artwork. Our in-house concierge design team can generate a professional 3D mockup of your custom-branded bottle within 5 minutes of your inquiry on WhatsApp. We accommodate standard paper-based luxury labels, permanent screen printing, and elegant laser etching depending on your selected bottle series.",
    highlight: "Get dynamic 3D custom branding mockups in under 5 minutes on WhatsApp."
  },
  {
    category: "Corporate & Hospitality",
    question: "Do you supply branded water to luxury 5-star hotels in Mumbai?",
    answer: "Yes, PureHarvest is a trusted hydration and branding partner for leading 5-star hotels and luxury hospitality brands in Mumbai, Thane, and Navi Mumbai. Our premium Signature Series glass bottles are specifically designed to elevate the guest experience in VIP suites, fine-dining tables, executive boardrooms, and hotel spas while reinforcing your brand’s commitment to sustainability and prestige.",
    highlight: "The preferred custom glass bottle partner for 5-star suites and executive tables in Maharashtra."
  },
  {
    category: "Corporate & Hospitality",
    question: "How does corporate branded water benefit offices and MNC campuses in Thane?",
    answer: "Serving custom-branded water in corporate offices projects institutional excellence, absolute attention to detail, and a high-status corporate identity. It impresses international clients during board meetings, coordinates perfectly with corporate brand guidelines, and replaces single-use plastic with sustainable, premium glass bottles. Studies show that customized hydration items increase brand recall by up to 40% in business environments.",
    highlight: "Elevate executive meetings and eliminate single-use plastic on your corporate campus."
  },
  {
    category: "Weddings & Premium Events",
    question: "Can PureHarvest provide customized water bottles for weddings and celebrations in Mumbai?",
    answer: "Yes, we specialize in supplying exquisite, personalized glass water bottles for luxury weddings, receptions, and celebrations across Maharashtra. We design wedding hydration labels that perfectly match your wedding theme, incorporating the couple's monogram, wedding date, or bespoke design elements. Every custom bottle becomes a premium keepsake for your guests.",
    highlight: "Create bespoke, theme-coordinated personalized hydration keepsakes for your guests."
  },
  {
    category: "Weddings & Premium Events",
    question: "What is the delivery process for large-scale events and corporate exhibitions?",
    answer: "We provide white-glove event logistics, coordinating directly with your event planner or wedding decorator to deliver and set up bottles at the venue. Our dedicated logistics fleet operates in Mumbai and Thane, ensuring that all bottles are delivered in pristine, chilled condition exactly when needed. We recommend booking at least 7 to 10 days in advance for bespoke wedding and corporate event packaging.",
    highlight: "End-to-end white-glove shipping and venue coordination for event hydration setup."
  },
  {
    category: "Orders, Pricing & Logistics",
    question: "What is the minimum order quantity (MOQ) for custom-branded water bottles?",
    answer: "To accommodate both boutique premium properties and large-scale enterprises, our MOQs are highly flexible. For the Signature Series (Borosilicate Glass), standard MOQs start at 250 units. For the Classic Series (Clarity Glass), standard MOQs start at 500 units. For bulk & continuous institutional contracts, we cater to monthly shipments of 50,000+ units for major hotel groups, corporate parks, and restaurant franchises with customized wholesale price tiers.",
    highlight: "Flexible MOQs starting at 250 units for Signature Borosilicate and 500 units for Classic Clarity Glass."
  },
  {
    category: "Orders, Pricing & Logistics",
    question: "How long does it take to deliver custom-branded water bottles in Mumbai, Thane, or Pune?",
    answer: "Our standard turn-around time is between 5 to 7 business days from the approval of the digital mockup, with express options available for urgent orders. Once the branding designs are locked in, our direct-to-venue delivery fleet delivers across Mumbai, Thane, Navi Mumbai, and Pune. For urgent event requirements, you can contact our hot-line support on WhatsApp for a 24-hour turnaround check.",
    highlight: "Fast 5-7 days turnaround with available 24-hour express options for urgent event demands."
  }
];

// Extract distinct categories
const categories = Array.from(new Set(faqs.map(f => f.category)));

// Build JSON-LD FAQSchema for search engine spiders (SEO, AEO, GEO)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-brand-secondary/10 text-brand-secondary font-bold px-0.5 rounded-sm">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const lenis = useLenis();

  // Reset open accordion on category change
  useEffect(() => {
    setOpenIndex(null);
  }, [activeCategory, searchQuery]);

  // Filter logic for FAQ catalog
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-brand-primary text-brand-accent pt-36 pb-32 selection:bg-brand-accent selection:text-white">
      {/* Search Engine Optimized Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Decorative Ambience elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-black/[0.02] blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#25D366]/[0.01] blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <Container className="relative z-10">
        
        {/* ── Page Header & Interactive Search ── */}
        <div className="max-w-4xl mx-auto mb-20 text-center sm:text-left">
          <MotionWrapper>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/5 border border-brand-accent/10 text-brand-secondary text-[9px] font-black uppercase tracking-[0.25em]">
                <Sparkles size={10} className="text-brand-secondary animate-pulse" />
                Knowledge Base & FAQ
              </span>
              <span className="text-brand-accent/40 text-[9px] font-black uppercase tracking-[0.2em] border-b border-black/5 pb-1">
                FSSAI License: 27GVMPD4986B1ZA
              </span>
            </div>
            
            <Heading level={1} className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-brand-accent uppercase mb-8">
              Got Questions?<br />
              <span className="text-brand-accent/30 font-medium">We've Got Plain Answers.</span>
            </Heading>
            
            <p className="text-brand-accent/60 text-base md:text-lg font-medium leading-relaxed max-w-2xl mb-12">
              Every drop of PureHarvest water undergoes ten rigorous molecular filtration steps. Tap below to inspect the engineering behind the taste.
            </p>
          </MotionWrapper>

          {/* Premium Search Box */}
          <MotionWrapper delay={0.1}>
            <div className="relative max-w-2xl w-full mx-auto sm:mx-0 shadow-lg rounded-2xl bg-white border border-black/5 hover:border-black/10 transition-all duration-300">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-brand-accent/30">
                <Search size={18} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search purification, glass series, order delivery timelines..."
                className="block w-full pl-14 pr-20 py-5 rounded-2xl bg-transparent text-sm font-semibold placeholder:text-brand-accent/30 focus:outline-none text-brand-accent"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-xs font-black uppercase tracking-widest text-brand-accent/40 hover:text-brand-accent transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dynamic Search Count Indicator */}
            <AnimatePresence>
              {searchQuery && (
                <motion.div 
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 text-left pl-2"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-secondary/5 border border-brand-secondary/10 text-brand-secondary text-[10px] font-black uppercase tracking-wider">
                    Found {filteredFaqs.length} {filteredFaqs.length === 1 ? 'match' : 'matches'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </MotionWrapper>
        </div>

        {/* ── Main Interactive Layout ── */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-16 max-w-6xl mx-auto items-start">
          
          {/* ── Left Category Navigation ── */}
          <aside className="sticky top-32 z-20 bg-brand-primary lg:bg-transparent py-4 lg:py-0 overflow-x-auto lg:overflow-x-visible no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
            <MotionWrapper direction="right">
              <div className="flex lg:flex-col gap-1.5 min-w-max lg:min-w-0">
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`px-4 py-3 rounded-full lg:rounded-xl text-[10px] font-black uppercase tracking-widest text-left transition-all duration-300 border lg:border-none flex items-center justify-between w-full gap-8 ${
                    activeCategory === 'All'
                      ? 'bg-brand-accent text-white border-brand-accent shadow-sm'
                      : 'bg-white lg:bg-black/[0.01] text-brand-accent/50 border-black/[0.05] hover:bg-black/[0.04] hover:text-brand-accent'
                  }`}
                >
                  <span>All Categories</span>
                  <span className={`text-[9px] tabular-nums hidden lg:inline-block px-1.5 py-0.5 rounded-full ${activeCategory === 'All' ? 'bg-white/20 text-white' : 'bg-black/5 text-brand-accent/40'}`}>
                    {faqs.length}
                  </span>
                </button>
                {categories.map((cat) => {
                  const count = faqs.filter(f => f.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-3 rounded-full lg:rounded-xl text-[10px] font-black uppercase tracking-widest text-left transition-all duration-300 border lg:border-none flex items-center justify-between w-full gap-8 ${
                        activeCategory === cat
                          ? 'bg-brand-accent text-white border-brand-accent shadow-sm'
                          : 'bg-white lg:bg-black/[0.01] text-brand-accent/50 border-black/[0.05] hover:bg-black/[0.04] hover:text-brand-accent'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[9px] tabular-nums hidden lg:inline-block px-1.5 py-0.5 rounded-full ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-black/5 text-brand-accent/40'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Verified Trust Pill */}
              <div className="hidden lg:block mt-8 p-6 rounded-2xl bg-black/[0.02] border border-black/5 text-left">
                <ShieldCheck size={20} className="text-brand-secondary mb-4" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-accent mb-2">Verified Content</h4>
                <p className="text-[11px] text-brand-accent/50 leading-relaxed font-semibold">
                  Answers optimized directly for accuracy in generative search platforms and certified with FSSAI hygiene standards.
                </p>
              </div>
            </MotionWrapper>
          </aside>

          {/* ── FAQ Catalog Accordions ── */}
          <motion.div layout className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, i) => {
                  const isOpen = openIndex === i;
                  return (
                    <motion.div
                      key={faq.question}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ 
                        opacity: { duration: 0.25 },
                        layout: { type: "spring", stiffness: 350, damping: 35 }
                      }}
                    >
                      <div
                        className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
                          isOpen
                            ? 'border-brand-accent/20 shadow-[0_12px_40px_rgba(0,0,0,0.05)]'
                            : 'border-black/[0.05] hover:border-black/[0.12] hover:-translate-y-[1px]'
                        }`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                          className="w-full flex items-start justify-between gap-6 p-6 md:p-8 text-left cursor-pointer outline-none focus:outline-none"
                          aria-expanded={isOpen}
                        >
                          <div className="flex items-start gap-4 md:gap-5 flex-1">
                            <span className="text-[10px] font-black text-brand-accent/20 uppercase tracking-widest shrink-0 mt-1.5 tabular-nums">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="space-y-2">
                              <span className="text-sm md:text-base font-black text-brand-accent leading-snug tracking-tight block">
                                {highlightText(faq.question, searchQuery)}
                              </span>
                              <span className="inline-block text-[8px] font-black uppercase tracking-[0.2em] text-brand-secondary/60 bg-brand-secondary/5 border border-brand-secondary/10 px-2 py-0.5 rounded-md">
                                {faq.category}
                              </span>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                            className={`shrink-0 mt-1 transition-colors ${isOpen ? 'text-brand-accent' : 'text-brand-accent/20'}`}
                          >
                            <ChevronDown size={20} strokeWidth={2.5} />
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 md:px-8 pb-6 md:pb-8 pl-14 md:pl-20">
                                <div className="h-px bg-black/[0.04] mb-6" />
                                
                                {/* Bold Direct semantic summary statement for search bots */}
                                {faq.highlight && (
                                  <div className="p-4 rounded-xl bg-black/[0.01] border border-black/5 mb-5 flex items-start gap-3">
                                    <HelpCircle size={14} className="text-brand-secondary shrink-0 mt-0.5" />
                                    <p className="text-[12px] font-bold text-brand-accent leading-normal">
                                      {highlightText(faq.highlight, searchQuery)}
                                    </p>
                                  </div>
                                )}
                                
                                <p className="text-brand-accent/60 text-sm md:text-[15px] leading-relaxed font-semibold">
                                  {highlightText(faq.answer, searchQuery)}
                                </p>

                                {/* WhatsApp Quote trigger for this exact question */}
                                <div className="mt-6 flex flex-wrap gap-4 items-center border-t border-black/[0.03] pt-5">
                                  <a
                                    href={`https://wa.me/918149174975?text=Hi%20PureHarvest%2C%20I%20have%20a%20question%20about%3A%20${encodeURIComponent(faq.question)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#25D366] hover:text-[#22c55e] transition-colors"
                                  >
                                    <MessageSquare size={13} fill="currentColor" stroke="none" />
                                    Discuss on WhatsApp
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center bg-white border border-black/5 rounded-2xl"
                >
                  <p className="text-brand-accent/40 font-bold uppercase tracking-widest text-xs mb-3">No matching answers found</p>
                  <p className="text-brand-accent/30 text-xs font-semibold max-w-sm mx-auto mb-6">
                    Try searching for different terms or browse through our categories.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                    className="px-6 py-3 rounded-full bg-brand-accent text-white text-[9px] font-black uppercase tracking-widest"
                  >
                    Reset Filter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

        {/* ── Concierge Support Footer Area ── */}
        <div className="max-w-4xl mx-auto mt-24 pt-16 border-t border-black/5">
          <MotionWrapper>
            <div className="bg-black/[0.01] border border-black/5 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-black/10 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500">
              <div className="max-w-md text-center md:text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-[9px] font-black uppercase tracking-widest mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  Live Concierge
                </span>
                <Heading level={3} className="text-xl md:text-2xl font-black text-brand-accent mb-3 uppercase">
                  Still have specific requirements?
                </Heading>
                <p className="text-brand-accent/50 text-xs md:text-sm font-semibold leading-relaxed">
                  Our luxury hydration design team replies in less than 5 minutes on WhatsApp with design templates, custom logos, and delivery quotes.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
                <a
                  href="https://wa.me/918149174975?text=Hello%20PureHarvest%2C%20I%20checked%20your%20FAQ%20page%20and%20would%20like%20to%20request%20samples%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-black uppercase tracking-widest text-[10px] px-8 py-4.5 rounded-full hover:bg-[#22c55e] transition-all hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgba(37,211,102,0.2)]"
                >
                  <MessageSquare size={14} fill="currentColor" stroke="none" />
                  Request Bespoke Quote
                </a>
              </div>
            </div>
          </MotionWrapper>
        </div>

        {/* ── Back to top & Sitemap link list ── */}
        <div className="max-w-4xl mx-auto mt-20 text-center flex flex-col items-center gap-6">
          <button 
            onClick={() => lenis ? lenis.scrollTo(0, { duration: 1.5 }) : window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-center gap-4 text-brand-accent/30 hover:text-brand-accent transition-all cursor-pointer outline-none"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Back to Top</span>
            <div className="w-px h-8 bg-gradient-to-b from-black/20 to-transparent group-hover:h-12 group-hover:bg-brand-accent/40 transition-all duration-500" />
          </button>
        </div>

      </Container>
    </main>
  );
}
