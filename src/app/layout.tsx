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
  logo: "https://www.kinstel.com/logos/K%20arrow%20500x500px%20BG=Black.webp",
  sameAs: [
    "https://share.google/r0DGTJyecJmBUBaWC",
    "https://www.linkedin.com/company/kinstel",
    "https://x.com/kinstelhq",
    "https://www.facebook.com/kinstelhq",
    "https://www.instagram.com/kinstel.hq",
    "https://wa.me/919889988408",
    "https://www.goodfirms.co/company/kinstel-solutions-official",
    "https://techbehemoths.com/company/kinstel-solutions",
    "https://www.designrush.com/agency/profile/kinstel-solutions",
    "https://clutch.co/profile/kinstel-solutions",
    "https://jsdl.in/DT-3969OKJ36IF",
    "https://www.bing.com/maps/search?mkt=en-IN&ss=id.ypid%3AYNE59A5E76D46BB06B&cp=26.854063%7E81.043716&lvl=16&style=r",
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
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/social-assets/home-og-image.webp",
        width: 1200,
        height: 630,
        alt: "Kinstel Solutions — Premium Web Design & Development Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@kinstelhq",
    images: ["/social-assets/home-og-image.webp"],
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
      <head>
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms.txt"
          title="LLM Site Summary"
        />
      </head>
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
