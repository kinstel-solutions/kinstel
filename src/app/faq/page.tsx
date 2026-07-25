import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Kinstel Solutions — pricing, timelines, technology, custom platforms, SEO & Google Ads, support, and how to get started.",
  alternates: {
    canonical: "/faq",
  },
};

const faqs: {
  question: string;
  answer: React.ReactNode;
  plainText: string;
}[] = [
  {
    question: "What does Kinstel Solutions do?",
    answer: (
      <>
        We're a web design, development, and digital marketing studio. We
        build high-performing websites and custom web platforms, and run the
        SEO and Google Ads that grow them — design, development, and
        marketing under one roof.
      </>
    ),
    plainText:
      "We're a web design, development, and digital marketing studio. We build high-performing websites and custom web platforms, and run the SEO and Google Ads that grow them — design, development, and marketing under one roof.",
  },
  {
    question: "How much does a website cost?",
    answer: (
      <>
        It depends on scope — pages, features, and complexity. Simple sites
        start low; custom, conversion-focused builds and platforms cost more.
        Use our <Link href="/quote" className="underline hover:text-accent">quote builder</Link> for
        a ballpark, or read our honest{" "}
        <Link
          href="/blog/how-much-should-a-website-cost-in-india"
          className="underline hover:text-accent">
          pricing breakdown
        </Link>
        .
      </>
    ),
    plainText:
      "It depends on scope — pages, features, and complexity. Simple sites start low; custom, conversion-focused builds and platforms cost more. Use our quote builder for a ballpark, or read our honest pricing breakdown.",
  },
  {
    question: "How long does it take?",
    answer: (
      <>
        Most standard websites go live in about 3–5 working days once content
        is ready. Larger sites and custom platforms take longer and are
        scoped up front so you always know the timeline.
      </>
    ),
    plainText:
      "Most standard websites go live in about 3–5 working days once content is ready. Larger sites and custom platforms take longer and are scoped up front so you always know the timeline.",
  },
  {
    question: "What technology do you build with?",
    answer: (
      <>
        Modern, high-performance code — Next.js, React, and TypeScript — not
        templates. That means faster sites, better SEO, and a foundation that
        scales. See{" "}
        <Link
          href="/blog/nextjs-vs-wordpress"
          className="underline hover:text-accent">
          Next.js vs WordPress
        </Link>
        .
      </>
    ),
    plainText:
      "Modern, high-performance code — Next.js, React, and TypeScript — not templates. That means faster sites, better SEO, and a foundation that scales. See Next.js vs WordPress.",
  },
  {
    question: "Do you work with clients outside India?",
    answer: (
      <>
        Yes. We've built and marketed sites for businesses in India and
        abroad (including Australia), and we can quote and invoice in your
        local currency.
      </>
    ),
    plainText:
      "Yes. We've built and marketed sites for businesses in India and abroad (including Australia), and we can quote and invoice in your local currency.",
  },
  {
    question: "Do you only build websites, or marketing too?",
    answer: (
      <>
        Both — and that's the point. A website converts; marketing drives the
        traffic. We do both, so your site doesn't just look good, it actually
        brings you customers.
      </>
    ),
    plainText:
      "Both — and that's the point. A website converts; marketing drives the traffic. We do both, so your site doesn't just look good, it actually brings you customers.",
  },
  {
    question: "Can you build web apps, booking systems, or marketplaces?",
    answer: (
      <>
        Yes. We build custom{" "}
        <Link href="/platforms" className="underline hover:text-accent">
          platforms
        </Link>{" "}
        — booking systems, marketplaces, dashboards, and web apps — like the
        online consultation platform we built for The Blissful Station.
      </>
    ),
    plainText:
      "Yes. We build custom platforms — booking systems, marketplaces, dashboards, and web apps — like the online consultation platform we built for The Blissful Station.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: (
      <>
        Yes. We offer hosting, maintenance (AMC), and ongoing optimization, so
        your site keeps working and improving after launch.
      </>
    ),
    plainText:
      "Yes. We offer hosting, maintenance (AMC), and ongoing optimization, so your site keeps working and improving after launch.",
  },
  {
    question: "Do you provide SEO and Google Ads?",
    answer: (
      <>
        Yes. We handle technical & on-page SEO, Google Business Profile, and
        Google Ads management — measured with proper conversion tracking so
        you see the return.
      </>
    ),
    plainText:
      "Yes. We handle technical & on-page SEO, Google Business Profile, and Google Ads management — measured with proper conversion tracking so you see the return.",
  },
  {
    question: "What makes Kinstel different?",
    answer: (
      <>
        We're an AI-native studio: a small, senior team that ships premium,
        custom work fast, handles both the build and the marketing, and backs
        it with verifiable{" "}
        <Link href="/credentials" className="underline hover:text-accent">
          credentials
        </Link>
        .
      </>
    ),
    plainText:
      "We're an AI-native studio: a small, senior team that ships premium, custom work fast, handles both the build and the marketing, and backs it with verifiable credentials.",
  },
  {
    question: "Are you a registered business?",
    answer: (
      <>
        Yes — a registered entity with verifiable credentials (Udyam MSME,
        IEC, D-U-N-S®). Rare for a studio our size, and there for your peace
        of mind.
      </>
    ),
    plainText:
      "Yes — a registered entity with verifiable credentials (Udyam MSME, IEC, D-U-N-S®). Rare for a studio our size, and there for your peace of mind.",
  },
  {
    question: "How do we get started?",
    answer: (
      <>
        Tell us what you need via our{" "}
        <Link href="/quote" className="underline hover:text-accent">
          quote builder
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="underline hover:text-accent">
          contact page
        </Link>
        , and we'll scope it and share the fastest path to launch — the first
        consultation is free.
      </>
    ),
    plainText:
      "Tell us what you need via our quote builder or contact page, and we'll scope it and share the fastest path to launch — the first consultation is free.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.plainText,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={faqJsonLd} />
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Got Questions?
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                Frequently Asked <span className="text-accent">Questions</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Everything you need to know about working with Kinstel —
                pricing, timelines, technology, and how we help your business
                grow online.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-4 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <Accordion
                type="single"
                collapsible
                className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Call To Action Section */}
        <section
          id="contact"
          className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Still have questions?
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Tell us what you're building. We'll show you the fastest path
                there — the first consultation is free.
              </p>
              <div className="mt-10">
                <SmartCtaButton
                  phoneNumber="+919889988408"
                  email="contact@kinstel.com"
                  size="lg"
                  className="shadow-lg shadow-accent/20">
                  Get a Free Consultation
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
