// Server Component

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import MotionWrapper from '@/components/motion/MotionWrapper';
import Heading from '@/components/ui/Heading';
import Section from '@/components/ui/Section';
import LiveInquiry from '@/components/layout/LiveInquiry';
import InViewLoader from '@/components/ui/InViewLoader';
import { InteractiveConfiguratorDynamic, PortfolioDynamic, EnterpriseOnboardingDynamic } from '@/components/layout/DynamicWrappers';

// Minimalist Skeleton to keep initial DOM shallow
const SectionSkeleton = ({ title }: { title: string }) => (
  <div className="w-full h-[400px] bg-[#F8F9FA] flex items-center justify-center text-brand-accent/30 text-xs font-bold uppercase tracking-widest">
    Loading {title}...
  </div>
);

// Dynamic Imports with Skeletons
const Services = dynamic(() => import('@/components/layout/Services'), {
  loading: () => <SectionSkeleton title="Solutions" />
});
const FoundersNote = dynamic(() => import('@/components/layout/FoundersNote'), {
  loading: () => <SectionSkeleton title="Founder's Note" />
});
const Purification = dynamic(() => import('@/components/layout/Purification'), {
  loading: () => <SectionSkeleton title="Purification" />
});
const Industries = dynamic(() => import('@/components/layout/Industries'), {
  loading: () => <SectionSkeleton title="Industries" />
});
const Process = dynamic(() => import('@/components/layout/Process'), {
  loading: () => <SectionSkeleton title="Process" />
});
const TrustPillars = dynamic(() => import('@/components/layout/TrustPillars'), {
  loading: () => <SectionSkeleton title="Trust Pillars" />
});
const FAQ = dynamic(() => import('@/components/layout/FAQ'), {
  loading: () => <SectionSkeleton title="FAQ" />
});

const Contact = dynamic(() => import('@/components/layout/Contact'), {
  loading: () => <SectionSkeleton title="Contact" />
});

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-primary selection:bg-brand-secondary selection:text-white overflow-hidden">
      <Hero />
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
