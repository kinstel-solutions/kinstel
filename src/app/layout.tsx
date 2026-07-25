import type { Metadata } from "next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { fontSans, fontSerif, fontLogo } from "@/app/fonts";
import { WhatsAppWidget } from "@/components/ui/whatsapp-widget";
import { siteConfig } from "@/lib/site-config";
import GoogleAnalytics from "@/components/GA-analytics";
import { GlassFilter } from "@/components/ui/liquid-glass-card";
import { JsonLd } from "@/components/seo/json-ld";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kinstel Solutions",
  url: "https://www.kinstel.com",
  logo: "https://www.kinstel.com/android-chrome-512x512.png",
  sameAs: [
    "https://share.google/oZnuHrxf7oGYX8BGP",
    "https://www.designrush.com/agency/profile/kinstel-solutions",
    "https://jsdl.in/DT-3969OKJ36IF",
  ],
  identifier: [
    {
      "@type": "PropertyValue",
      propertyID: "UDYAM",
      value: "UDYAM-UP-50-0230220",
    },
    {
      "@type": "PropertyValue",
      propertyID: "IEC",
      value: "HLCPS8014Q",
    },
    {
      "@type": "PropertyValue",
      propertyID: "D-U-N-S",
      value: "77-197-4415",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-98899-88408",
    email: "contact@kinstel.com",
    contactType: "customer service",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://www.kinstel.com",
  name: "Kinstel Solutions",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | Kinstel Solutions`,
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
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@kinstels",
  },
  icons: {
    icon: [
      { url: "/K-Logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "EUyo27rp0wgUUiKu3bCvTLHZXqdCnwwBqLlMEDyc5UM",
  },
  other: {
    'dmca-site-verification': 'czRrMlY1NHZ6U3JVR1NDZi9LYk5NZz090',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsappMessage =
    "Hello! I'm visiting your website and would like to inquire about your website development services.";
  return (
    <html
      lang="en"
      className="scroll-smooth dark">
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
          fontLogo.variable,
        )}>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        {children}
        <Toaster />
        {/* Google Analytics (GA4) client component — loads gtag.js & tracks pageviews */}
        <GoogleAnalytics />

        {/* Vercel Analytics */}
        <VercelAnalytics />

        {/* Vercel Speed Insights */}
        <SpeedInsights />
        <WhatsAppWidget
          phoneNumber="919889988408"
          message={whatsappMessage}
        />
        <GlassFilter />
      </body>
    </html>
  );
}
