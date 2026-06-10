import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/global/Footer';
import InViewLoader from '@/components/ui/InViewLoader';
import { EnterpriseOnboardingDynamic } from '@/components/layout/DynamicWrappers';
import MumbaiHotelsContent from '@/components/sections/mumbai/MumbaiHotelsContent';
import Link from 'next/link';

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Custom Branded Water Bottles for Hotels in Mumbai | PureHarvest',
  description:
    'Elevate every guest suite with premium custom-branded glass water bottles for Mumbai hotels. Logo etching, custom labels, and bespoke packaging for 5-star properties in BKC, South Mumbai, Juhu, and Powai. BIS & FSSAI Certified. MOQ 500 units.',
  keywords: [
    'custom water bottles for hotels mumbai',
    'hotel room water bottles mumbai',
    'luxury hotel branded water mumbai',
    'hotel amenity water bottles',
    '5 star hotel water bottles india',
    'branded glass water bottles hotels',
    'custom logo hotel water mumbai',
    'hotel water branding south mumbai',
    'bkc hotel water supplier',
    'hospitality water bottles maharashtra',
    'fssai compliant hotel water mumbai',
    'glass water bottles for hotel rooms',
  ].join(', '),
  alternates: { canonical: 'https://pureharvest.in/mumbai/hotels' },
  openGraph: {
    title: 'Custom Branded Water Bottles for Hotels in Mumbai | PureHarvest',
    description: 'Premium branded glass water bottles for luxury hotels in Mumbai. Logo etching, fast delivery, FSSAI certified. MOQ 500 units.',
    url: 'https://pureharvest.in/mumbai/hotels',
    images: [{ url: 'https://pureharvest.in/og-image.jpg', width: 1200, height: 630 }],
    siteName: 'PureHarvest Enterprises',
    locale: 'en_IN',
    type: 'website',
  },
};

// ─── Schema: FAQPage (AEO-Optimized) ─────────────────────────────────────────
const hotelFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of branded water bottles do you offer for Mumbai hotels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer borosilicate glass bottles (Signature Series), clarity glass bottles (Classic Series), and premium PET bottles — all customizable with logo etching, label printing, or screen printing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does custom hotel branding take for Mumbai properties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard label printing takes 5–7 business days. Logo etching or screen printing takes 10–14 business days after artwork approval. Delivery within Mumbai takes an additional 24-48 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get a sample before ordering for our Mumbai hotel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We dispatch samples to Mumbai hotel procurement teams upon request. Contact us on WhatsApp at +91 81491 74975 to arrange a sample drop-off.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum order quantity (MOQ) for hotels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The MOQ is 500 units. This low threshold is perfect for boutique hotels in Juhu or Bandra to pilot the program, while large 5-star properties typically order in volumes of 5,000+ units.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the bottles FSSAI compliant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all our bottles are filled with 10-stage purified water in an FSSAI-licensed facility (License: 22724024000854) and are BIS certified, ensuring full compliance for hotel F&B service.',
      },
    },
  ],
};

// ─── Schema: BreadcrumbList ──────────────────────────────────────────────────
const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pureharvest.in' },
    { '@type': 'ListItem', position: 2, name: 'Mumbai', item: 'https://pureharvest.in/mumbai' },
    { '@type': 'ListItem', position: 3, name: 'Hotels', item: 'https://pureharvest.in/mumbai/hotels' },
  ],
};

// ─── Schema: Service (Hotel specific) ────────────────────────────────────────
const hotelServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Hotel Custom Branded Water Supply',
  name: 'PureHarvest Mumbai Hotel Water Programme',
  provider: { '@type': 'Organization', name: 'PureHarvest Enterprises', url: 'https://pureharvest.in' },
  description: 'Premium custom-branded glass and PET water bottle supply specifically designed for 5-star luxury hotels, boutique properties, and resorts in Mumbai. Includes logo etching, custom labelling, and recurring delivery.',
  areaServed: [
    'South Mumbai', 'BKC', 'Juhu', 'Powai', 'Andheri', 'Worli', 'Lower Parel', 'Mumbai'
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 500, unitCode: 'C62' }
  }
};


export default function MumbaiHotelsPage() {
  return (
    <main className="min-h-screen bg-brand-primary overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelServiceSchema) }} />

      <Hero industry="Hotels" location="Mumbai" />

      {/* Breadcrumb Nav */}
      <nav className="bg-white border-b border-gray-100 py-3" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/mumbai" className="hover:text-brand-secondary transition-colors">Mumbai</Link>
          <span>/</span>
          <span className="text-brand-accent font-bold">Hotels</span>
        </div>
      </nav>

      <MumbaiHotelsContent />

      {/* Internal cross-links */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-gray-400 text-xs uppercase tracking-[0.25em] font-bold mb-5">Explore Other Mumbai Solutions</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/mumbai" className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-brand-secondary hover:text-brand-secondary transition-colors">All Mumbai Solutions</Link>
            <Link href="/mumbai/restaurants" className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-brand-secondary hover:text-brand-secondary transition-colors">Mumbai Restaurants</Link>
            <Link href="/mumbai/corporate" className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-brand-secondary hover:text-brand-secondary transition-colors">Mumbai Corporate</Link>
            <Link href="/hotels" className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-brand-secondary hover:text-brand-secondary transition-colors">Hotels (All India)</Link>
          </div>
        </div>
      </section>

      <InViewLoader fallback={<div className="h-24" />} rootMargin="600px">
        <EnterpriseOnboardingDynamic />
      </InViewLoader>
      <Footer />
    </main>
  );
}
