import { type MetadataRoute } from 'next';
import { caseStudies } from '@/lib/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.kinstel.com';
  const lastModified = new Date();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/platforms', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/packages', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/web-design-company-lucknow', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/law-firm-marketing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/global', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/offers/lko', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/credentials', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/work', priority: 0.7, changeFrequency: 'monthly' },
    ...caseStudies.map((study) => ({
      path: `/work/${study.slug}`,
      priority: 0.6,
      changeFrequency: 'monthly' as MetadataRoute.Sitemap[number]['changeFrequency'],
    })),
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
