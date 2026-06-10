import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/global/Footer';
import InViewLoader from '@/components/ui/InViewLoader';
import { EnterpriseOnboardingDynamic } from '@/components/layout/DynamicWrappers';
import Link from 'next/link';

const DelhiContent = dynamic(() => import('@/components/sections/delhi/DelhiContent'), {
  ssr: true,
});

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Custom Branded Water Bottles in Delhi NCR | PureHarvest Enterprises',
  description:
    'Premium custom-branded glass and PET water bottles for Delhi NCR. Serving luxury hotels in Aerocity, corporate offices in Gurugram, and premium events in Chattarpur. BIS & FSSAI Certified.',
  keywords: [
    'custom water bottles delhi',
    'branded glass water bottles ncr',
    'corporate water delivery gurugram',
    'hotel water bottles aerocity',
    'custom logo water bottles noida',
    'wedding water bottles chattarpur',
    'fssai certified water delhi ncr',
    'restaurant water bottles connaught place',
  ].join(', '),
  alternates: { canonical: 'https://pureharvest.in/delhi' },
  openGraph: {
    title: 'Custom Branded Water Bottles in Delhi NCR | PureHarvest',
    description: 'Premium custom-branded glass water bottles for corporate offices, IT parks, and luxury hotels across Delhi, Gurugram, and Noida.',
    url: 'https://pureharvest.in/delhi',
    siteName: 'PureHarvest Enterprises',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://pureharvest.in/og-image.jpg', width: 1200, height: 630 }],
  },
};

// ─── Schema: LocalBusiness (Delhi-specific) ──────────────────────────────────
const delhiLocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://pureharvest.in/delhi#business',
  name: 'PureHarvest Enterprises — Delhi NCR Supply',
  alternateName: 'PureHarvest Delhi NCR',
  description:
    "PureHarvest Enterprises supplies premium custom-branded glass and PET water bottles to corporate offices, luxury hotels, fine dining restaurants, and premium events across the Delhi National Capital Region (NCR), including Gurugram, Noida, Aerocity, and Connaught Place.",
  url: 'https://pureharvest.in/delhi',
  telephone: '+91-8149174975',
  email: 'hello@pureharvestenterprises.com',
  priceRange: '₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Bank Transfer, UPI',
  areaServed: [
    { '@type': 'City', name: 'Delhi', sameAs: 'https://en.wikipedia.org/wiki/Delhi' },
    { '@type': 'City', name: 'Gurugram' },
    { '@type': 'City', name: 'Noida' },
    { '@type': 'City', name: 'Greater Noida' },
    { '@type': 'Neighborhood', name: 'Aerocity' },
    { '@type': 'Neighborhood', name: 'Connaught Place' },
    { '@type': 'Neighborhood', name: 'South Delhi' },
    { '@type': 'Neighborhood', name: 'Chattarpur' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Delhi NCR Custom Water Bottle Solutions',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Delhi NCR Corporate Office Branded Water' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Delhi Wedding & Event Water Bottles' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Delhi Luxury Hotel Branded Water' } },
    ],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-8149174975',
    contactType: 'sales',
    areaServed: 'Delhi NCR',
    availableLanguage: ['en', 'hi'],
  },
};

// ─── Schema: FAQPage (Delhi-specific) ────────────────────────────────────────
const delhiFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does logistics work for delivering custom water bottles to Delhi NCR?',
      acceptedAnswer: { '@type': 'Answer', text: 'We utilise a dedicated national freight network from our Maharashtra facility. Orders for Delhi, Gurugram, and Noida are dispatched via scheduled heavy transport, ensuring safe and cost-effective delivery for bulk B2B orders.' }
    },
    {
      '@type': 'Question',
      name: 'Can we order custom bottles for a large wedding in Chattarpur?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We frequently supply bespoke branded bottles (both PET and Glass) for luxury weddings. We recommend placing event orders at least 3-4 weeks in advance to allow time for design, production, and interstate transit.' }
    },
    {
      '@type': 'Question',
      name: 'Are your products compliant for use in government and diplomatic events?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. Our water is BIS certified and produced in a central FSSAI-licensed facility. It meets all national regulatory standards required for official government and diplomatic catering.' }
    }
  ],
};

// ─── Schema: BreadcrumbList ──────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pureharvest.in' },
    { '@type': 'ListItem', position: 2, name: 'Delhi NCR', item: 'https://pureharvest.in/delhi' },
  ],
};

export default function DelhiPage() {
  return (
    <main className="min-h-screen bg-brand-primary overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(delhiLocalBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(delhiFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Hero location="Delhi NCR" />
      
      <nav className="bg-white border-b border-gray-100 py-3" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-accent font-bold">Delhi NCR</span>
        </div>
      </nav>

      <DelhiContent />

      <InViewLoader fallback={<div className="h-32" />} rootMargin="800px">
        <EnterpriseOnboardingDynamic />
      </InViewLoader>

      <Footer />
    </main>
  );
}
