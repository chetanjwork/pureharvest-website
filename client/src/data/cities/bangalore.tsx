import { Building2, UtensilsCrossed, Briefcase, Leaf, TrendingUp, GlassWater, MapPin } from 'lucide-react';
import React from 'react';
import type { CityHubData } from '@/components/templates/CityHubTemplate';

export const bangaloreData: CityHubData = {
  city: 'Bangalore',
  stats: [
    { value: 'Pan-India', label: 'Logistics' },
    { value: '500+', label: 'Min. Order Qty' },
    { value: '10-Stage', label: 'Purification' },
    { value: 'BIS & FSSAI', label: 'Certified' },
  ],
  marketIcon: TrendingUp,
  marketHeading: (
    <>
      Elevating Hydration in <br />
      <span className="text-brand-secondary">India&apos;s Tech Capital</span>
    </>
  ),
  marketDesc: "From unicorn startup boardrooms in Koramangala to luxury hotels in UB City, Bangalore's businesses demand premium brand touchpoints. PureHarvest delivers bespoke water solutions that align with the city's high standards.",
  marketOverview: [
    {
      icon: Building2,
      title: 'Startups & Unicorns',
      body: "Bangalore, India's Silicon Valley, is home to the highest concentration of unicorns and tech startups. These modern offices in Koramangala, HSR Layout, and Indiranagar are replacing generic water dispensers with premium custom-branded water to elevate their employee experience and impress international investors.",
    },
    {
      icon: Leaf,
      title: 'ESG & Sustainability',
      body: "With a strong focus on environmental sustainability, Bangalore's corporate sector is actively moving away from single-use plastics. PureHarvest's 100% reusable, premium borosilicate glass bottles offer an elegant solution that perfectly aligns with stringent corporate ESG mandates.",
    },
    {
      icon: UtensilsCrossed,
      title: 'Premium Café Culture',
      body: "The specialty coffee and fine dining scene in Bangalore is highly competitive. Custom-labeled water bottles allow cafes and restaurants in UB City and Indiranagar to extend their brand identity to the table setting, creating highly photographable moments for social media.",
    },
    {
      icon: TrendingUp,
      title: 'MICE & Tech Events',
      body: "Bangalore hosts hundreds of major tech conferences, product launches, and developer summits annually. Event organisers use PureHarvest's branded PET and Glass solutions as a high-visibility sponsorship asset and premium attendee amenity.",
    },
  ],
  industryIcon: GlassWater,
  industryHeading: (
    <>
      Targeted Solutions for <br />
      <span className="text-brand-secondary">Bangalore Businesses</span>
    </>
  ),
  industries: [
    {
      icon: Briefcase,
      title: 'Corporate HQ & IT Parks',
      desc: "Recurring supply for executive boardrooms and cafeterias in Electronic City, Whitefield, and Outer Ring Road.",
      bg: 'bg-slate-50', border: 'border-slate-100', accent: 'text-slate-700',
    },
    {
      icon: Building2,
      title: 'Luxury Hotels',
      desc: "Premium glass bottles with elegant logo etching for 5-star properties catering to international business travelers.",
      bg: 'bg-blue-50', border: 'border-blue-100', accent: 'text-blue-700',
    },
    {
      icon: UtensilsCrossed,
      title: 'Fine Dining & Microbreweries',
      desc: "Elevating table service with waterproof custom labels that survive condensation and ice buckets.",
      bg: 'bg-amber-50', border: 'border-amber-100', accent: 'text-amber-700',
    },
  ],
  locationIcon: MapPin,
  locationHeading: (
    <>
      Supplying Bangalore&apos;s <br />
      <span className="text-brand-secondary">Key Commercial Hubs</span>
    </>
  ),
  locations: [
    { area: 'Koramangala & Indiranagar', focus: 'Startups, Cafes & Dining', delivery: 'Scheduled Transport' },
    { area: 'Whitefield & ORR', focus: 'Multinational IT Parks', delivery: 'Scheduled Transport' },
    { area: 'Electronic City', focus: 'Corporate Campuses', delivery: 'Scheduled Transport' },
    { area: 'UB City & CBD', focus: 'Luxury Hotels & Fine Dining', delivery: 'Scheduled Transport' },
  ],
  qaData: [
    { q: 'Do you supply custom water bottles to Bangalore from your Maharashtra facility?', a: 'Yes. While our state-of-the-art purification and bottling facility is in Badlapur, Maharashtra, we have a robust national logistics network that services bulk and recurring orders for Bangalore-based corporate and hospitality clients.' },
    { q: 'What is the minimum order quantity for Bangalore deliveries?', a: 'The MOQ remains 500 units. However, due to interstate transport logistics, many of our Bangalore clients opt for larger bulk orders (2,000+ units) or scheduled monthly recurring contracts to optimise freight costs.' },
    { q: 'Are the bottles FSSAI certified for use in Karnataka?', a: 'Absolutely. Our central facility holds a central FSSAI license (No: 22724024000854) and BIS certification, making our packaged drinking water fully compliant for commercial service anywhere in India, including Karnataka.' },
    { q: 'How do you handle breakages during interstate transport?', a: 'We use highly specialised, multi-layered corrugated packaging designed specifically for safe glass transport across India. Breakage rates are near zero, but any transit damages are fully covered and credited by PureHarvest.' }
  ],
  ctaHeading: (
    <>
      Ready to Upgrade Your <br className="hidden md:block" />
      <span className="text-brand-secondary">Bangalore Operations?</span>
    </>
  ),
  ctaDesc: "Get a personalised B2B quote with freight estimates to Bangalore within 2 hours. Minimum 500 bottles.",
};
