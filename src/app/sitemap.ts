import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.kinstel.com';
  const lastModified = new Date();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/packages', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/web-design-company-lucknow', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/law-firm-marketing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/global', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/offers/lko', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/credentials', priority: 0.6, changeFrequency: 'yearly' },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
