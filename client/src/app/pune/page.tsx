import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/global/Footer';
import InViewLoader from '@/components/ui/InViewLoader';
import { EnterpriseOnboardingDynamic } from '@/components/layout/DynamicWrappers';
import Link from 'next/link';

const PuneContent = dynamic(() => import('@/components/sections/pune/PuneContent'), {
  ssr: true,
});

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Custom Branded Water Bottles in Pune | PureHarvest Enterprises',
  description:
    'Pune\'s premium supplier of custom-branded glass and PET water bottles for hotels, IT parks, and restaurants. Serving Hinjewadi, Koregaon Park, and Magarpatta. BIS & FSSAI Certified. MOQ 500 units.',
  keywords: [
    'custom water bottles pune',
    'branded glass water bottles pune',
    'hotel water bottles pune',
    'corporate water delivery hinjewadi',
    'branded table water koregaon park',
    'custom logo water bottles maharashtra',
    'fssai certified water pune',
    'restaurant water bottles pune',
  ].join(', '),
  alternates: { canonical: 'https://pureharvest.in/pune' },
  openGraph: {
    title: 'Custom Branded Water Bottles in Pune | PureHarvest',
    description: 'Premium custom-branded glass water bottles for hotels, restaurants, and IT parks across Pune. MOQ 500 units. BIS & FSSAI Certified.',
    url: 'https://pureharvest.in/pune',
    siteName: 'PureHarvest Enterprises',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://pureharvest.in/og-image.jpg', width: 1200, height: 630 }],
  },
};

// ─── Schema: LocalBusiness (Pune-specific) ───────────────────────────────────
const puneLocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://pureharvest.in/pune#business',
  name: 'PureHarvest Enterprises — Pune',
  alternateName: 'PureHarvest Pune',
  description:
    "PureHarvest Enterprises supplies premium custom-branded glass and PET water bottles to luxury hotels, corporate IT parks, and restaurants across Pune, including Hinjewadi, Koregaon Park, Magarpatta, Baner, and Lonavala.",
  url: 'https://pureharvest.in/pune',
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
    { '@type': 'City', name: 'Pune', sameAs: 'https://en.wikipedia.org/wiki/Pune' },
    { '@type': 'Neighborhood', name: 'Hinjewadi' },
    { '@type': 'Neighborhood', name: 'Koregaon Park' },
    { '@type': 'Neighborhood', name: 'Kalyani Nagar' },
    { '@type': 'Neighborhood', name: 'Magarpatta' },
    { '@type': 'Neighborhood', name: 'Baner' },
    { '@type': 'Neighborhood', name: 'Kharadi' },
    { '@type': 'Neighborhood', name: 'Viman Nagar' },
    { '@type': 'City', name: 'Lonavala' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pune Custom Water Bottle Solutions',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pune Hotel Branded Water Bottles' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pune Corporate Office Branded Water' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pune Restaurant Custom Water Bottles' } },
    ],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-8149174975',
    contactType: 'sales',
    areaServed: 'Pune',
    availableLanguage: ['en', 'hi', 'mr'],
  },
};

// ─── Schema: FAQPage (Pune-specific) ─────────────────────────────────────────
const puneFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the delivery time for custom water bottles to Pune?',
      acceptedAnswer: { '@type': 'Answer', text: 'Once your custom label or etching is produced, delivery from our Badlapur facility to Pune typically takes 36 to 48 hours.' }
    },
    {
      '@type': 'Question',
      name: 'Do you deliver to IT Parks in Hinjewadi and Magarpatta?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, we have regular logistics routes servicing all major IT and business parks across Pune for our corporate clients.' }
    },
    {
      '@type': 'Question',
      name: 'Is the 500 unit MOQ applicable to Pune orders?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, the minimum order quantity of 500 units applies to all custom branded orders delivered to Pune.' }
    },
    {
      '@type': 'Question',
      name: 'Can resorts near Pune (like Lonavala) order custom glass bottles?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. We supply several premium resorts and wellness retreats in Lonavala, Khandala, and Mahabaleshwar.' }
    }
  ],
};

// ─── Schema: BreadcrumbList ──────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pureharvest.in' },
    { '@type': 'ListItem', position: 2, name: 'Pune', item: 'https://pureharvest.in/pune' },
  ],
};

export default function PunePage() {
  return (
    <main className="min-h-screen bg-brand-primary overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(puneLocalBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(puneFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Hero location="Pune" />
      
      <nav className="bg-white border-b border-gray-100 py-3" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-accent font-bold">Pune</span>
        </div>
      </nav>

      <PuneContent />

      <InViewLoader fallback={<div className="h-32" />} rootMargin="800px">
        <EnterpriseOnboardingDynamic />
      </InViewLoader>

      <Footer />
    </main>
  );
}
