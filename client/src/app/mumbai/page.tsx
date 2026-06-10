import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/global/Footer';
import InViewLoader from '@/components/ui/InViewLoader';
import { EnterpriseOnboardingDynamic } from '@/components/layout/DynamicWrappers';
import MumbaiContent from '@/components/sections/mumbai/MumbaiContent';

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Custom Branded Glass Water Bottles in Mumbai | PureHarvest Enterprises',
  description:
    'PureHarvest — Mumbai\'s premium custom-branded glass and PET water bottle supplier. Serving 5-star hotels, fine dining restaurants, corporate offices, cafés, and events across BKC, Andheri, South Mumbai, Powai, Worli, Lower Parel & Navi Mumbai. BIS Approved. FSSAI Certified. MOQ 500 units. Delivery in 24–48 hrs.',
  keywords: [
    'custom glass water bottles mumbai',
    'branded water bottles mumbai',
    'premium bottled water mumbai',
    'corporate water bottles mumbai',
    'hotel water bottles mumbai',
    'custom water bottles bkc',
    'branded water andheri',
    'custom water bottles south mumbai',
    'restaurant water bottles mumbai',
    'cafe water bottles mumbai',
    'corporate branded water powai',
    'event water bottles lower parel',
    'luxury water bottles worli',
    'branded packaged drinking water maharashtra',
    'custom logo water bottle mumbai',
    'bulk branded water mumbai',
    'water bottle supplier mumbai',
    'fssai certified water bottles mumbai',
    'bis approved water bottles india',
    'navi mumbai water bottle supplier',
  ].join(', '),
  alternates: { canonical: 'https://pureharvest.in/mumbai' },
  openGraph: {
    title: 'Custom Branded Glass Water Bottles in Mumbai | PureHarvest',
    description:
      'Premium custom-branded glass water bottles for hotels, restaurants, and corporates across Mumbai. MOQ 500 units. Delivery 24–48 hrs. BIS Approved. FSSAI Certified.',
    url: 'https://pureharvest.in/mumbai',
    siteName: 'PureHarvest Enterprises',
    locale: 'en_IN',
    type: 'website',
    images: [
      { url: 'https://pureharvest.in/og-image.jpg', width: 1200, height: 630, alt: 'PureHarvest Custom Branded Water Bottles Mumbai' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Branded Water Bottles Mumbai | PureHarvest',
    description: 'Premium custom-branded glass water bottles for Mumbai hotels, restaurants, and corporates. MOQ 500 units.',
    images: ['https://pureharvest.in/og-image.jpg'],
  },
};

// ─── Schema: LocalBusiness (Mumbai-specific) ─────────────────────────────────
const mumbaiLocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://pureharvest.in/mumbai#business',
  name: 'PureHarvest Enterprises — Mumbai',
  alternateName: 'PureHarvest Mumbai',
  description:
    "PureHarvest Enterprises is Maharashtra's leading supplier of premium custom-branded glass and PET water bottles, serving luxury hotels, corporate offices, fine dining restaurants, specialty cafés, and events across Mumbai including BKC, South Mumbai, Andheri, Powai, Worli, Lower Parel, Juhu, and Navi Mumbai.",
  url: 'https://pureharvest.in/mumbai',
  telephone: '+91-8149174975',
  email: 'hello@pureharvestenterprises.com',
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Bank Transfer, UPI',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  areaServed: [
    { '@type': 'City', name: 'Mumbai', sameAs: 'https://en.wikipedia.org/wiki/Mumbai' },
    { '@type': 'Neighborhood', name: 'Bandra Kurla Complex' },
    { '@type': 'Neighborhood', name: 'South Mumbai' },
    { '@type': 'Neighborhood', name: 'Nariman Point' },
    { '@type': 'Neighborhood', name: 'Andheri' },
    { '@type': 'Neighborhood', name: 'Powai' },
    { '@type': 'Neighborhood', name: 'Juhu' },
    { '@type': 'Neighborhood', name: 'Worli' },
    { '@type': 'Neighborhood', name: 'Lower Parel' },
    { '@type': 'Neighborhood', name: 'Bandra' },
    { '@type': 'Neighborhood', name: 'Goregaon' },
    { '@type': 'City', name: 'Navi Mumbai' },
    { '@type': 'City', name: 'Thane' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mumbai Custom Water Bottle Solutions',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hotel Branded Water Bottles Mumbai', url: 'https://pureharvest.in/mumbai/hotels' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Restaurant Custom Water Bottles Mumbai', url: 'https://pureharvest.in/mumbai/restaurants' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Branded Water Mumbai', url: 'https://pureharvest.in/mumbai/corporate' } },
    ],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-8149174975',
    contactType: 'sales',
    areaServed: 'Mumbai',
    availableLanguage: ['en', 'hi', 'mr'],
  },
  sameAs: [
    'https://www.instagram.com/pure_harvest.enterprise',
    'https://wa.me/918149174975',
  ],
};

// ─── Schema: Product — Signature Series (Mumbai) ─────────────────────────────
const signatureProductSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Signature Series — Custom Branded Borosilicate Glass Water Bottle',
  brand: { '@type': 'Brand', name: 'PureHarvest Enterprises' },
  manufacturer: {
    '@type': 'Organization',
    name: 'PureHarvest Enterprises',
    address: { '@type': 'PostalAddress', addressLocality: 'Badlapur', addressRegion: 'Maharashtra', addressCountry: 'IN' },
  },
  description:
    'Premium borosilicate glass water bottle featuring a 10-stage purified water fill and custom B2B branding. Available with logo etching, full-colour label printing, or organic screen printing. Designed for 5-star hotels, corporate boardrooms, and fine dining restaurants in Mumbai.',
  image: 'https://pureharvest.in/og-image.jpg',
  category: 'Custom Branded Packaged Drinking Water',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'PureHarvest Enterprises' },
    eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 500, unitCode: 'C62' },
  },
};

// ─── Schema: Product — Classic Series (Mumbai) ───────────────────────────────
const classicProductSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Classic Series — Custom Branded Clarity Glass Water Bottle',
  brand: { '@type': 'Brand', name: 'PureHarvest Enterprises' },
  description:
    'High-durability clarity glass water bottle with brushed silver cap and custom label printing. Ideal for restaurants, cafés, corporate events, and hospitality venues across Mumbai and Maharashtra.',
  image: 'https://pureharvest.in/og-image.jpg',
  category: 'Custom Branded Packaged Drinking Water',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'PureHarvest Enterprises' },
    eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 500, unitCode: 'C62' },
  },
};

// ─── Schema: FAQPage (AEO-optimized, 10 questions) ───────────────────────────
const mumbaiFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are custom branded water bottles?',
      acceptedAnswer: { '@type': 'Answer', text: 'Custom branded water bottles are premium glass or PET water bottles printed, labelled, or etched with your business logo, brand colours, and custom messaging. Used as in-room hotel amenities, restaurant table water, corporate boardroom accessories, and event gifting items.' },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum order quantity for custom water bottles in Mumbai?',
      acceptedAnswer: { '@type': 'Answer', text: 'The minimum order quantity for custom branded water bottles in Mumbai is 500 units. Volume discounts apply for orders above 1,000 and 5,000 units.' },
    },
    {
      '@type': 'Question',
      name: 'How long does delivery of branded water bottles take in Mumbai?',
      acceptedAnswer: { '@type': 'Answer', text: 'Label orders: 5–7 business days. Screen print: 8–12 days. Logo etching: 10–14 days. After production, Mumbai delivery takes an additional 24–48 hours.' },
    },
    {
      '@type': 'Question',
      name: 'Can Mumbai hotels get logos etched on glass water bottles?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We offer permanent logo etching directly on borosilicate glass, full-colour label printing, and organic screen printing for all Mumbai hotel properties.' },
    },
    {
      '@type': 'Question',
      name: 'Are PureHarvest water bottles FSSAI and BIS certified?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our facility is FSSAI licensed (License No: 22724024000854) and all products are BIS certified. GST No: 27GVMPD4986B1ZA. Fully compliant for food service across Maharashtra.' },
    },
    {
      '@type': 'Question',
      name: 'Why should Mumbai businesses choose glass over plastic water bottles?',
      acceptedAnswer: { '@type': 'Answer', text: 'Glass signals premium quality, has zero taste impact, is 100% reusable, exempt from Maharashtra plastic bans, and is photographed and shared by guests — creating organic brand visibility at zero extra cost.' },
    },
    {
      '@type': 'Question',
      name: 'Do you deliver to BKC, Andheri, Powai, and South Mumbai?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We deliver across all Mumbai districts including BKC, South Mumbai, Nariman Point, Andheri East and West, Powai, Worli, Lower Parel, Juhu, Bandra, Navi Mumbai, and Thane within 24–48 hours of dispatch.' },
    },
    {
      '@type': 'Question',
      name: 'What water purification process do you use?',
      acceptedAnswer: { '@type': 'Answer', text: 'A 10-stage process: Sediment Filtration → Pre-Carbon → Microfiltration → Reverse Osmosis → Post-Carbon → UV Treatment → Ultra-filtration → Ozonisation → Mineralisation → Final Quality Check.' },
    },
    {
      '@type': 'Question',
      name: 'Do you offer recurring corporate delivery contracts for Mumbai offices?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Monthly and quarterly supply contracts are available for corporate offices in BKC, Powai, Andheri SEEPZ, Lower Parel, and Navi Mumbai. Auto-replenishment — no manual reordering required.' },
    },
    {
      '@type': 'Question',
      name: 'What is the pricing for custom branded water bottles in Mumbai?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pricing depends on bottle type, customisation method, and volume. We provide personalised B2B quotes within 2 hours on business days. WhatsApp +91 81491 74975 or email hello@pureharvestenterprises.com.' },
    },
  ],
};

// ─── Schema: BreadcrumbList ──────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pureharvest.in' },
    { '@type': 'ListItem', position: 2, name: 'Mumbai', item: 'https://pureharvest.in/mumbai' },
  ],
};

// ─── Schema: Service ─────────────────────────────────────────────────────────
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Custom Branded Packaged Drinking Water — Mumbai',
  name: 'PureHarvest Mumbai Water Branding Service',
  provider: { '@type': 'Organization', name: 'PureHarvest Enterprises', url: 'https://pureharvest.in' },
  description:
    'End-to-end custom branded water bottle service for Mumbai businesses: artwork design support, production, and pan-Mumbai delivery. Serving hotels, restaurants, corporate offices, cafés, and events.',
  areaServed: [
    'BKC', 'South Mumbai', 'Andheri', 'Powai', 'Worli', 'Lower Parel',
    'Juhu', 'Bandra', 'Goregaon', 'Navi Mumbai', 'Thane', 'Mumbai',
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://pureharvest.in/mumbai',
    servicePhone: '+91-8149174975',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function MumbaiPage() {
  return (
    <main className="min-h-screen bg-brand-primary overflow-hidden">
      {/* All structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mumbaiLocalBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(signatureProductSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(classicProductSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mumbaiFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero — dynamic H1: "PREMIUM CUSTOM WATER BOTTLE" in Mumbai */}
      <Hero location="Mumbai" />

      {/* 9-section authority content */}
      <MumbaiContent />

      {/* Enterprise Inquiry Form */}
      <InViewLoader fallback={<div className="h-32" />} rootMargin="800px">
        <EnterpriseOnboardingDynamic />
      </InViewLoader>

      <Footer />
    </main>
  );
}
