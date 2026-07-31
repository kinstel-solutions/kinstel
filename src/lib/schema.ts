// Shared JSON-LD (schema.org) data reused across multiple pages.
// NAP (Name/Address/Phone) here MUST match src/app/contact/page.tsx and
// src/components/layout/footer.tsx exactly.

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
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
      "H. No. 33, Shivdham, Shivlok Colony, Nijampur, Malhaur, Vigyan Khand-1",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226010",
    addressCountry: "IN",
  },
  hasMap: "https://share.google/r0DGTJyecJmBUBaWC",
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
