import { MetadataRoute } from 'next'
import { seoPages } from '@/data/seo-content'

// Mumbai cluster sub-pages (manually registered for priority control)
const MUMBAI_CLUSTER = [
  { url: 'https://pureharvest.in/mumbai', priority: 0.95 },
  { url: 'https://pureharvest.in/mumbai/hotels', priority: 0.9 },
  { url: 'https://pureharvest.in/mumbai/restaurants', priority: 0.9 },
  { url: 'https://pureharvest.in/mumbai/corporate', priority: 0.9 },
];

const NEW_CITY_HUBS = [
  { url: 'https://pureharvest.in/pune', priority: 0.9 },
  { url: 'https://pureharvest.in/bangalore', priority: 0.9 },
  { url: 'https://pureharvest.in/delhi', priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Auto-generate top-level SEO pages (excludes mumbai as it's in MUMBAI_CLUSTER)
  const dynamicRoutes = Object.keys(seoPages)
    .filter((id) => id !== 'mumbai')
    .map((id) => ({
      url: `https://pureharvest.in/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  return [
    {
      url: 'https://pureharvest.in',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://pureharvest.in/faq',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Mumbai SEO Cluster
    ...MUMBAI_CLUSTER.map((page) => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page.priority,
    })),
    // New City Hubs
    ...NEW_CITY_HUBS.map((page) => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page.priority,
    })),
    // Other top-level SEO pages
    ...dynamicRoutes,
    {
      url: 'https://pureharvest.in/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://pureharvest.in/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
