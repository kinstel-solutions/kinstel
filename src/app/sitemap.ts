
import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://kinstel.com'; // Replace with your actual domain

  // For a static site like this, the routes are simple.
  // For a dynamic site, you would fetch data to generate routes.
  const staticRoutes = [
      '/',
      '/contact',
      '/privacy-policy',
      '/terms-and-conditions',
      '/refund-policy',
      '/delivery-policy',
      '/shipping',
      '/web-design-company-lucknow',
      '/law-firm-marketing'
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const sectionRoutes = ['#services', '#portfolio'].map((route) => ({
      url: `${siteUrl}/${route}`,
      lastModified: new Date().toISOString(),
  }))


  return [...routes, ...sectionRoutes];
}
