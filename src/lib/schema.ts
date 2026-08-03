// Shared JSON-LD (schema.org) data reused across multiple pages.
// NAP (Name/Address/Phone) here MUST match src/app/contact/page.tsx and
// src/components/layout/footer.tsx exactly.

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "WebDesignCompany"],
  name: "Kinstel Solutions",
  url: "https://www.kinstel.com",
  image: "https://www.kinstel.com/android-chrome-512x512.png",
  telephone: "+91-98899-88408",
  email: "contact@kinstel.com",
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "2",
    bestRating: "5",
    worstRating: "1",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "H. No. 33, Shivlok Colony, Vigyan Khand, Gomti Nagar, Nijampur Malhaur",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226010",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.854063,
    longitude: 81.043716,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  hasMap: "https://www.google.com/maps/dir/?api=1&destination=Kinstel+Solutions+Lucknow",
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
  areaServed: [
    {
      "@type": "City",
      name: "Lucknow",
    },
    {
      "@type": "Country",
      name: "India",
    },
  ],
};

export function createWebApplicationJsonLd({
  name,
  description,
  url,
  applicationCategory = "BusinessApplication",
  operatingSystem = "All",
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
