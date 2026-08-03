import { type Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Packages & Pricing — Kinstel Solutions",
  description:
    "Clear, transparent pricing packages for web design, development, and digital marketing from Kinstel Solutions.",
  alternates: {
    canonical: "/packages",
  },
};

const packagesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Kinstel Web Development & Performance Marketing Packages",
  provider: {
    "@type": "ProfessionalService",
    name: "Kinstel Solutions",
    url: "https://www.kinstel.com",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Engineering & Growth Suites",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Starter Web Suite (3-5 Day Rush Build)",
          description:
            "Full modern Next.js website, 95+ PageSpeed, mobile responsive, tracked and launch-ready.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "25000",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Growth & Lead Funnel Suite",
          description:
            "Conversion-engineered multi-page site + Google Ads RSA campaign management + local SEO setup.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "54000",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web Platform & SaaS MVP Suite",
          description:
            "Full-stack application, custom client dashboard, API integration, payment gateways & database architecture.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "250000",
          priceCurrency: "INR",
        },
      },
    ],
  },
};

export default function PackagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={packagesJsonLd} />
      {children}
    </>
  );
}
