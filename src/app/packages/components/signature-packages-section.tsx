'use client';

import { PackageCard } from './package-card';
import { SectionHeader } from './section-header';

const packages = [
  {
    name: "Bespoke Landing Page",
    priceText: "From ₹8,000",
    description: "High-conversion single page websites tailored for your specific marketing goals.",
    features: [
      "Custom UI/UX Design",
      "Mobile Ready",
      "Lead Capture Integration",
      "Fast Loading Speed"
    ],
    ctaText: "Book Token (₹1,000)",
    tokenAmount: 1000,
    pidPrefix: "LP"
  },
  {
    name: "Business Core Suite",
    priceText: "From ₹25,000",
    description: "Multi-page professional websites for established businesses needing a strong presence.",
    features: [
      "5-7 Custom Pages",
      "Advanced CMS Access",
      "On-Page SEO Ready",
      "Contact & Map Setup"
    ],
    ctaText: "Book Token (₹2,500)",
    tokenAmount: 2500,
    highlight: true,
    pidPrefix: "BCS"
  },
  {
    name: "SEO Foundation Kit",
    priceText: "From ₹15,000/mo",
    description: "Monthly SEO retainers to boost your rankings and organic traffic growth.",
    features: [
      "Keyword Optimization",
      "Tech SEO Fixes",
      "Content Strategy",
      "Monthly Reports"
    ],
    ctaText: "Book Token (₹1,500)",
    tokenAmount: 1500,
    pidPrefix: "SEO"
  },
  {
    name: "Ads Accelerator",
    priceText: "₹10,000 Setup",
    description: "Performance marketing setup for Google and Meta Ads to drive instant traffic.",
    features: [
      "Campaign Strategy",
      "Ad Copywriting",
      "Pixel/Tag Integration",
      "Targeting Setup"
    ],
    ctaText: "Book Token (₹2,000)",
    tokenAmount: 2000,
    pidPrefix: "ADS"
  },
  {
    name: "Custom SaaS/Web App",
    priceText: "Custom Quote",
    description: "Complex web applications and MVPs built for scale and performance.",
    features: [
      "Custom Architecture",
      "Full Stack Development",
      "Third-party APIs",
      "Project Roadmap"
    ],
    ctaText: "Book Token (₹5,000)",
    tokenAmount: 5000,
    pidPrefix: "APP"
  }
];

export function SignaturePackagesSection() {
  return (
    <section className="py-20 border-t border-border/10">
      <SectionHeader 
        title="Signature Packages" 
        subtitle="Premium digital solutions designed for performance and scale. Secure your slot with a booking token."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            name={pkg.name}
            priceText={pkg.priceText}
            description={pkg.description}
            features={pkg.features}
            ctaText={pkg.ctaText}
            tokenAmount={pkg.tokenAmount}
            highlight={pkg.highlight}
            href={`/pay?amount=${pkg.tokenAmount}&purpose=Booking Token: ${pkg.name}&pid=TOKEN-${pkg.pidPrefix}`}
          />
        ))}
      </div>
    </section>
  );
}
