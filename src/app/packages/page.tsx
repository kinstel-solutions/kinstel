"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DirectPaySection } from "./components/direct-pay-section";
import { EntryOfferSection } from "./components/entry-offer-section";
import { SignaturePackagesSection } from "./components/signature-packages-section";
import { SectionHeader } from "./components/section-header";
import { Button } from "@/components/ui/button";

export default function PackagesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-20 md:py-32">
        {/* Page Hero */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
            Services <span className="text-accent shimmer">Client Portal</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Welcome to the Kinstel Solutions service shop. Fast-track your
            project payments or explore our premium service packages tailored
            for growth.
          </p>
        </div>

        {/* Section 1: Direct Pay / Fast Track */}
        <section
          id="fast-track"
          className="mb-32">
          <SectionHeader
            title="Fast Track Payment"
            subtitle="Existing clients can upload their Kinstel Invoice PDF or enter the details manually to proceed directly to our secure payment gateway."
          />
          <DirectPaySection />
        </section>

        {/* Section 2: Entry Offer */}
        <EntryOfferSection />

        {/* Section 3: Signature Packages */}
        <SignaturePackagesSection />

        {/* Final CTA */}
        <section className="py-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Need something custom?
          </h3>
          <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
            Our team is ready to build a bespoke solution tailored to your
            unique requirements. Contact us for a discovery call today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg">
              <a href="mailto:contact@kinstel.com">Get a Custom Quote</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg">
              <a href="/contact">Contact Support</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
