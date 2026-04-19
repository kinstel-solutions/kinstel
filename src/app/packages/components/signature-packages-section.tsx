'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PackageCard } from './package-card';
import { SectionHeader } from './section-header';
import { CheckoutModal, type CheckoutFormData } from './checkout-modal';

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
    ctaText: "Book now @ ₹1,000",
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
    ctaText: "Book now @ ₹2,500",
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
    ctaText: "Book now @ ₹1,500",
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
    ctaText: "Book now @ ₹2,000",
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
    ctaText: "Book now @ ₹5,000",
    tokenAmount: 5000,
    pidPrefix: "APP"
  }
];

export function SignaturePackagesSection() {
  const router = useRouter();
  const [selectedPkg, setSelectedPkg] = useState<typeof packages[0] | null>(null);

  const pad = (n: number, w: number) => n.toString().padStart(w, '0');

  const handleConfirm = (data: CheckoutFormData) => {
    if (!selectedPkg) return;

    // Generate IDs based on user format: 0418202619091523
    const ts = new Date();
    const dateTimeStr = `${pad(ts.getMonth() + 1, 2)}${pad(ts.getDate(), 2)}${ts.getFullYear()}${pad(ts.getHours(), 2)}${pad(ts.getMinutes(), 2)}${pad(ts.getSeconds(), 2)}${pad(Math.floor(ts.getMilliseconds() / 10), 2)}`;
    
    const prefix = selectedPkg.pidPrefix;
    const proposalRef = `knsl/pkg/${prefix}-${dateTimeStr}`;
    const projectId = `knsl/bkn/${prefix}-${dateTimeStr}`;
    
    const params = new URLSearchParams({
      amount: selectedPkg.tokenAmount.toString(),
      purpose: proposalRef,
      pid: projectId,
      email: data.email,
    });
    
    if (data.name) params.set('name', data.name);
    if (data.phone) params.set('phone', data.phone);
    
    let finalDesc = `I'm interested in booking: ${selectedPkg.name}.\n\nMy primary goal for this project is: ${data.description || ""}`;
    params.set('desc', finalDesc);
    
    router.push(`/pay?${params.toString()}`);
  };

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
            onSelect={() => setSelectedPkg(pkg)}
          />
        ))}
      </div>

      <CheckoutModal
        isOpen={selectedPkg !== null}
        onClose={() => setSelectedPkg(null)}
        onConfirm={handleConfirm}
        packageName={selectedPkg?.name || ""}
        tokenAmount={selectedPkg?.tokenAmount || 0}
      />
    </section>
  );
}
