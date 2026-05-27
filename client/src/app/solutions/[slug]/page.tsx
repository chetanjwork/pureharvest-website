import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Hero from '@/components/layout/Hero';
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
  ssr: false,
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

      {/* Reused Footer from main page */}
      <footer className="py-20 bg-[#F8F9FA] text-brand-accent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/10 to-transparent" />
        
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20 relative z-10">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-8">
                <span className="text-xl font-sans font-black tracking-[0.15em] uppercase text-brand-accent">
                  PureHarvest
                </span>
              </Link>
              <p className="text-brand-accent/60 text-sm max-w-sm leading-relaxed mb-8 font-medium">
                Premium custom branded water. We deliver custom glass bottles and pure, refreshing water for hotels, offices, cafes, and celebrations.
              </p>
              <div className="text-brand-accent/60 text-[11px] uppercase tracking-[0.2em] font-black">
                GST NO: 27GVMPD4986B1ZA
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-brand-accent font-black text-xs uppercase tracking-[0.3em] text-brand-accent/60">Information</h4>
              <ul className="space-y-5">
                <li><Link href="/faq" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Frequently Asked Qs</Link></li>
                <li><Link href="/privacy" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-brand-accent font-black text-xs uppercase tracking-[0.3em] text-brand-accent/60">Social</h4>
              <ul className="space-y-5">
                <li><a href="https://wa.me/918149174975" target="_blank" rel="noopener noreferrer" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">WhatsApp</a></li>
                <li><a href="https://www.instagram.com/pure_harvest.enterprise" target="_blank" rel="noopener noreferrer" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <p className="text-brand-accent/60 text-[9px] uppercase tracking-[0.3em] font-black text-center md:text-left leading-relaxed max-w-md">
              © 2026 PureHarvest Enterprises. <br className="md:hidden" />Crafted for Excellence.
            </p>
            <div className="flex gap-4 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
              <span className="text-brand-accent/60 text-[9px] uppercase tracking-[0.3em] font-black">All Rights Reserved</span>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
