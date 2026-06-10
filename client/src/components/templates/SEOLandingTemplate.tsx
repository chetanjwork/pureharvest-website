import Hero from '@/components/sections/Hero';
import Footer from '@/components/global/Footer';
import LiveInquiry from '@/components/features/LiveInquiry';
import InViewLoader from '@/components/ui/InViewLoader';
import { InteractiveConfiguratorDynamic, PortfolioDynamic, EnterpriseOnboardingDynamic } from '@/components/layout/DynamicWrappers';
import { SEOPageData } from '@/data/seo-content';
import Services from '@/components/sections/Services';
import FoundersNote from '@/components/sections/FoundersNote';
import Purification from '@/components/sections/Purification';
import Industries from '@/components/sections/Industries';
import Process from '@/components/sections/Process';
import TrustPillars from '@/components/sections/TrustPillars';
import Contact from '@/components/features/Contact';
import FAQ from '@/components/sections/FAQ';

export default function SEOLandingTemplate({ data }: { data: SEOPageData }) {
  // We inject structured data for LocalBusiness/Product directly into the DOM
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": data.type === 'location' ? "LocalBusiness" : "Product",
    "name": data.meta.title,
    "description": data.meta.description,
    "url": `https://pureharvest.in/${data.id}`,
    "telephone": "+918149174975",
    "image": "https://pureharvest.in/og-image.jpg"
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <main className="min-h-screen bg-brand-primary selection:bg-brand-secondary selection:text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Hero inherits dynamic location/industry props */}
      <Hero industry={data.hero.industry} location={data.hero.location} />
      
      {/* We reuse the core sections to maintain performance parity with the homepage */}
      <Services />
      <FoundersNote />
      
      <InViewLoader fallback={<div />} rootMargin="1500px">
        <InteractiveConfiguratorDynamic />
      </InViewLoader>

      <Purification />
      <Industries />
      <Process />
      <TrustPillars />

      <InViewLoader fallback={<div />} rootMargin="1500px">
        <PortfolioDynamic />
      </InViewLoader>

      {/* We can eventually pass data.faq down to the FAQ component to make it dynamic */}
      <FAQ />

      <InViewLoader fallback={<div />} rootMargin="1500px">
        <EnterpriseOnboardingDynamic />
      </InViewLoader>

      <LiveInquiry />
      
      <Contact />

      <Footer />
    </main>
  );
}
