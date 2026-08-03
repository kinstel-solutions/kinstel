import { type Metadata } from "next";
import { Clock } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuoteBuilder } from "@/components/tools/quote-builder";
import { JsonLd } from "@/components/seo/json-ld";
import { createWebApplicationJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Get a Quote — Website & Growth Pricing",
  description:
    "Answer a few quick questions and get an instant starting-from range for your website, platform, or marketing project — then book a free call to lock in the details.",
  alternates: {
    canonical: "/quote",
  },
};

export default function QuotePage() {
  const webAppJsonLd = createWebApplicationJsonLd({
    name: "Interactive Project Quote Builder",
    description:
      "Calculate an instant cost and scope estimate for custom website development, SaaS platforms, or performance marketing campaigns.",
    url: "https://www.kinstel.com/quote",
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
                Quote Builder
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                Get a Quote
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                A few quick questions about what you need — and we&apos;ll give you
                an honest starting-from range in under a minute.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-accent" />
                Takes about 60 seconds. No commitment.
              </div>
            </div>
          </div>
        </section>

        {/* Quote Builder */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <QuoteBuilder />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
