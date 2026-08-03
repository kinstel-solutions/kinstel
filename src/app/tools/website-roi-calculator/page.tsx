import { type Metadata } from "next";
import { Clock, Calculator } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RoiCalculator } from "@/components/tools/roi-calculator";
import { JsonLd } from "@/components/seo/json-ld";
import { createWebApplicationJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free Website ROI Calculator — Conversion Rate Revenue Impact",
  description:
    "See exactly how much more revenue a higher conversion rate would add to your website — free instant ROI calculator from Kinstel Solutions.",
  alternates: {
    canonical: "/tools/website-roi-calculator",
  },
};

export default function WebsiteRoiCalculatorPage() {
  const webAppJsonLd = createWebApplicationJsonLd({
    name: "Website ROI & Conversion Value Calculator",
    description:
      "Calculate the revenue impact of website conversion optimization and traffic improvements.",
    url: "https://www.kinstel.com/tools/website-roi-calculator",
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
                Website ROI Calculator
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Plug in your traffic, conversion rate, and customer value to see
                what a small conversion lift is really worth — in rupees, per
                month and per year.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-accent" />
                Instant results. No signup required.
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <RoiCalculator />
          </div>
        </section>

        {/* Honesty note */}
        <section className="pb-12 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto flex max-w-3xl gap-4 rounded-xl border border-border/50 bg-card p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <Calculator className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  How this is calculated
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Current revenue = your visitors × your conversion rate × your
                  average customer value. The uplift is the same formula run at
                  your target rate, minus your current revenue. We don't add any
                  assumptions of our own — only the numbers you enter.
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
