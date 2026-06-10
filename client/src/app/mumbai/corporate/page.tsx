import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/global/Footer';
import InViewLoader from '@/components/ui/InViewLoader';
import { EnterpriseOnboardingDynamic } from '@/components/layout/DynamicWrappers';
import MumbaiCorporateContent from '@/components/sections/mumbai/MumbaiCorporateContent';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Corporate Branded Water Bottles in Mumbai — BKC, Powai, Andheri | PureHarvest',
  description:
    'Premium corporate-branded water bottles for Mumbai offices. Recurring delivery to BKC, Powai, Andheri SEEPZ, Lower Parel & Navi Mumbai. Branded boardroom water for Fortune 500s and startups alike. FSSAI Certified. MOQ 500 units.',
  keywords: [
    'corporate water bottles mumbai',
    'branded water bkc offices',
    'office water supply powai',
    'corporate branded water andheri',
    'boardroom water bottles mumbai',
    'b2b water supply lower parel',
    'company branded water bottles india',
    'corporate event water mumbai',
    'navi mumbai office water supply',
    'bulk corporate water delivery maharashtra',
    'fssai certified corporate water',
  ].join(', '),
  alternates: { canonical: 'https://pureharvest.in/mumbai/corporate' },
  openGraph: {
    title: 'Corporate Branded Water Bottles in Mumbai | PureHarvest',
    description: 'Recurring branded water supply for Mumbai corporate offices and boardrooms. BKC, Powai, Andheri & Navi Mumbai. FSSAI Certified. MOQ 500 units.',
    url: 'https://pureharvest.in/mumbai/corporate',
    images: [{ url: 'https://pureharvest.in/og-image.jpg', width: 1200, height: 630 }],
    siteName: 'PureHarvest Enterprises',
    locale: 'en_IN',
    type: 'website',
  },
};

const corporateFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you offer recurring corporate water delivery to BKC and Andheri offices?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We offer monthly and quarterly supply contracts for corporate clients in BKC, Powai, Andheri SEEPZ, Lower Parel, and Navi Mumbai, ensuring a consistent branded water supply without manual reordering.' },
    },
    {
      '@type': 'Question',
      name: 'Can we add our company logo to water bottles for corporate events?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. We specialise in branded water bottles for corporate product launches, investor days, conferences, and internal events. Rush orders are available for time-sensitive events.' },
    },
    {
      '@type': 'Question',
      name: 'What is the pricing for corporate bulk orders in Mumbai?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pricing depends on volume, bottle type, and branding complexity. We offer competitive B2B volume pricing. Reach out on WhatsApp or email for a formal quote within 2 hours.' },
    },
    {
      '@type': 'Question',
      name: 'Is there a difference in pricing for glass vs. PET for offices?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Glass (borosilicate or clarity) is a premium product typically reserved for boardrooms, executive suites, and VIP gifting. PET bottles are more cost-effective and are often used for general employee cafeterias.' },
    },
    {
      '@type': 'Question',
      name: 'Do you provide GST invoices for corporate orders?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. We provide fully compliant B2B GST invoices (GST: 27GVMPD4986B1ZA) for all orders, allowing your finance team to claim input tax credit (ITC) seamlessly.' },
    }
  ],
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pureharvest.in' },
    { '@type': 'ListItem', position: 2, name: 'Mumbai', item: 'https://pureharvest.in/mumbai' },
    { '@type': 'ListItem', position: 3, name: 'Corporate', item: 'https://pureharvest.in/mumbai/corporate' },
  ],
};

const corporateServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Corporate Branded Water Supply',
  name: 'PureHarvest Mumbai Corporate Water Programme',
  provider: { '@type': 'Organization', name: 'PureHarvest Enterprises', url: 'https://pureharvest.in' },
  description: 'Premium custom-branded glass and PET water bottle supply for corporate boardrooms, cafeterias, and company events in Mumbai. Features B2B volume pricing, GST invoicing, and recurring delivery contracts.',
  areaServed: [
    'BKC', 'Andheri SEEPZ', 'Powai', 'Lower Parel', 'Nariman Point', 'Navi Mumbai', 'Mumbai'
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 500, unitCode: 'C62' }
  }
};

export default function MumbaiCorporatePage() {
  return (
    <main className="min-h-screen bg-brand-primary overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateServiceSchema) }} />

      <Hero industry="Corporate" location="Mumbai" />

      <nav className="bg-white border-b border-gray-100 py-3" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/mumbai" className="hover:text-brand-secondary transition-colors">Mumbai</Link>
          <span>/</span>
          <span className="text-brand-accent font-bold">Corporate</span>
        </div>
      </nav>

      <MumbaiCorporateContent />

      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-gray-400 text-xs uppercase tracking-[0.25em] font-bold mb-5">Explore Other Mumbai Solutions</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/mumbai" className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-brand-secondary hover:text-brand-secondary transition-colors">All Mumbai Solutions</Link>
            <Link href="/mumbai/hotels" className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-brand-secondary hover:text-brand-secondary transition-colors">Mumbai Hotels</Link>
            <Link href="/mumbai/restaurants" className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-brand-secondary hover:text-brand-secondary transition-colors">Mumbai Restaurants</Link>
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
