import { type MetadataRoute } from 'next';
import { caseStudies } from '@/lib/case-studies';
import { posts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.kinstel.com';
  const defaultLastModified = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    lastModified?: Date;
  }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/careers', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/compare', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/platforms', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/industries', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/packages', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/website-audit', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/quote', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools/website-roi-calculator', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/tools/nextjs-vs-wordpress', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/tools/google-ads-budget-estimator', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/web-design-company-lucknow', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/global-promo', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/payment-methods', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/refund-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/delivery-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/shipping', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/credentials', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/work', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'monthly' },
  ];

  const caseStudyRoutes = caseStudies.map((study) => ({
    path: `/work/${study.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as MetadataRoute.Sitemap[number]['changeFrequency'],
    lastModified: defaultLastModified,
  }));

  const blogPostRoutes = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as MetadataRoute.Sitemap[number]['changeFrequency'],
    lastModified: post.date ? new Date(post.date) : defaultLastModified,
  }));

  const allRoutes = [...staticRoutes, ...caseStudyRoutes, ...blogPostRoutes];

  return allRoutes.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${siteUrl}${path}`,
    lastModified: lastModified || defaultLastModified,
    changeFrequency,
    priority,
  }));
}
