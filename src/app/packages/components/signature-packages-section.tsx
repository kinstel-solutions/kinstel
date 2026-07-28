'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PackageCard } from './package-card';
import { SectionHeader } from './section-header';
import { CheckoutModal, type CheckoutFormData } from './checkout-modal';
import { event } from '@/lib/gtag';
import { Globe, ShieldCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD';

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$',
};

interface PackageData {
  name: string;
  description: string;
  features: string[];
  pidPrefix: string;
  highlight?: boolean;
  pricing: Record<Currency, { priceText: string; ctaText: string; tokenAmount: number }>;
}

const packages: PackageData[] = [
  {
    name: "Bespoke Landing Page",
    description: "High-conversion single page websites tailored for your specific marketing goals.",
    features: [
      "Custom UI/UX Design",
      "Mobile Ready",
      "Lead Capture Integration",
      "Fast Loading Speed"
    ],
    pidPrefix: "LP",
    pricing: {
      INR: { priceText: "From ₹8,000", ctaText: "Book now @ ₹1,000", tokenAmount: 1000 },
      USD: { priceText: "From $100", ctaText: "Book now @ $15", tokenAmount: 15 },
      EUR: { priceText: "From €90", ctaText: "Book now @ €15", tokenAmount: 15 },
      GBP: { priceText: "From £80", ctaText: "Book now @ £12", tokenAmount: 12 },
      AUD: { priceText: "From A$150", ctaText: "Book now @ A$20", tokenAmount: 20 },
      CAD: { priceText: "From C$140", ctaText: "Book now @ C$20", tokenAmount: 20 },
    }
  },
  {
    name: "Business Core Suite",
    description: "Multi-page professional websites for established businesses needing a strong presence.",
    features: [
      "5-7 Custom Pages",
      "Advanced CMS Access",
      "On-Page SEO Ready",
      "Contact & Map Setup"
    ],
    highlight: true,
    pidPrefix: "BCS",
    pricing: {
      INR: { priceText: "From ₹25,000", ctaText: "Book now @ ₹2,500", tokenAmount: 2500 },
      USD: { priceText: "From $300", ctaText: "Book now @ $30", tokenAmount: 30 },
      EUR: { priceText: "From €280", ctaText: "Book now @ €30", tokenAmount: 30 },
      GBP: { priceText: "From £240", ctaText: "Book now @ £25", tokenAmount: 25 },
      AUD: { priceText: "From A$450", ctaText: "Book now @ A$45", tokenAmount: 45 },
      CAD: { priceText: "From C$420", ctaText: "Book now @ C$40", tokenAmount: 40 },
    }
  },
  {
    name: "SEO Foundation Kit",
    description: "Monthly SEO retainers to boost your rankings and organic traffic growth.",
    features: [
      "Keyword Optimization",
      "Tech SEO Fixes",
      "Content Strategy",
      "Monthly Reports"
    ],
    pidPrefix: "SEO",
    pricing: {
      INR: { priceText: "From ₹15,000/mo", ctaText: "Book now @ ₹1,500", tokenAmount: 1500 },
      USD: { priceText: "From $180/mo", ctaText: "Book now @ $20", tokenAmount: 20 },
      EUR: { priceText: "From €165/mo", ctaText: "Book now @ €18", tokenAmount: 18 },
      GBP: { priceText: "From £140/mo", ctaText: "Book now @ £15", tokenAmount: 15 },
      AUD: { priceText: "From A$275/mo", ctaText: "Book now @ A$30", tokenAmount: 30 },
      CAD: { priceText: "From C$250/mo", ctaText: "Book now @ C$25", tokenAmount: 25 },
    }
  },
  {
    name: "Ads Accelerator",
    description: "Performance marketing setup for Google and Meta Ads to drive instant traffic.",
    features: [
      "Campaign Strategy",
      "Ad Copywriting",
      "Pixel/Tag Integration",
      "Targeting Setup"
    ],
    pidPrefix: "ADS",
    pricing: {
      INR: { priceText: "₹10,000 Setup", ctaText: "Book now @ ₹2,000", tokenAmount: 2000 },
      USD: { priceText: "$120 Setup", ctaText: "Book now @ $25", tokenAmount: 25 },
      EUR: { priceText: "€110 Setup", ctaText: "Book now @ €22", tokenAmount: 22 },
      GBP: { priceText: "£95 Setup", ctaText: "Book now @ £20", tokenAmount: 20 },
      AUD: { priceText: "A$185 Setup", ctaText: "Book now @ A$35", tokenAmount: 35 },
      CAD: { priceText: "C$165 Setup", ctaText: "Book now @ C$30", tokenAmount: 30 },
    }
  },
  {
    name: "Custom SaaS/Web App",
    description: "Complex web applications and MVPs built for scale and performance.",
    features: [
      "Custom Architecture",
      "Full Stack Development",
      "Third-party APIs",
      "Project Roadmap"
    ],
    pidPrefix: "APP",
    pricing: {
      INR: { priceText: "Custom Quote", ctaText: "Book now @ ₹5,000", tokenAmount: 5000 },
      USD: { priceText: "Custom Quote", ctaText: "Book now @ $60", tokenAmount: 60 },
      EUR: { priceText: "Custom Quote", ctaText: "Book now @ €55", tokenAmount: 55 },
      GBP: { priceText: "Custom Quote", ctaText: "Book now @ £50", tokenAmount: 50 },
      AUD: { priceText: "Custom Quote", ctaText: "Book now @ A$90", tokenAmount: 90 },
      CAD: { priceText: "Custom Quote", ctaText: "Book now @ C$85", tokenAmount: 85 },
    }
  }
];

export function SignaturePackagesSection() {
  const router = useRouter();
  const [currency, setCurrency] = useState<Currency>('INR');
  const [selectedPkg, setSelectedPkg] = useState<PackageData | null>(null);

  const pad = (n: number, w: number) => n.toString().padStart(w, '0');

  const handleConfirm = (data: CheckoutFormData) => {
    if (!selectedPkg) return;

    const currentPricing = selectedPkg.pricing[currency];

    // Generate IDs based on user format: 0418202619091523
    const ts = new Date();
    const dateTimeStr = `${pad(ts.getMonth() + 1, 2)}${pad(ts.getDate(), 2)}${ts.getFullYear()}${pad(ts.getHours(), 2)}${pad(ts.getMinutes(), 2)}${pad(ts.getSeconds(), 2)}${pad(Math.floor(ts.getMilliseconds() / 10), 2)}`;
    
    const prefix = selectedPkg.pidPrefix;
    const proposalRef = `knsl/pkg/${prefix}-${dateTimeStr}`;
    const projectId = `knsl/bkn/${prefix}-${dateTimeStr}`;
    
    const params = new URLSearchParams({
      amount: currentPricing.tokenAmount.toString(),
      currency: currency,
      purpose: proposalRef,
      pid: projectId,
      email: data.email,
    });
    
    if (data.name) params.set('name', data.name);
    if (data.phone) params.set('phone', data.phone);
    
    let finalDesc = `I'm interested in booking: ${selectedPkg.name} (${currency}).\n\nMy primary goal for this project is: ${data.description || ""}`;
    params.set('desc', finalDesc);

    event({
      action: 'generate_lead',
      category: 'form',
      label: 'signature_package_checkout',
    });

    router.push(`/pay?${params.toString()}`);
  };

  return (
    <section className="py-20 border-t border-border/10">
      <SectionHeader 
        title="Signature Packages" 
        subtitle="Premium digital solutions designed for performance and scale. Select your preferred currency and secure your slot with a booking token."
      />

      {/* Currency Switcher & International Payments Trust Tray */}
      <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-2xl bg-card/50 border border-border/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-accent">Cross-Border Service Exports</p>
            <p className="text-sm text-muted-foreground font-medium">
              Accepting International Cards, PayPal & Direct Bank Wire Remittances via Razorpay
            </p>
          </div>
        </div>

        {/* Currency Dropdown Selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">Payment Currency:</span>
          <Select value={currency} onValueChange={(val) => setCurrency(val as Currency)}>
            <SelectTrigger className="w-[140px] h-10 font-bold bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INR">INR (₹)</SelectItem>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
              <SelectItem value="AUD">AUD (A$)</SelectItem>
              <SelectItem value="CAD">CAD (C$)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => {
          const itemPricing = pkg.pricing[currency];
          return (
            <PackageCard
              key={index}
              name={pkg.name}
              priceText={itemPricing.priceText}
              description={pkg.description}
              features={pkg.features}
              ctaText={itemPricing.ctaText}
              tokenAmount={itemPricing.tokenAmount}
              highlight={pkg.highlight}
              onSelect={() => setSelectedPkg(pkg)}
            />
          );
        })}
      </div>

      {selectedPkg && (
        <CheckoutModal
          isOpen={selectedPkg !== null}
          onClose={() => setSelectedPkg(null)}
          onConfirm={handleConfirm}
          packageName={selectedPkg.name}
          tokenAmount={selectedPkg.pricing[currency].tokenAmount}
          currency={currency}
          currencySymbol={CURRENCY_SYMBOLS[currency]}
        />
      )}
    </section>
  );
}
