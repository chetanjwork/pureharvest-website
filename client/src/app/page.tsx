// Server Component

import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/global/Footer';
import LiveInquiry from '@/components/features/LiveInquiry';
import InViewLoader from '@/components/ui/InViewLoader';
import { InteractiveConfiguratorDynamic, PortfolioDynamic, EnterpriseOnboardingDynamic } from '@/components/layout/DynamicWrappers';

// Minimalist Skeleton to keep initial DOM shallow
const SectionSkeleton = ({ title }: { title: string }) => (
  <div className="w-full h-100 bg-[#F8F9FA] flex items-center justify-center text-brand-accent/30 text-xs font-bold uppercase tracking-widest">
    Loading {title}...
  </div>
);

// Dynamic Imports with Skeletons
const Services = dynamic(() => import('@/components/sections/Services'), {
  loading: () => <SectionSkeleton title="Solutions" />
});
const FoundersNote = dynamic(() => import('@/components/sections/FoundersNote'), {
  loading: () => <SectionSkeleton title="Founder's Note" />
});
const Purification = dynamic(() => import('@/components/sections/Purification'), {
  loading: () => <SectionSkeleton title="Purification" />
});
const Industries = dynamic(() => import('@/components/sections/Industries'), {
  loading: () => <SectionSkeleton title="Industries" />
});
const Process = dynamic(() => import('@/components/sections/Process'), {
  loading: () => <SectionSkeleton title="Process" />
});
const TrustPillars = dynamic(() => import('@/components/sections/TrustPillars'), {
  loading: () => <SectionSkeleton title="Trust Pillars" />
});
const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <SectionSkeleton title="FAQ" />
});

const Contact = dynamic(() => import('@/components/features/Contact'), {
  loading: () => <SectionSkeleton title="Contact" />
});

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-primary selection:bg-brand-secondary selection:text-white overflow-hidden">
      <Hero />
      <Services />

      <InViewLoader fallback={<div />} rootMargin="1500px">
        <PortfolioDynamic />
      </InViewLoader>

      <InViewLoader fallback={<div />} rootMargin="1500px">
        <InteractiveConfiguratorDynamic />
      </InViewLoader>

      <FoundersNote />

      <Purification />
      <Industries />
      <Process />
      <TrustPillars />

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
