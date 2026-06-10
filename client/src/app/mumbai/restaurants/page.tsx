import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/global/Footer';
import InViewLoader from '@/components/ui/InViewLoader';
import { EnterpriseOnboardingDynamic } from '@/components/layout/DynamicWrappers';
import MumbaiRestaurantsContent from '@/components/sections/mumbai/MumbaiRestaurantsContent';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Custom Branded Water Bottles for Restaurants in Mumbai | PureHarvest',
  description:
    'Replace generic table water with premium custom-label bottles for your Mumbai restaurant. Fine dining, QSRs, cloud kitchens, and cafés served across Worli, Bandra, Andheri, BKC & South Mumbai. FSSAI Certified. MOQ 500 units.',
  keywords: [
    'custom water bottles restaurants mumbai',
    'restaurant table water bottles',
    'branded water fine dining mumbai',
    'cafe custom water bottles andheri',
    'restaurant water branding worli',
    'qsr branded water bottles india',
    'cloud kitchen water bottles mumbai',
    'premium dining water bandra',
    'restaurant water label printing',
    'custom mineral water restaurants maharashtra',
    'fssai approved table water mumbai',
    'custom glass bottles for cafes',
  ].join(', '),
  alternates: { canonical: 'https://pureharvest.in/mumbai/restaurants' },
  openGraph: {
    title: 'Custom Branded Water Bottles for Restaurants in Mumbai | PureHarvest',
    description: 'Premium custom-label water bottles for Mumbai restaurants. Elevate every table setting. FSSAI Certified. MOQ 500 units.',
    url: 'https://pureharvest.in/mumbai/restaurants',
    images: [{ url: 'https://pureharvest.in/og-image.jpg', width: 1200, height: 630 }],
    siteName: 'PureHarvest Enterprises',
    locale: 'en_IN',
    type: 'website',
  },
};

const restaurantFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can restaurants in Mumbai get custom-label water bottles?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We offer custom label printing, screen printing, and logo etching on glass and PET bottles for restaurants of all sizes in Mumbai. Minimum order is 500 units.' },
    },
    {
      '@type': 'Question',
      name: 'Is the water FSSAI certified for restaurant table service?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. Our water undergoes a 10-stage purification process, is FSSAI licensed (No: 22724024000854), and BIS certified, making it fully compliant for restaurant table service across Maharashtra.' },
    },
    {
      '@type': 'Question',
      name: 'How quickly can I get branded water bottles for my Mumbai restaurant?',
      acceptedAnswer: { '@type': 'Answer', text: 'Standard label orders are ready in 5–7 business days. Rush delivery is available for events. Contact us on WhatsApp for priority handling. Regular reorders are delivered in 24-48 hours.' },
    },
    {
      '@type': 'Question',
      name: 'Do you offer glass bottles for fine dining restaurants?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, we specialize in premium borosilicate and clarity glass bottles that are shatter-resistant and 100% reusable, perfectly suited for fine dining and eliminating single-use plastic.' },
    },
    {
      '@type': 'Question',
      name: 'Can we print QR codes on the water bottle labels?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes! We can print a QR code linking directly to your digital menu, Instagram page, or loyalty program signup on the custom label.' },
    }
  ],
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pureharvest.in' },
    { '@type': 'ListItem', position: 2, name: 'Mumbai', item: 'https://pureharvest.in/mumbai' },
    { '@type': 'ListItem', position: 3, name: 'Restaurants', item: 'https://pureharvest.in/mumbai/restaurants' },
  ],
};

const restaurantServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Restaurant Custom Branded Water Supply',
  name: 'PureHarvest Mumbai Restaurant Water Programme',
  provider: { '@type': 'Organization', name: 'PureHarvest Enterprises', url: 'https://pureharvest.in' },
  description: 'Custom-branded glass and PET table water supply designed for fine dining restaurants, cafes, QSRs, and cloud kitchens in Mumbai. Features waterproof custom labeling and recurring delivery schedules.',
  areaServed: [
    'South Mumbai', 'BKC', 'Bandra', 'Andheri', 'Powai', 'Worli', 'Lower Parel', 'Mumbai'
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 500, unitCode: 'C62' }
  }
};

export default function MumbaiRestaurantsPage() {
  return (
    <main className="min-h-screen bg-brand-primary overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantServiceSchema) }} />

      <Hero industry="Restaurants" location="Mumbai" />

      <nav className="bg-white border-b border-gray-100 py-3" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/mumbai" className="hover:text-brand-secondary transition-colors">Mumbai</Link>
          <span>/</span>
          <span className="text-brand-accent font-bold">Restaurants</span>
        </div>
      </nav>

      <MumbaiRestaurantsContent />

      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-gray-400 text-xs uppercase tracking-[0.25em] font-bold mb-5">Explore Other Mumbai Solutions</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/mumbai" className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-brand-secondary hover:text-brand-secondary transition-colors">All Mumbai Solutions</Link>
            <Link href="/mumbai/hotels" className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-brand-secondary hover:text-brand-secondary transition-colors">Mumbai Hotels</Link>
            <Link href="/mumbai/corporate" className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-brand-secondary hover:text-brand-secondary transition-colors">Mumbai Corporate</Link>
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
