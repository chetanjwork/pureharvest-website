import { Building2, UtensilsCrossed, Briefcase, Leaf, TrendingUp, GlassWater, MapPin } from 'lucide-react';
import React from 'react';
import type { CityHubData } from '@/components/templates/CityHubTemplate';

export const puneData: CityHubData = {
  city: 'Pune',
  stats: [
    { value: '36–48 hrs', label: 'Pune Delivery' },
    { value: '500+', label: 'Min. Order Qty' },
    { value: '10-Stage', label: 'Purification' },
    { value: 'BIS & FSSAI', label: 'Certified' },
  ],
  marketIcon: TrendingUp,
  marketHeading: (
    <>
      Why Pune Businesses Choose <br />
      <span className="text-brand-secondary">Premium Branded Water</span>
    </>
  ),
  marketDesc: "As Pune grows as a major IT and culinary hub, the demand for premium brand touchpoints has skyrocketed. PureHarvest provides the city's leading hotels, tech firms, and restaurants with a hydration experience that matches their ambition.",
  marketOverview: [
    {
      icon: Building2,
      title: 'Hospitality Growth in Pune',
      body: "Pune's hospitality sector is rapidly expanding, with premium properties established in Koregaon Park, Kalyani Nagar, and Hinjewadi. As the city attracts more international business travelers, the expectation for premium in-room amenities has risen. Branded glass water bottles are now a core standard for 5-star properties across Pune.",
    },
    {
      icon: Briefcase,
      title: 'Tech Park Demand',
      body: "With major IT hubs in Hinjewadi, Magarpatta, and Kharadi, Pune's corporate sector demands high-quality, reliable hydration solutions. PureHarvest supplies recurring branded water to corporate boardrooms and employee cafeterias, ensuring startups and multinational corporations alike project a premium brand image.",
    },
    {
      icon: Leaf,
      title: 'Sustainability Focus',
      body: "Aligned with Maharashtra's strict plastic regulations, Pune businesses are actively seeking eco-friendly alternatives. PureHarvest's 100% reusable borosilicate glass bottles offer an elegant, sustainable solution that meets corporate ESG mandates while elevating the guest experience.",
    },
    {
      icon: TrendingUp,
      title: 'Premium Dining Culture',
      body: "Pune's culinary scene, especially in Koregaon Park and Baner, is increasingly sophisticated. Fine dining operators recognise that custom-label table water is a high-impact differentiator. A bespoke PureHarvest bottle on the table signals culinary ambition and enhances the overall dining aesthetic.",
    },
  ],
  industryIcon: GlassWater,
  industryHeading: (
    <>
      Serving Pune&apos;s Top <br />
      <span className="text-brand-secondary">Commercial Sectors</span>
    </>
  ),
  industries: [
    {
      icon: Building2,
      title: 'Hotels & Resorts',
      desc: "Supplying Pune's top hotels and nearby resorts in Lonavala and Mahabaleshwar with premium glass bottles, complete with logo etching for a luxurious in-room experience.",
      bg: 'bg-blue-50', border: 'border-blue-100', accent: 'text-blue-700',
    },
    {
      icon: UtensilsCrossed,
      title: 'Restaurants & Cafés',
      desc: "Elevating table service in Pune's vibrant dining hubs like Koregaon Park and Baner with full-colour custom labels that match your interior design.",
      bg: 'bg-amber-50', border: 'border-amber-100', accent: 'text-amber-700',
    },
    {
      icon: Briefcase,
      title: 'Corporate IT Parks',
      desc: "Recurring delivery of branded water to corporate offices in Hinjewadi, Magarpatta, and Kharadi. Perfect for boardrooms and client meetings.",
      bg: 'bg-slate-50', border: 'border-slate-100', accent: 'text-slate-700',
    },
  ],
  locationIcon: MapPin,
  locationHeading: (
    <>
      Delivery Across <br />
      <span className="text-brand-secondary">Pune & Surrounding Hubs</span>
    </>
  ),
  locations: [
    { area: 'Koregaon Park & Kalyani Nagar', focus: 'Premium Dining & Boutique Hotels', delivery: '36-48 hrs' },
    { area: 'Hinjewadi IT Park', focus: 'Corporate Offices & Tech Events', delivery: '36-48 hrs' },
    { area: 'Magarpatta & Kharadi', focus: 'Business Centers & Fast Casual', delivery: '36-48 hrs' },
    { area: 'Baner & Balewadi', focus: 'High-End Residential & Cafes', delivery: '36-48 hrs' },
    { area: 'Lonavala (Outskirts)', focus: 'Luxury Resorts & Weekend Retreats', delivery: '48-72 hrs' },
  ],
  qaData: [
    { q: 'What is the delivery time for custom water bottles to Pune?', a: 'Once your custom label or etching is produced, delivery from our Badlapur facility to Pune typically takes 36 to 48 hours.' },
    { q: 'Do you deliver to IT Parks in Hinjewadi and Magarpatta?', a: 'Yes, we have regular logistics routes servicing all major IT and business parks across Pune for our corporate clients.' },
    { q: 'Is the 500 unit MOQ applicable to Pune orders?', a: 'Yes, the minimum order quantity of 500 units applies to all custom branded orders delivered to Pune.' },
    { q: 'Can resorts near Pune (like Lonavala) order custom glass bottles?', a: 'Absolutely. We supply several premium resorts and wellness retreats in Lonavala, Khandala, and Mahabaleshwar.' }
  ],
  ctaHeading: (
    <>
      Ready to Brand Your Water<br className="hidden md:block" />
      <span className="text-brand-secondary"> in Pune?</span>
    </>
  ),
  ctaDesc: "Get a personalised B2B quote within 2 hours. Minimum 500 bottles. Reliable delivery to Pune and surrounding areas.",
};
