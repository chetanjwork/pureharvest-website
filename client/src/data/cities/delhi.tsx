import { Building2, UtensilsCrossed, Briefcase, TrendingUp, GlassWater, MapPin, Star, Award } from 'lucide-react';
import React from 'react';
import type { CityHubData } from '@/components/templates/CityHubTemplate';

export const delhiData: CityHubData = {
  city: 'Delhi NCR',
  stats: [
    { value: 'NCR', label: 'Logistics Network' },
    { value: '500+', label: 'Min. Order Qty' },
    { value: '10-Stage', label: 'Purification' },
    { value: 'BIS & FSSAI', label: 'Certified' },
  ],
  marketIcon: TrendingUp,
  marketHeading: (
    <>
      Premium Hydration for <br />
      <span className="text-brand-secondary">India&apos;s Capital Region</span>
    </>
  ),
  marketDesc: "From diplomatic summits in Lutyens' Delhi to corporate boardrooms in Gurugram, the NCR region demands excellence. PureHarvest provides bespoke water solutions that match the prestige of Delhi's top establishments.",
  marketOverview: [
    {
      icon: Building2,
      title: 'Luxury Hospitality in NCR',
      body: "Delhi NCR hosts some of India's most prestigious 5-star properties and diplomatic enclaves. From Aerocity to Lutyens' Delhi, luxury hotels are elevating their guest experience by replacing generic plastic with elegantly etched borosilicate glass water bottles, reflecting the grandeur of the region.",
    },
    {
      icon: Briefcase,
      title: 'Corporate & Government Events',
      body: "As the political and corporate capital, Delhi hosts high-level diplomatic summits, government conclaves, and corporate board meetings. Custom-branded water bottles with precise logo printing offer a refined, professional touch essential for these high-stakes environments in Connaught Place and Gurugram.",
    },
    {
      icon: Star,
      title: 'Big Fat Indian Weddings',
      body: "The NCR region (especially South Delhi and Chattarpur) is famous for opulent weddings and large-scale luxury events. Event planners increasingly use custom-labeled water bottles (often featuring the couple's monogram) as a personalised, premium element that guests remember.",
    },
    {
      icon: UtensilsCrossed,
      title: 'Fine Dining & Nightlife',
      body: "The vibrant culinary scenes in Khan Market, Cyber Hub (Gurugram), and Hauz Khas demand high aesthetic standards. Premium custom-branded table water acts as a silent ambassador for the restaurant's brand, increasing perceived value and social media sharing.",
    },
  ],
  industryIcon: GlassWater,
  industryHeading: (
    <>
      Targeted Solutions for <br />
      <span className="text-brand-secondary">Delhi NCR Businesses</span>
    </>
  ),
  industries: [
    {
      icon: Building2,
      title: 'Premium Hotels & Resorts',
      desc: "Supplying Aerocity and South Delhi luxury properties with etched glass bottles for suites and VIP lounges.",
      bg: 'bg-blue-50', border: 'border-blue-100', accent: 'text-blue-700',
    },
    {
      icon: Briefcase,
      title: 'Corporate Parks (Gurugram & Noida)',
      desc: "Recurring supply for multinational HQs, consulting firms, and tech parks across the NCR region.",
      bg: 'bg-slate-50', border: 'border-slate-100', accent: 'text-slate-700',
    },
    {
      icon: UtensilsCrossed,
      title: 'High-End Dining & Clubs',
      desc: "Custom-labelled table water for exclusive clubs and fine dining restaurants in Lutyens' Delhi and Khan Market.",
      bg: 'bg-amber-50', border: 'border-amber-100', accent: 'text-amber-700',
    },
    {
      icon: Award,
      title: 'Luxury Events & Weddings',
      desc: "Bespoke monogrammed water bottles for large-scale weddings and premium social events in Chattarpur.",
      bg: 'bg-rose-50', border: 'border-rose-100', accent: 'text-rose-700',
    },
  ],
  locationIcon: MapPin,
  locationHeading: (
    <>
      Supplying the Entire <br />
      <span className="text-brand-secondary">National Capital Region</span>
    </>
  ),
  locations: [
    { area: 'Connaught Place & Lutyens', focus: 'Government & Corporate HQs', delivery: 'Scheduled Transport' },
    { area: 'South Delhi & Chattarpur', focus: 'Luxury Weddings & Fine Dining', delivery: 'Scheduled Transport' },
    { area: 'Gurugram (Cyber Hub/Golf Course)', focus: 'Corporate IT & Premium Nightlife', delivery: 'Scheduled Transport' },
    { area: 'Aerocity', focus: '5-Star Hospitality & Transit Hotels', delivery: 'Scheduled Transport' },
    { area: 'Noida & Greater Noida', focus: 'Corporate Parks & Exhibitions', delivery: 'Scheduled Transport' },
  ],
  qaData: [
    { q: 'How does logistics work for delivering custom water bottles to Delhi NCR?', a: 'We utilise a dedicated national freight network from our Maharashtra facility. Orders for Delhi, Gurugram, and Noida are dispatched via scheduled heavy transport, ensuring safe and cost-effective delivery for bulk B2B orders.' },
    { q: 'Can we order custom bottles for a large wedding in Chattarpur?', a: 'Yes. We frequently supply bespoke branded bottles (both PET and Glass) for luxury weddings. We recommend placing event orders at least 3-4 weeks in advance to allow time for design, production, and interstate transit.' },
    { q: 'Are your products compliant for use in government and diplomatic events?', a: 'Absolutely. Our water is BIS certified and produced in a central FSSAI-licensed facility. It meets all national regulatory standards required for official government and diplomatic catering.' },
    { q: 'What is the most popular product for Gurugram corporate offices?', a: 'For daily employee use, our premium custom-labeled PET bottles are highly popular due to their cost-effectiveness. For boardrooms and executive suites in Cyber Hub, our Classic and Signature Glass series with logo etching are the preferred choice.' }
  ],
  ctaHeading: (
    <>
      Elevate Your Brand in <br className="hidden md:block" />
      <span className="text-brand-secondary">Delhi NCR</span>
    </>
  ),
  ctaDesc: "Get a personalised B2B quote with freight estimates to Delhi, Gurugram, or Noida within 2 hours. Minimum 500 bottles.",
};
