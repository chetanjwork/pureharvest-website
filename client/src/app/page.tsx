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
import Heading from '@/components/ui/Heading';
import Section from '@/components/ui/Section';
import LiveInquiry from '@/components/layout/LiveInquiry';

import InViewLoader from '@/components/ui/InViewLoader';

// Minimalist Skeleton to keep initial DOM shallow
const SectionSkeleton = ({ title }: { title: string }) => (
  <div className="w-full h-[400px] bg-[#F8F9FA] animate-pulse flex items-center justify-center text-brand-accent/30 text-xs font-bold uppercase tracking-widest">
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
const InteractiveConfigurator = dynamic(() => import('@/components/layout/InteractiveConfigurator'), {
  ssr: false,
  loading: () => <SectionSkeleton title="Configurator" />
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
const Portfolio = dynamic(() => import('@/components/layout/Portfolio'), {
  ssr: false, // Disabling SSR for heavy 3D WebGL/Image processing
  loading: () => <SectionSkeleton title="Portfolio Renders" />
});
const FAQ = dynamic(() => import('@/components/layout/FAQ'), {
  loading: () => <SectionSkeleton title="FAQ" />
});

const EnterpriseOnboarding = dynamic(() => import('@/components/layout/EnterpriseOnboarding'), {
  ssr: false,
  loading: () => (
    <div className="py-32 bg-[#F8F9FA] text-center text-brand-accent/40 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3">
      <div className="w-4 h-4 rounded-full border-2 border-brand-accent/40 border-t-transparent animate-spin" />
      Loading Enterprise Application...
    </div>
  )
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
      
      <InViewLoader fallback={<SectionSkeleton title="Configurator" />}>
        <InteractiveConfigurator />
      </InViewLoader>

      <Purification />
      <Industries />
      <Process />
      <TrustPillars />

      <InViewLoader fallback={<SectionSkeleton title="Portfolio Renders" />} rootMargin="300px">
        <Portfolio />
      </InViewLoader>

      <FAQ />

      <InViewLoader fallback={<SectionSkeleton title="Enterprise Application" />} rootMargin="500px">
        <EnterpriseOnboarding />
      </InViewLoader>

      <LiveInquiry />
      
      <Contact />

      <Footer />
    </main>
  );
}
