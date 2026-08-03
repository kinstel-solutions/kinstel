'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PackageCard } from './package-card';
import { SectionHeader } from './section-header';
import { CheckoutModal, type CheckoutFormData } from './checkout-modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD';

const auditPricing: Record<Currency, { priceText: string; ctaText: string; amount: number }> = {
  INR: { priceText: "₹1,999", ctaText: "Book now @ ₹1,999", amount: 1999 },
  USD: { priceText: "$25", ctaText: "Book now @ $25", amount: 25 },
  EUR: { priceText: "€22", ctaText: "Book now @ €22", amount: 22 },
  GBP: { priceText: "£20", ctaText: "Book now @ £20", amount: 20 },
  AUD: { priceText: "A$35", ctaText: "Book now @ A$35", amount: 35 },
  CAD: { priceText: "C$32", ctaText: "Book now @ C$32", amount: 32 },
};

export function EntryOfferSection() {
  const router = useRouter();
  const [currency, setCurrency] = useState<Currency>('INR');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPricing = auditPricing[currency];

  const auditPackage = {
    name: "Digital Strategy Audit",
    description: "A deep-dive analysis of your current digital presence, competitor landscape, and a roadmap for growth.",
    features: [
      "Competitor Analysis",
      "SEO & Performance Audit",
      "UX/UI Review",
      "Growth Strategy Roadmap",
      "1-Hour Consultation Call"
    ],
    pidPrefix: "AUDIT"
  };

  const pad = (n: number, w: number) => n.toString().padStart(w, '0');

  const handleConfirm = (data: CheckoutFormData) => {
    const ts = new Date();
    const dateTimeStr = `${pad(ts.getMonth() + 1, 2)}${pad(ts.getDate(), 2)}${ts.getFullYear()}${pad(ts.getHours(), 2)}${pad(ts.getMinutes(), 2)}${pad(ts.getSeconds(), 2)}${pad(Math.floor(ts.getMilliseconds() / 10), 2)}`;
    
    const prefix = auditPackage.pidPrefix;
    const proposalRef = `knsl/pkg/${prefix}-${dateTimeStr}`;
    const projectId = `knsl/bkn/${prefix}-${dateTimeStr}`;
    
    const params = new URLSearchParams({
      amount: currentPricing.amount.toString(),
      currency: currency,
      purpose: proposalRef,
      pid: projectId,
      email: data.email,
    });
    
    if (data.name) params.set('name', data.name);
    if (data.phone) params.set('phone', data.phone);
    
    let finalDesc = `I'm interested in booking: ${auditPackage.name} (${currency}).\n\nMy primary goal for this project is: ${data.description || ""}`;
    params.set('desc', finalDesc);
    
    router.push(`/pay?${params.toString()}`);
  };

  return (
    <section className="py-12">
      <SectionHeader 
        title="The Entry Offer" 
        subtitle="Start your digital transformation journey with our comprehensive strategy audit."
      />

      <div className="max-w-md mx-auto mb-6 flex items-center justify-between gap-4 p-3 rounded-xl bg-card/60 border border-border/60">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Globe className="w-4 h-4 text-accent" />
          <span>Currency:</span>
        </div>
        <Select value={currency} onValueChange={(val) => setCurrency(val as Currency)}>
          <SelectTrigger className="w-[120px] h-8 text-xs font-bold bg-background border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INR">INR (₹)</SelectItem>
            <SelectItem value="USD">USD ($)</SelectItem>
            <SelectItem value="AUD">AUD (A$)</SelectItem>
            <SelectItem value="EUR">EUR (€)</SelectItem>
            <SelectItem value="GBP">GBP (£)</SelectItem>
            <SelectItem value="CAD">CAD (C$)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="max-w-md mx-auto">
        <PackageCard
          name={auditPackage.name}
          priceText={currentPricing.priceText}
          description={auditPackage.description}
          features={auditPackage.features}
          ctaText={currentPricing.ctaText}
          onSelect={() => setIsModalOpen(true)}
          highlight={true}
        />
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        packageName={auditPackage.name}
        tokenAmount={currentPricing.amount}
      />
    </section>
  );
}
