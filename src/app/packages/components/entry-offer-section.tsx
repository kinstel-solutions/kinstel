'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PackageCard } from './package-card';
import { SectionHeader } from './section-header';
import { CheckoutModal, type CheckoutFormData } from './checkout-modal';

export function EntryOfferSection() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const auditPackage = {
    name: "Digital Strategy Audit",
    priceText: "₹1,999",
    description: "A deep-dive analysis of your current digital presence, competitor landscape, and a roadmap for growth.",
    features: [
      "Competitor Analysis",
      "SEO & Performance Audit",
      "UX/UI Review",
      "Growth Strategy Roadmap",
      "1-Hour Consultation Call"
    ],
    ctaText: "Book now @ ₹1,999",
    amount: 1999,
    pidPrefix: "AUDIT"
  };

  const pad = (n: number, w: number) => n.toString().padStart(w, '0');

  const handleConfirm = (data: CheckoutFormData) => {
    // Generate IDs based on user format: 0418202619091523
    const ts = new Date();
    const dateTimeStr = `${pad(ts.getMonth() + 1, 2)}${pad(ts.getDate(), 2)}${ts.getFullYear()}${pad(ts.getHours(), 2)}${pad(ts.getMinutes(), 2)}${pad(ts.getSeconds(), 2)}${pad(Math.floor(ts.getMilliseconds() / 10), 2)}`;
    
    const prefix = auditPackage.pidPrefix;
    const proposalRef = `knsl/pkg/${prefix}-${dateTimeStr}`;
    const projectId = `knsl/bkn/${prefix}-${dateTimeStr}`;
    
    const params = new URLSearchParams({
      amount: auditPackage.amount.toString(),
      purpose: proposalRef,
      pid: projectId,
      email: data.email,
    });
    
    if (data.name) params.set('name', data.name);
    if (data.phone) params.set('phone', data.phone);
    
    let finalDesc = `I'm interested in booking: ${auditPackage.name}.\nMy primary goal for this project is:\n${data.description || "(Client hasn't specified yet)"}`;
    params.set('desc', finalDesc);
    
    router.push(`/pay?${params.toString()}`);
  };

  return (
    <section className="py-12">
      <SectionHeader 
        title="The Entry Offer" 
        subtitle="Start your digital transformation journey with our comprehensive strategy audit."
      />
      <div className="max-w-md mx-auto">
        <PackageCard
          name={auditPackage.name}
          priceText={auditPackage.priceText}
          description={auditPackage.description}
          features={auditPackage.features}
          ctaText={auditPackage.ctaText}
          onSelect={() => setIsModalOpen(true)}
          highlight={true}
        />
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        packageName={auditPackage.name}
        tokenAmount={auditPackage.amount}
      />
    </section>
  );
}
