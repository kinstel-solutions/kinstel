import type { Metadata } from 'next';
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { fontSans, fontSerif, fontLogo } from '@/app/fonts';
import { WhatsAppWidget } from '@/components/ui/whatsapp-widget';
import { siteConfig } from '@/lib/site-config';
import GoogleAnalytics from '@/components/GA-analytics';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@kinstels', 
  },
  icons: {
    icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'EUyo27rp0wgUUiKu3bCvTLHZXqdCnwwBqLlMEDyc5UM',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsappMessage = "Hello! I'm visiting your website and would like to inquire about your law firm website development services.";
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable, fontSerif.variable, fontLogo.variable)}>
        {children}
        <Toaster />
        {/* Google Analytics (GA4) client component — loads gtag.js & tracks pageviews */}
        <GoogleAnalytics />

        {/* Vercel Analytics */}
        <VercelAnalytics />

        {/* Vercel Speed Insights */}
        <SpeedInsights />
        <WhatsAppWidget phoneNumber="919889988408" message={whatsappMessage} />
      </body>
    </html>
  );
}
