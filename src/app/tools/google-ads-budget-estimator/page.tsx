import { type Metadata } from "next";
import { Clock, TrendingUp } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AdsBudgetEstimator } from "@/components/tools/ads-budget-estimator";
import { JsonLd } from "@/components/seo/json-ld";
import { createWebApplicationJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free Google Ads Budget Estimator — Clicks & Leads Calculator (India)",
  description:
    "Estimate how many clicks and leads your Google Ads budget can realistically deliver in India — free interactive PPC calculator from Kinstel Solutions.",
  alternates: {
    canonical: "/tools/google-ads-budget-estimator",
  },
};

export default function GoogleAdsBudgetEstimatorPage() {
  const webAppJsonLd = createWebApplicationJsonLd({
    name: "Google Ads PPC Budget & Lead Estimator",
    description:
      "Interactive PPC budget and lead estimation tool for calculating clicks, cost per lead, and campaign ROI.",
    url: "https://www.kinstel.com/tools/google-ads-budget-estimator",
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={webAppJsonLd} />
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Free Tool
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                Google Ads Budget Estimator
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Enter a monthly budget — or a lead target — and get a realistic
                range of clicks and leads, based on typical India CPC bands by
                competitiveness.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-accent" />
                Instant results. No signup required.
              </div>
            </div>
          </div>
        </section>

        {/* Estimator */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <AdsBudgetEstimator />
          </div>
        </section>

        {/* Honesty note */}
        <section className="pb-12 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto flex max-w-3xl gap-4 rounded-xl border border-border/50 bg-card p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  How this is calculated
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Clicks = budget ÷ an assumed India cost-per-click band (Low
                  ₹10–30, Medium ₹30–70, High ₹70–150). Leads = clicks × a
                  landing page conversion rate (default 5–12%, or your own
                  number if you enter one). If you enter a lead target instead,
                  we run the math in reverse to estimate the budget needed.
                  These are ranges, not guarantees — see the disclaimer above.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
