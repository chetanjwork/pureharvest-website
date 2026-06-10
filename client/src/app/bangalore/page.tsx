import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/global/Footer';
import InViewLoader from '@/components/ui/InViewLoader';
import { EnterpriseOnboardingDynamic } from '@/components/layout/DynamicWrappers';
import Link from 'next/link';

const BangaloreContent = dynamic(() => import('@/components/sections/bangalore/BangaloreContent'), {
  ssr: true,
});

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Custom Branded Water Bottles in Bangalore | PureHarvest Enterprises',
  description:
    'Premium custom-branded glass and PET water bottles for Bangalore startups, corporate offices, and luxury hotels. Serving Koramangala, Indiranagar, Whitefield, and Electronic City. BIS & FSSAI Certified.',
  keywords: [
    'custom water bottles bangalore',
    'branded glass water bottles bangalore',
    'corporate water delivery whitefield',
    'startup water bottles koramangala',
    'hotel water bottles ub city',
    'custom logo water bottles karnataka',
    'fssai certified water bangalore',
    'restaurant water bottles indiranagar',
  ].join(', '),
  alternates: { canonical: 'https://pureharvest.in/bangalore' },
  openGraph: {
    title: 'Custom Branded Water Bottles in Bangalore | PureHarvest',
    description: 'Premium custom-branded glass water bottles for corporate offices, IT parks, and luxury hotels across Bangalore. BIS & FSSAI Certified.',
    url: 'https://pureharvest.in/bangalore',
    siteName: 'PureHarvest Enterprises',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://pureharvest.in/og-image.jpg', width: 1200, height: 630 }],
  },
};

// ─── Schema: LocalBusiness (Bangalore-specific) ──────────────────────────────
const bangaloreLocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://pureharvest.in/bangalore#business',
  name: 'PureHarvest Enterprises — Bangalore Supply',
  alternateName: 'PureHarvest Bangalore',
  description:
    "PureHarvest Enterprises supplies premium custom-branded glass and PET water bottles to startups, corporate IT parks, luxury hotels, and fine dining restaurants across Bangalore, including Koramangala, Indiranagar, Whitefield, and Electronic City.",
  url: 'https://pureharvest.in/bangalore',
  telephone: '+91-8149174975',
  email: 'hello@pureharvestenterprises.com',
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Bank Transfer, UPI',
  areaServed: [
    { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
    { '@type': 'Neighborhood', name: 'Koramangala' },
    { '@type': 'Neighborhood', name: 'Indiranagar' },
    { '@type': 'Neighborhood', name: 'Whitefield' },
    { '@type': 'Neighborhood', name: 'Electronic City' },
    { '@type': 'Neighborhood', name: 'HSR Layout' },
    { '@type': 'Neighborhood', name: 'UB City' },
    { '@type': 'Neighborhood', name: 'Outer Ring Road (ORR)' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Bangalore Custom Water Bottle Solutions',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bangalore Corporate Office Branded Water' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bangalore Tech Event Water Bottles' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bangalore Hotel Branded Water Bottles' } },
    ],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-8149174975',
    contactType: 'sales',
    areaServed: 'Bangalore',
    availableLanguage: ['en', 'hi'],
  },
};

// ─── Schema: FAQPage (Bangalore-specific) ────────────────────────────────────
const bangaloreFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you supply custom water bottles to Bangalore from your Maharashtra facility?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. While our state-of-the-art purification and bottling facility is in Badlapur, Maharashtra, we have a robust national logistics network that services bulk and recurring orders for Bangalore-based corporate and hospitality clients.' }
    },
    {
      '@type': 'Question',
      name: 'What is the minimum order quantity for Bangalore deliveries?',
      acceptedAnswer: { '@type': 'Answer', text: 'The MOQ remains 500 units. However, due to interstate transport logistics, many of our Bangalore clients opt for larger bulk orders (2,000+ units) or scheduled monthly recurring contracts to optimise freight costs.' }
    },
    {
      '@type': 'Question',
      name: 'Are the bottles FSSAI certified for use in Karnataka?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. Our central facility holds a central FSSAI license (No: 22724024000854) and BIS certification, making our packaged drinking water fully compliant for commercial service anywhere in India, including Karnataka.' }
    }
  ],
};

// ─── Schema: BreadcrumbList ──────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pureharvest.in' },
    { '@type': 'ListItem', position: 2, name: 'Bangalore', item: 'https://pureharvest.in/bangalore' },
  ],
};

export default function BangalorePage() {
  return (
    <main className="min-h-screen bg-brand-primary overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bangaloreLocalBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bangaloreFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Hero location="Bangalore" />
      
      <nav className="bg-white border-b border-gray-100 py-3" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-accent font-bold">Bangalore</span>
        </div>
      </nav>

      <BangaloreContent />

      <InViewLoader fallback={<div className="h-32" />} rootMargin="800px">
        <EnterpriseOnboardingDynamic />
      </InViewLoader>

      <Footer />
    </main>
  );
}
