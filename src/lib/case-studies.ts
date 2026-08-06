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
    location: "Lucknow, India",
    image: "/portfolio-imgs/blissfulStation.webp",
    liveUrl: "https://www.theblissfulstation.com/",
    summary:
      "A complete online consultation & booking platform for a mental-health practice — engineered for high-intent Google Ads RSA traffic.",
    challenge:
      "A growing mental-health practice needed to launch a high-converting clinic web presence for immediate Google Search Ads leads, while engineering a full custom telehealth SaaS platform for slot scheduling, secure video, and client notes.",
    approach: [
      "Practitioner profiles, discovery & category filtering",
      "Slot-based online + in-clinic booking with pre-payment integration",
      "Secure in-platform WebRTC video consultations",
      "Client & practitioner dashboards with Supabase backend",
      "Google Ads RSA management campaign producing immediate leads",
    ],
    results: [
      "High-converting clinic website launched for Google Ads RSA traffic",
      "Full custom telehealth platform engineered on Next.js + NestJS + Supabase",
      "Ongoing Google Ads management retainer at ₹15,000/month",
    ],
    tech: ["Next.js", "React 19", "NestJS", "Supabase", "WebRTC Video", "Razorpay"],
    testimonial: {
      quote: "Kinstel engineered our custom telehealth platform from scratch. Their AI-augmented dev process delivered enterprise-grade slot scheduling and video consultation seamlessly.",
      author: "The Blissful Station Team",
    },
  },
  {
    slug: "james-bond-cleaning",
    client: "James Bond Cleaning",
    industry: "Service Business (Cleaning)",
    location: "Queensland, Australia",
    image: "/portfolio-imgs/jamesbond.webp",
    liveUrl: "https://gold-coast-cleaners-git-main-james-bond-cleaning.vercel.app",
    summary:
      "A conversion-focused 17-page website plus ongoing SEO for an Australian commercial cleaning business.",
    challenge:
      "An Australian commercial cleaning business needed a high-speed, lead-generating website to rank in a competitive Gold Coast market and capture high-intent organic search traffic.",
    approach: [
      "17-page conversion-focused site (services, service areas, booking, blog)",
      "Two-stage RFQ lead form + WhatsApp & call widgets",
      "Custom logo design and hero video production",
      "Ongoing month-to-month SEO & Google Business Profile management",
      "Ongoing support for brand migration and domain rebranding",
    ],
    results: [
      "100% Conversion Rate on ChatGPT AI search traffic (3 out of 3 AI referral leads converted)",
      "Full 17-page lead-generation site delivered",
      "Ongoing monthly AUD/INR SEO & GBP management retainer",
    ],
    tech: ["Next.js", "React", "Technical SEO", "AEO (AI Search)", "GBP"],
    testimonial: {
      quote: "Kinstel built a high-converting 17-page website and executed our local SEO campaign with elite speed. Highly recommended for any Australian business.",
      author: "James Bond Cleaning AU",
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
      "A premium B2B web presence and RFQ system for an established rubber-products manufacturer.",
    challenge:
      "An established manufacturer serving international markets needed an enterprise-grade B2B presence to match its scale — with an advanced inquiry pipeline and legacy domain SSL migration.",
    approach: [
      "Multi-page B2B site with 24+ content sections",
      "Advanced RFQ (request-for-quote) system and PWA integration",
      "Global edge deployment + legacy domain & SSL migration",
      "10-Day expedited priority rush delivery",
      "2-Year managed server infrastructure & maintenance subscription",
    ],
    results: [
      "Enterprise-scale B2B presence live with 90+ PageSpeed score",
      "Delivered on a 10-day rush schedule",
      "2-year prepaid managed server infrastructure & maintenance contract",
    ],
    tech: ["Next.js", "PWA", "Edge Deployment", "Technical SEO"],
    testimonial: {
      quote: "Kinstel delivered our complex B2B manufacturing website with an RFQ system and PWA features in 10 days. Enterprise-grade engineering.",
      author: "Chopra Retec Management",
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
      "High-converting marketing site + Google Ads lead generation funnel for an education consulting firm.",
    challenge:
      "An educational consulting firm needed an agile web presence and Google Search ad funnel to capture student inquiries.",
    approach: [
      "4-page responsive website + custom ad landing page",
      "Analytics & conversion tracking setup",
      "Google Ads Search campaign management",
    ],
    results: [
      "High-converting ad funnel live",
      "Ongoing monthly Google Ads management retainer",
    ],
    tech: ["Next.js", "Google Ads RSA", "Conversion Tracking"],
    testimonial: {
      quote: "Kinstel built our landing funnel and managed our Google Ads campaigns to generate consistent, qualified student inquiries.",
      author: "EdGrowth Consultants",
    },
  },
];
