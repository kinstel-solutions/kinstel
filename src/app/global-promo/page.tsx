import { type Metadata } from "next";
import {
  Zap,
  Award,
  Globe,
  CheckCircle,
  ArrowUpRight,
  ShieldCheck,
  Code,
  Palette,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollToFormButton } from "@/components/ui/scroll-to-form-button";
import { DynamicPrice, DynamicTerm } from "@/components/ui/dynamic-price";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DotPattern } from "@/components/ui/dot-pattern";
import { PortfolioGridSequential } from "./portfolio-components";
import { PromoInquiryForm } from "./promo-inquiry-form";
import {
  PromoHeader,
  MothersDayPromo,
  PromoEmailCta,
} from "./client-components";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Premium Global Web Design & Development",
  description:
    "Get a Free Website Audit & Strategy Session from Kinstel. Custom web design, SEO-ready, 90+ PageSpeed scores. Serving US, UK, CA, AU, and worldwide.",
  alternates: {
    canonical: "/global-promo",
    languages: {
      "en-US": "https://www.kinstel.com/global-promo",
      "en-AU": "https://www.kinstel.com/global-promo",
      "en-GB": "https://www.kinstel.com/global-promo",
      "en-CA": "https://www.kinstel.com/global-promo",
      "en-IN": "https://www.kinstel.com/web-design-company-lucknow",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Premium Global Web Design & Development | Kinstel",
    description:
      "Stop losing clients to a bad website. Free Website Audit + Strategy Session from Kinstel.",
    url: "https://www.kinstel.com/global-promo",
    siteName: "Kinstel",
    images: [
      {
        url: "/social-assets/home-og-image.webp",
        width: 1200,
        height: 630,
        alt: "Premium Global Web Design & Development | Kinstel Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Your Free Website Audit | Kinstel",
    description:
      "Free Website Audit + Strategy Session. Custom web design, SEO-ready, 90+ PageSpeed.",
    images: ["/social-assets/home-og-image.webp"],
  },
};

/* ─── DATA ─── */

const painStats = [
  { value: "53%", label: "of visitors leave if a page takes >3s to load" },
  { value: "94%", label: "of first impressions are design-related" },
  { value: "75%", label: "judge credibility by website design" },
];

const solutionCards = [
  {
    icon: <Star className="h-7 w-7 text-accent" />,
    title: "Visual Prestige",
    desc: "Custom UI/UX designed from scratch — no templates, no page builders. Premium animations and bespoke typography that make your brand unforgettable.",
  },
  {
    icon: <Zap className="h-7 w-7 text-accent" />,
    title: "Enterprise Performance",
    desc: "90+ Lighthouse scores. Server-side rendering. Edge-optimized delivery. Your site loads before they blink — on any device, anywhere.",
  },
  {
    icon: <ShieldCheck className="h-7 w-7 text-accent" />,
    title: "Conversion Engineering",
    desc: "Every element is CRO-optimized. Lead capture forms, SEO-ready architecture, and analytics built in — your website becomes a revenue machine.",
  },
];

const portfolioItems = [
  {
    image: "/portfolio-imgs/blissfulStation.webp",
    imageHint: "screenshot blissful station website",
    title: "Premium & Elegant UI",
    category: "Blissful Station",
    metrics: ["High Performance", "Mobile Optimized", "Premium Animations", "Custom UI/UX"],
    link: "https://www.theblissfulstation.com/",
  },
  {
    image: "/portfolio-imgs/chopraretec.webp",
    imageHint: "screenshot chopra retec industrial technology website",
    title: "Premium B2B Presence",
    category: "Global Rubber Manufacturer",
    metrics: ["B2B Excellence", "Professional Visuals & animations", "Enterprise Scale"],
    link: "https://chopraretec.com",
  },
  {
    image: "/portfolio-imgs/jamesbond.webp",
    imageHint: "screenshot james bond cleaning services website",
    title: "Modern Service Industry",
    category: "Australian Cleaning Business",
    metrics: ["Blog Pages", "Lead Generation", "Conversion Focused", "SEO Optimized"],
    link: "https://gold-coast-cleaners.vercel.app",
  },
  {
    image: "/portfolio-imgs/fahemifarz.webp",
    imageHint: "screenshot fahemi farz personal brand website",
    title: "Personal Brand Portfolio",
    category: "Australian Fashion Designer",
    metrics: ["Client-Centric UI", "Custom Enquiry Forms", "E-commerce Ready"],
    link: "https://www.fehmifarz.com/",
  },
  {
    image: "/portfolio-imgs/singhassociates.webp",
    imageHint: "screenshot singh associates law firm website",
    title: "Landing/Capture Page",
    category: "Law Firm",
    metrics: ["Brand Authority", "Google Ads Optimized", "Minimalist UI", "Local SEO Optimized"],
    link: "https://singhassociates.ai-fied.com/",
  },
  {
    image: "/portfolio-imgs/edgrowth.webp",
    imageHint: "screenshot edgrowth consultants educational counselling website",
    title: "Professional Online Presence",
    category: "Ed-Tech Firm",
    metrics: ["Mobile Optimized", "Premium Animations", "Light & Dark Theme", "Modern UI"],
    link: "https://www.edgrowth.info/",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We listen. You share your vision, goals, and challenges. We assess fit and outline a strategic roadmap.",
  },
  {
    num: "02",
    title: "Strategy & Design",
    desc: "We present a bespoke design concept grounded in your brand, your audience, and conversion science.",
  },
  {
    num: "03",
    title: "Engineering & Build",
    desc: "We build your site in code — Next.js, React — with obsessive attention to performance and detail.",
  },
  {
    num: "04",
    title: "Launch & Optimize",
    desc: "We deploy, monitor, and refine. Your site goes live backed by our ongoing support and optimization.",
  },
];

const faqItems = [
  {
    q: "What's included in the Free Website Audit?",
    a: (
      <>
        We analyze your current website (or your competitor&apos;s if you don&apos;t have one yet) across
        performance, SEO, design, and conversion metrics. You&apos;ll receive a detailed report with
        actionable recommendations — completely free, no strings attached. The audit alone is
        valued at over <DynamicPrice amount={30000} />.
      </>
    ),
  },
  {
    q: "How long does a project take?",
    a: "Standard websites are delivered within 3-5 working days. Complex projects like SaaS platforms or large e-commerce stores typically take 3-6 weeks, depending on scope.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Absolutely. We actively serve clients in Australia, the US, UK, Europe, and Canada. We offer local currency bank accounts (USD ACH, UK BACS, EU SEPA, AUD EFT) with zero SWIFT wire fees, and use modern project management tools for smooth cross-timezone collaboration.",
  },
  {
    q: "How do international clients pay for projects?",
    a: (
      <>
        Clients in the US, UK, EU, Australia, Canada, and India can pay via direct local bank transfers (ACH, BACS, SEPA, EFT, UPI) or credit cards/PayPal. You can view all supported local bank account routing details on our <Link href="/payment-methods" className="text-accent hover:underline font-semibold">Payment Methods Portal</Link>.
      </>
    ),
  },
  {
    q: "What technologies do you use?",
    a: "We build exclusively with Next.js and React — the same stack used by Netflix, Notion, and Vercel. No WordPress, no Wix, no page builders. Every site is hand-coded for maximum performance.",
  },
  {
    q: "What happens after launch?",
    a: "We provide 3 months of free post-launch support — bug fixes, content updates, and performance monitoring. After that, we offer affordable maintenance plans to keep your site evolving.",
  },
];

const testimonials = [
  {
    quote: "We needed a website that matched the scale of our global operations. Kinstel delivered a site that looks professional, loads instantly, and has helped us connect with international buyers.",
    name: "Chopra Retec",
    role: "Global Rubber Manufacturer, India",
  },
  {
    quote: "Since launching our new site, online bookings have increased significantly. The design is clean, mobile-friendly, and our clients constantly compliment how professional it looks.",
    name: "James Bond Cleaning",
    role: "Cleaning Services, Australia",
  },
  {
    quote: "As a fashion designer, visuals are everything. Kinstel understood my brand and created a portfolio site that truly represents my aesthetic. The enquiry forms have been a game-changer.",
    name: "Fehmi Farz",
    role: "Fashion Designer, Australia",
  },
  {
    quote: "Kinstel completely transformed our online presence. The website they built is fast, elegant, and our customer engagement has never been higher. Truly world-class work.",
    name: "Blissful Station",
    role: "Premium Lifestyle Brand, India",
  },
  {
    quote: "Our Google Ads landing page from Kinstel started generating quality leads from day one. Minimalist design, fast load times, and exactly what our firm needed to stand out online.",
    name: "Singh Associates",
    role: "Law Firm, India",
  },
  {
    quote: "Kinstel built us a modern, responsive site with both light and dark themes. The premium animations and attention to detail set us apart from every other ed-tech company in the market.",
    name: "EdGrowth Consultants",
    role: "Ed-Tech Firm, India",
  },
];

// Plain-text mirror of `faqItems` above (first item contains JSX for
// dynamic currency display) — JSON-LD requires plain text. Amount reflects
// the base INR value used in the source data (DynamicPrice amount prop).
const faqPlainTextAnswers = [
  "We analyze your current website (or your competitor's if you don't have one yet) across performance, SEO, design, and conversion metrics. You'll receive a detailed report with actionable recommendations — completely free, no strings attached. The audit alone is valued at over ₹30,000.",
  "Standard websites are delivered within 3 to 5 working days. Complex projects like SaaS platforms or large e-commerce stores typically take 3-6 weeks, depending on scope.",
  "Absolutely. We actively serve clients in Australia, the US, UK, and Canada. We're experienced in cross-timezone collaboration and use modern project management tools to keep everything seamless.",
  "We build exclusively with Next.js and React — the same stack used by Netflix, Notion, and Vercel. No WordPress, no Wix, no page builders. Every site is hand-coded for maximum performance.",
  "We provide 3 months of free post-launch support — bug fixes, content updates, and performance monitoring. After that, we offer affordable maintenance plans to keep your site evolving.",
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq, index) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faqPlainTextAnswers[index],
    },
  })),
};

/* ─── PAGE ─── */

export default function GlobalPromoPage() {
  return (
    <div className="flex flex-col w-full">
      <JsonLd data={faqJsonLd} />
      <PromoHeader />

      <main className="flex-grow">
        {/* ═══════ S1: HERO ═══════ */}
        <section className="relative overflow-hidden min-h-[85dvh] flex items-center py-12 md:py-0">
          <DotPattern className="absolute inset-0 opacity-15 text-accent [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,white_20%,transparent_100%)]" />
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]" />
            <div className="absolute top-[30%] -right-[15%] w-[45%] h-[60%] bg-accent/5 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Text */}
              <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
                <div className="inline-flex justify-center lg:justify-start">
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-semibold bg-accent/10 text-accent border-accent/20 rounded-full">
                    ✦ Free Website Audit + Strategy Session
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
                  Stop Losing Clients
                  <br className="hidden sm:block" /> to a{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-orange-500 to-accent">
                    Bad Website.
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Get a Free Website Audit + Strategy Session. We&apos;ll show you exactly
                  what&apos;s costing you leads — and how to fix it. Custom websites
                  from{" "}
                  <span className="font-bold text-foreground">
                    <DynamicPrice amount={14999} />
                  </span>
                  .
                </p>

                {/* Trust pills */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {[
                    { label: "90+ PageSpeed", icon: <Zap className="h-3.5 w-3.5" /> },
                    { label: "3–5 Day Delivery", icon: <Award className="h-3.5 w-3.5" /> },
                    { label: "Serving 3+ Countries", icon: <Globe className="h-3.5 w-3.5" /> },
                  ].map((t) => (
                    <span
                      key={t.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/15 text-xs font-medium text-accent">
                      {t.icon} {t.label}
                    </span>
                  ))}
                </div>

                <MothersDayPromo />
              </div>

              {/* Hero Form */}
              <div
                id="promo-hero-form"
                className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-full">
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                  <PromoInquiryForm
                    variant="hero"
                    className="relative bg-card/80 backdrop-blur-sm border-accent/20 shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ S2: PAIN AGITATION ═══════ */}
        <section className="py-16 md:py-24 bg-muted/10 border-y border-white/5">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Your Website Is{" "}
              <span className="text-accent">Costing You</span> Clients.
              Here&apos;s Proof.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
              Every second a visitor waits for your page to load, every generic stock photo they see,
              every clunky mobile interaction — it erodes the trust you&apos;ve spent years building.
              Your website isn&apos;t just a brochure. It&apos;s a qualifying filter. And right now,
              it might be filtering out your best prospects.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              {painStats.map((s, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-5xl md:text-6xl font-bold text-accent">
                    {s.value}
                  </span>
                  <span className="mt-2 text-sm text-muted-foreground max-w-[200px]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <ScrollToFormButton
              size="lg"
              className="shadow-lg shadow-accent/20">
              Claim A Free Audit
            </ScrollToFormButton>
          </div>
        </section>

        {/* ═══════ S3: SOLUTION PILLARS ═══════ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-14">
              <p className="font-semibold uppercase tracking-wider text-accent text-sm">
                What Makes Us Different
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                We Don&apos;t Just Build Websites. We Engineer{" "}
                <span className="text-accent">Revenue Machines.</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                No page builders. No templates. Every pixel is purpose-built in code — Next.js and
                React — delivering websites that are as technically robust as they are visually
                breathtaking.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {solutionCards.map((c, i) => (
                <Card
                  key={i}
                  className="flex flex-col p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg">
                  <CardHeader className="p-0">
                    <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 ring-1 ring-accent/20">
                      {c.icon}
                    </div>
                    <CardTitle className="text-xl">{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-3">
                    <p className="text-muted-foreground leading-relaxed">
                      {c.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ S4: PORTFOLIO ═══════ */}
        <section className="py-16 md:py-24 border-y border-white/5 bg-muted/10">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-14">
              <p className="font-semibold uppercase tracking-wider text-accent text-sm">
                Our Work
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                Trusted by Businesses Across{" "}
                <span className="text-accent">3+ Countries</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From Australian service brands to global manufacturers — we deliver premium
                results, every time.
              </p>
            </div>
            <PortfolioGridSequential items={portfolioItems} />
            <div className="mt-12 flex justify-center">
              <ScrollToFormButton
                size="lg"
                className="shadow-lg shadow-accent/20">
                Get a Website Like These
              </ScrollToFormButton>
            </div>
          </div>
        </section>

        {/* ═══════ S5: COMPARISON TABLE ═══════ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why <span className="text-accent">Kinstel</span>?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See how we stack up against freelancers and other agencies.
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Feature</TableHead>
                    <TableHead className="text-center bg-accent/10 text-accent font-bold text-lg rounded-t-lg">
                      Kinstel
                    </TableHead>
                    <TableHead className="text-center">Freelancers</TableHead>
                    <TableHead className="text-center">Traditional Agencies</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Design Approach", "100% Custom UI/UX", "Template Based", "Generic / Recycled"],
                    ["Initial Step", "Free Website Audit", "Direct Quote", "Paid Consultation"],
                    ["Delivery Time", "3–5 Days", "Unpredictable", "4-6 Weeks"],
                    ["SEO & Speed", "Guaranteed 90+ Score", "Basic/None", "Extra Charge"],
                    ["Post-Launch Support", "3 Months Free", "Usually None", "Expensive Retainer"],
                    ["Conversion Focus", "CRO Optimized", "Hit or Miss", "Upsell Service"],
                    ["Pricing", "Transparent & Fixed", "Variable / Hidden", "High / Hourly"],
                  ].map(([feature, kinstel, freelancer, agency], i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{feature}</TableCell>
                      <TableCell className="text-center bg-accent/5 font-bold text-green-500">
                        {kinstel}
                      </TableCell>
                      <TableCell className="text-center">{freelancer}</TableCell>
                      <TableCell className="text-center">{agency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* ═══════ S6: PROCESS ═══════ */}
        <section className="py-16 md:py-24 border-y border-white/5 bg-muted/10">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-14">
              <p className="font-semibold uppercase tracking-wider text-accent text-sm">
                Our Process
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                From First Call to Launch in{" "}
                <span className="text-accent">4 Steps</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((s, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center text-center p-6 bg-accent/5 rounded-xl border border-accent/10">
                  <div className="absolute -top-4 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {s.num}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ S7: FAQ ═══════ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="text-center mb-14">
              <p className="font-semibold uppercase tracking-wider text-accent text-sm">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                Common Questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ═══════ S8: FINAL CTA ═══════ */}
        <section className="relative py-16 md:py-24 overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute bottom-0 left-[10%] w-[60%] h-[50%] bg-accent/10 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 container mx-auto max-w-5xl px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to Stop Losing{" "}
                <span className="text-accent">Clients?</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We take on only 5 new projects per month to ensure quality.{" "}
                <span className="font-semibold text-accent">
                  3 spots remaining.
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                No obligation. No sales pressure. Just honest insights about your digital presence.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Full Form */}
              <div id="inquiry-form">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent/40 to-accent/10 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                  <PromoInquiryForm
                    variant="full"
                    className="relative bg-card/80 backdrop-blur-sm border-accent/20 shadow-2xl"
                  />
                </div>
              </div>

              {/* Testimonial Placeholders + Email CTA */}
              <div className="flex flex-col gap-6">
                <h3 className="text-lg font-semibold text-center lg:text-left">
                  What Our Clients Say
                </h3>
                {testimonials.map((t, i) => (
                  <Card
                    key={i}
                    className="p-5 border-border/30 bg-card/30">
                    <p className="text-muted-foreground italic text-sm leading-relaxed mb-3">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}

                <div className="pt-2 text-center lg:text-left">
                  <p className="text-sm text-muted-foreground mb-3">
                    Prefer email? Write to us directly.
                  </p>
                  <PromoEmailCta className="w-full lg:w-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
