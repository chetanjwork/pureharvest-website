import { Metadata } from 'next';
import SEOLandingTemplate from '@/components/templates/SEOLandingTemplate';
import { seoPages } from '@/data/seo-content';

const pageData = seoPages.hotels;

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  keywords: pageData.meta.keywords.join(', '),
  alternates: {
    canonical: `https://pureharvest.in/${pageData.id}`,
  },
  openGraph: {
    title: pageData.meta.title,
    description: pageData.meta.description,
    url: `https://pureharvest.in/${pageData.id}`,
    images: [{ url: '/og-image.jpg' }],
  }
};

export default function HotelsPage() {
  return <SEOLandingTemplate data={pageData} />;
}
