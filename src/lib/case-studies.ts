export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  location: string;
  image: string;
  liveUrl: string;
  summary: string;
  challenge: string;
  approach: string[];
  results: string[];
  tech: string[];
  testimonial: {
    quote: string;
    author: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "blissful-station",
    client: "The Blissful Station",
    industry: "Mental Health / Telehealth",
    location: "India",
    image: "/portfolio-imgs/blissfulStation.webp",
    liveUrl: "https://www.theblissfulstation.com/",
    summary:
      "A complete online consultation & booking platform for a mental-health practice — designed and built end to end.",
    challenge:
      "A growing mental-health practice needed to move online — letting clients discover practitioners, book online or in-clinic, pay upfront, and consult securely — without stitching together a dozen third-party tools.",
    approach: [
      "Practitioner profiles, discovery & category filtering",
      "Slot-based online + in-clinic booking with pre-payment",
      "Secure in-platform video consultations (no third-party redirects)",
      "Client & practitioner dashboards",
      "Admin panel with verification & financial tracking",
    ],
    results: [
      "Launched as a full custom platform — engineered, not templated",
      "Built on a modern, scalable stack ready for marketplace growth",
      "[Metrics pending — practitioners onboarded / bookings to be added]",
    ],
    tech: ["Next.js", "React", "Node / NestJS", "Supabase", "Secure Video"],
    testimonial: {
      quote: "[Client testimonial to be added]",
      author: "The Blissful Station",
    },
  },
  {
    slug: "james-bond-cleaning",
    client: "James Bond Cleaning",
    industry: "Service Business (Cleaning)",
    location: "Queensland, Australia",
    image: "/portfolio-imgs/jamesbond.webp",
    liveUrl: "https://jamesbondcleaning.au",
    summary:
      "A conversion-focused website plus ongoing SEO for an Australian cleaning business.",
    challenge:
      "An Australian cleaning business needed a professional, lead-generating website and organic visibility in a competitive local market.",
    approach: [
      "17-page conversion-focused site (services, service areas, booking, blog)",
      "Two-stage RFQ lead form + WhatsApp & call widgets",
      "Custom logo design and hero video",
      "Ongoing SEO & Google Business Profile management",
    ],
    results: [
      "Full lead-generation site live",
      "Ongoing monthly SEO + GBP retainer",
      "[Metrics pending — ranking & lead growth to be added]",
    ],
    tech: ["Next.js", "React", "Technical SEO", "GBP"],
    testimonial: {
      quote: "[Client testimonial to be added]",
      author: "James Bond Cleaning",
    },
  },
  {
    slug: "chopra-retec",
    client: "Chopra Retec Rubber Products",
    industry: "B2B Manufacturing",
    location: "Lucknow, India",
    image: "/portfolio-imgs/chopraretec.webp",
    liveUrl: "https://chopraretec.com",
    summary:
      "A premium B2B web presence for an established rubber-products manufacturer.",
    challenge:
      "An established manufacturer needed an enterprise-grade B2B presence to match its scale — with a proper enquiry pipeline and a clean migration off a legacy domain.",
    approach: [
      "Multi-page B2B site with 24+ content sections",
      "Advanced RFQ (request-for-quote) system",
      "Progressive Web App",
      "Global edge deployment + legacy domain & SSL migration",
      "Technical SEO",
    ],
    results: [
      "Premium, enterprise-scale B2B presence live",
      "Recurring managed hosting & maintenance",
      "[Metrics pending — enquiry & traffic data to be added]",
    ],
    tech: ["Next.js", "PWA", "Edge Deployment"],
    testimonial: {
      quote: "[Client testimonial to be added]",
      author: "Chopra Retec",
    },
  },
  {
    slug: "edgrowth",
    client: "EdGrowth Consultants",
    industry: "Education Consulting",
    location: "Lucknow, India",
    image: "/portfolio-imgs/edgrowth.webp",
    liveUrl: "https://www.edgrowth.info/",
    summary:
      "A fast, modern website plus a Google Ads engine for an education consultancy.",
    challenge:
      "An education consultancy needed a credible online presence and a steady flow of qualified student enquiries.",
    approach: [
      "Fast, modern Next.js site with light/dark themes",
      "Custom enquiry form",
      "Google Ads management (rolling monthly retainer)",
      "Conversion tracking & analytics",
    ],
    results: [
      "Live site + active Google Ads lead engine",
      "Ongoing ads-management retainer",
      "[Metrics pending — leads & cost-per-lead to be added]",
    ],
    tech: ["Next.js", "GA4", "Google Ads"],
    testimonial: {
      quote: "[Client testimonial to be added]",
      author: "EdGrowth Consultants",
    },
  },
];
