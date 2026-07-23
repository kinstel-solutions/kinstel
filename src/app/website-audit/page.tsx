import { type Metadata } from "next";
import { Gauge, Search, Accessibility, ShieldCheck, Mail, Clock } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuditTool } from "@/components/tools/audit-tool";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";

export const metadata: Metadata = {
  title: "Free Website Audit — Speed, SEO & Performance Checker",
  description:
    "Get a free instant audit of your website's speed, SEO, accessibility, and best practices — powered by Google. See what's costing you customers, in seconds.",
  alternates: {
    canonical: "/website-audit",
  },
};

const whatWeCheck = [
  {
    icon: <Gauge className="h-6 w-6 text-accent" />,
    title: "Performance",
    description:
      "How fast your site loads on a real mobile connection — slow sites lose visitors and sales before they even see your content.",
  },
  {
    icon: <Search className="h-6 w-6 text-accent" />,
    title: "SEO",
    description:
      "Whether Google can properly crawl, understand, and rank your pages — the foundation of showing up in search.",
  },
  {
    icon: <Accessibility className="h-6 w-6 text-accent" />,
    title: "Accessibility",
    description:
      "Whether your site works for everyone, including people using screen readers or keyboard navigation — and avoids legal risk.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-accent" />,
    title: "Best Practices",
    description:
      "Modern web standards — security, image formats, and coding practices that keep your site fast, safe, and future-proof.",
  },
];

export default function WebsiteAuditPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
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
                What's your website really costing you?
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Run a free, instant audit powered by Google PageSpeed Insights. See
                exactly how your site scores on speed, SEO, accessibility, and best
                practices — and what to fix first.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-accent" />
                Takes about 15 seconds. No signup required beyond your email.
              </div>
            </div>
          </div>
        </section>

        {/* Audit Tool */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <AuditTool />
          </div>
        </section>

        {/* What we check */}
        <section
          id="what-we-check"
          className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What We <span className="text-accent">Check</span> — And Why It Matters
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every audit runs Google's own Lighthouse engine against your live site,
                exactly like the tools Google itself uses to evaluate the web.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {whatWeCheck.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 rounded-xl bg-card border border-border/50 hover:border-accent/50 transition-colors animate-in fade-in slide-in-from-bottom-5"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "backwards",
                  }}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact"
          className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 mb-4">
                <Mail className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Want us to fix these?
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Book a free call and we'll walk you through your results and the
                fastest path to a faster, higher-ranking site.
              </p>
              <div className="mt-10">
                <SmartCtaButton
                  phoneNumber="+919889988408"
                  email="contact@kinstel.com"
                  emailSubject="Website Audit Follow-up"
                  size="lg"
                  className="shadow-lg shadow-accent/20">
                  Book a Call
                </SmartCtaButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
