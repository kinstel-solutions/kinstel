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
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "H. No. 33, Shivdham, Shivlok Colony, Nijampur, Malhaur, Vigyan Khand-1",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226010",
    addressCountry: "IN",
  },
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
