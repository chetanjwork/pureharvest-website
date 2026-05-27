import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';

const SectionSkeleton = ({ title }: { title: string }) => (
  <div className="w-full py-32 flex flex-col items-center justify-center bg-[#F3F4F6] gap-4">
    <div className="w-8 h-8 rounded-full border-2 border-brand-accent border-t-transparent animate-spin" />
    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-accent/40 animate-pulse">
      Loading {title}...
    </span>
  </div>
);

const InteractiveConfigurator = dynamic(() => import('@/components/layout/InteractiveConfigurator'), {
  loading: () => <SectionSkeleton title="Configurator" />
});
const Purification = dynamic(() => import('@/components/layout/Purification'), {
  loading: () => <SectionSkeleton title="Purification" />
});

// Capitalize helper
const capitalize = (s: string) => {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const parts = slug.split('-');
  const locationRaw = parts.pop() || '';
  const industryRaw = parts.join(' ') || '';

  const industry = capitalize(industryRaw) || 'Businesses';
  const location = capitalize(locationRaw) || 'Maharashtra';

  return {
    title: `Premium Custom Branded Water for ${industry} in ${location} | PureHarvest`,
    description: `PureHarvest Enterprises delivers 10-stage purified, custom-branded water for ${industry} in ${location}. Contact us to elevate your brand hydration experience.`,
    alternates: {
      canonical: `/solutions/${slug}`,
    }
  };
}

export default async function SolutionsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const parts = slug.split('-');
  
  // Last part is location, rest is industry
  const locationRaw = parts.pop() || '';
  const industryRaw = parts.join(' ') || '';

  const industry = capitalize(industryRaw) || 'Businesses';
  const location = capitalize(locationRaw) || 'Maharashtra';

  return (
    <main>
      <Hero industry={industry} location={location} />
      
      <InteractiveConfigurator />
      
      <Purification />

      <Footer />
    </main>
  );
}
