'use client';

import { PackageCard } from './package-card';
import { SectionHeader } from './section-header';

export function EntryOfferSection() {
  return (
    <section className="py-12">
      <SectionHeader 
        title="The Entry Offer" 
        subtitle="Start your digital transformation journey with our comprehensive strategy audit."
      />
      <div className="max-w-md mx-auto">
        <PackageCard
          name="Digital Strategy Audit"
          priceText="₹1,999"
          description="A deep-dive analysis of your current digital presence, competitor landscape, and a roadmap for growth."
          features={[
            "Competitor Analysis",
            "SEO & Performance Audit",
            "UX/UI Review",
            "Growth Strategy Roadmap",
            "1-Hour Consultation Call"
          ]}
          ctaText="Buy Full Audit"
          href="/pay?amount=1999&purpose=Digital Strategy Audit&pid=TOKEN-AUDIT"
          highlight={true}
        />
      </div>
    </section>
  );
}
