import { type Metadata } from "next";
import { Clock, Scale } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NextjsVsWordpressPicker } from "@/components/tools/nextjs-vs-wordpress-picker";
import { JsonLd } from "@/components/seo/json-ld";
import { createWebApplicationJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Next.js vs WordPress — Which Should You Choose? (Free Picker)",
  description:
    "Answer 5 quick, honest questions and find out whether Next.js or WordPress is the better fit for your website — free interactive trade-off tool from Kinstel Solutions.",
  alternates: {
    canonical: "/tools/nextjs-vs-wordpress",
  },
};

export default function NextjsVsWordpressPage() {
  const webAppJsonLd = createWebApplicationJsonLd({
    name: "Next.js vs WordPress Architecture Decision Matrix",
    description:
      "Interactive comparison tool to help businesses select between Next.js modern web framework and WordPress CMS based on speed, budget, and features.",
    url: "https://www.kinstel.com/tools/nextjs-vs-wordpress",
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
                Next.js vs WordPress Picker
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Both platforms are good at different things. Answer 5 quick
                questions about your project and priorities, and get a
                straight, honest recommendation — even if that answer is
                WordPress.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-accent" />
                Takes about 30 seconds. No signup required.
              </div>
            </div>
          </div>
        </section>

        {/* Picker */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <NextjsVsWordpressPicker />
          </div>
        </section>

        {/* Honesty note */}
        <section className="pb-12 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto flex max-w-3xl gap-4 rounded-xl border border-border/50 bg-card p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <Scale className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  How this is calculated
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Each of the 5 questions is weighted equally and nudges the
                  score toward WordPress or Next.js based on your answer. We
                  don't tilt the scoring toward the platform we build with more
                  — plenty of good businesses are better served by WordPress,
                  and this picker will say so.
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
