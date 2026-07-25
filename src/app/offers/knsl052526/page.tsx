import { type Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle, Zap, ShieldCheck, Globe, Star, Phone,
  Code, Palette, Users, Award, ArrowUpRight, MessageCircle, ArrowDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiquidCard } from "@/components/ui/liquid-glass-card";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from "@/components/ui/card";
import { TimeBasedCallButton } from "@/components/ui/time-based-call-button";
import { JsonLd } from "@/components/seo/json-ld";

const InquiryForm = dynamic(
  () => import("@/components/sections/inquiry-form").then((mod) => mod.InquiryForm),
  {
    ssr: true,
    loading: () => (
      <div className="h-[400px] w-full animate-pulse bg-card/50 border border-border/50 rounded-xl" />
    ),
  }
);

export const metadata: Metadata = {
  title: "Bespoke Web Engineering for Visionary Brands | Kinstel",
  description:
    "Ultra-premium Next.js & React development for founders who refuse to compromise. From luxury showcases to scalable SaaS — engineered to convert.",
  robots: { index: false, follow: false },
};

/* ─── DATA ─── */

const audienceCards = [
  {
    icon: <Palette className="h-7 w-7 text-accent" />,
    title: "Luxury & Prestige Brands",
    desc: "Architecture firms, interior design studios, and boutique labels whose online presence must match their offline sophistication.",
  },
  {
    icon: <Code className="h-7 w-7 text-accent" />,
    title: "Tech-Forward Startups",
    desc: "Founders building custom SaaS products who need robust, scalable infrastructure — not another WordPress hack.",
  },
  {
    icon: <Globe className="h-7 w-7 text-accent" />,
    title: "Global Businesses",
    desc: "Companies operating across markets who need a digital HQ that performs flawlessly across geographies and devices.",
  },
];

const painStats = [
  { value: "53%", label: "of visitors leave if a page takes >3s to load" },
  { value: "94%", label: "of first impressions are design-related" },
  { value: "75%", label: "judge credibility by website design" },
];

const solutionCards = [
  {
    icon: <Star className="h-7 w-7 text-accent" />,
    title: "Visual Prestige",
    desc: "Immersive, award-caliber aesthetics: liquid-glass effects, micro-animations, and bespoke typography that make your brand unforgettable.",
  },
  {
    icon: <Zap className="h-7 w-7 text-accent" />,
    title: "Enterprise Performance",
    desc: "95+ Lighthouse scores. Server-side rendering. Edge-optimized delivery. Your site loads before they blink.",
  },
  {
    icon: <ShieldCheck className="h-7 w-7 text-accent" />,
    title: "Bespoke Infrastructure",
    desc: "Custom dashboards, booking systems, payment flows, SaaS MVPs — complex functionality built on a foundation that scales.",
  },
];

const services = [
  {
    icon: <Code className="h-8 w-8 text-accent" />,
    title: "Custom Web Solutions",
    description: "Tailored web solutions that align perfectly with your business goals, ensuring scalability and a unique competitive edge.",
    features: ["React & Next.js Development", "E-commerce Development", "Hosting & Domain Registration", "SaaS Development", "Secure & Scalable Architecture"],
  },
  {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: "Bespoke Web Design",
    description: "Stand out with a unique website designed specifically for your brand. We focus on user experience, conversion optimization, and stunning aesthetics.",
    features: ["Custom UI/UX Design", "Brand Identity Integration", "Mobile-First Approach", "High Performance", "Conversion-Focused Landing Pages"],
  },
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: "Performance & Organic Marketing",
    description: "Our strategy is simple: Increase visitors → Leads → Sales/Clients, while maintaining high relevancy from start to finish.",
    features: ["Google Ads Management", "Technical & On-Page SEO", "Conversion Rate Optimization", "PPC Campaign Management", "Google My Business Optimization"],
  },
];

const portfolioItems = [
  {
    image: "/portfolio-imgs/blissfulStation.png",
    title: "Premium & Elegant UI",
    category: "Blissful Station",
    metrics: ["High Performance", "Mobile Optimized", "Premium Animations", "Custom UI/UX"],
    link: "https://www.theblissfulstation.com/",
  },
  {
    image: "/portfolio-imgs/chopraretec.png",
    title: "Premium B2B Presence",
    category: "Global Rubber Manufacturer",
    metrics: ["B2B Excellence", "Professional Visuals", "Enterprise Scale"],
    link: "https://chopraretec.com",
  },
  {
    image: "/portfolio-imgs/jamesbond.png",
    title: "Modern Service Industry",
    category: "Australian Cleaning Business",
    metrics: ["Blog Pages", "Lead Generation", "Conversion Focused", "SEO Optimized"],
    link: "https://www.jamesbondcleaning.au",
  },
  {
    image: "/portfolio-imgs/fahemifarz.png",
    title: "Personal Brand Portfolio",
    category: "Australian Fashion Designer",
    metrics: ["Client-Centric UI", "Custom Enquiry Forms", "E-commerce Ready"],
    link: "https://www.fehmifarz.com/",
  },
  {
    image: "/portfolio-imgs/singhassociates.png",
    title: "Landing/Capture Page",
    category: "Law Firm",
    metrics: ["Brand Authority", "Google Ads Optimized", "Minimalist UI", "Local SEO"],
    link: "https://singhassociates.ai-fied.com/",
  },
  {
    image: "/portfolio-imgs/edgrowth.png",
    title: "Professional Online Presence",
    category: "Ed-Tech Firm",
    metrics: ["Mobile Optimized", "Premium Animations", "Light & Dark Theme", "Modern UI"],
    link: "https://www.edgrowth.info/",
  },
];

const stats = [
  { icon: <Zap className="h-8 w-8 text-accent" />, value: "95+", label: "PageSpeed Score" },
  { icon: <Users className="h-8 w-8 text-accent" />, value: "10+", label: "Clients Served" },
  { icon: <Award className="h-8 w-8 text-accent" />, value: "3–5 Day", label: "Delivery" },
  { icon: <Globe className="h-8 w-8 text-accent" />, value: "3+", label: "Countries Served" },
];

const processSteps = [
  { num: "01", title: "Discovery Call", desc: "We listen. You share your vision, goals, and challenges. We assess fit and outline a strategic roadmap." },
  { num: "02", title: "Strategy & Design", desc: "We present a bespoke design concept grounded in your brand, your audience, and conversion science." },
  { num: "03", title: "Engineering & Build", desc: "We build your site in code — Next.js, React — with obsessive attention to performance and detail." },
  { num: "04", title: "Launch & Optimize", desc: "We deploy, monitor, and refine. Your site goes live backed by our ongoing support and optimization." },
];

const faqItems = [
  { q: "How long does a project take?", a: "Typical timelines are 3–6 weeks for a standard premium site, and 6–12 weeks for complex SaaS platforms." },
  { q: "Do you work with clients outside India?", a: "Absolutely. We serve clients globally, including Australia, and are experienced in cross-timezone collaboration." },
  { q: "What technologies do you use?", a: "We build exclusively with Next.js and React — the same stack used by Netflix, Notion, and Vercel. No WordPress, no Wix." },
  { q: "What happens after launch?", a: "We offer ongoing maintenance, performance monitoring, and iterative improvements to keep your site evolving with your business." },
  { q: "How do we get started?", a: "Simply fill out the form on this page or message us on WhatsApp. We'll schedule a free discovery call within 24 hours." },
];


/* ─── MID-PAGE CTA BANNER ─── */
function MidPageCta() {
  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[60%] h-full bg-accent/5 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 container mx-auto max-w-3xl px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
          Impressed? Let&apos;s Talk About <span className="text-accent">Your Project.</span>
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Every great project starts with a conversation. Tell us your vision — we&apos;ll show you how to bring it to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="shadow-lg shadow-accent/25 text-base font-semibold px-8">
            <a href="#inquiry-form">Start Your Project</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base font-medium border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 px-8">
            <a href="https://wa.me/919889988408" target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

/* ─── PAGE ─── */
export default function HighTicketLandingPage() {
  return (
    <div className="flex flex-col w-full">
      <JsonLd data={faqJsonLd} />

      {/* ═══════ S1: HERO ═══════ */}
      <section className="relative overflow-hidden min-h-[85dvh] flex items-center">
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]" />
          <div className="absolute top-[30%] -right-[15%] w-[45%] h-[60%] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 pt-8 pb-12 md:pt-0 md:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Text */}
            <div className="lg:col-span-7 flex flex-col space-y-7 text-center lg:text-left">
              <div className="inline-flex justify-center lg:justify-start">
                <Badge variant="secondary" className="px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-semibold bg-accent/10 text-accent border-accent/20 rounded-full">
                  ✦ Premium Web Engineering — India to Australia
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
                We Don&apos;t Build Websites.<br className="hidden sm:block" />
                We Engineer{" "}
                <span className="text-accent">Digital Prestige.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Bespoke Next.js & React solutions for founders and CEOs who refuse to settle for templates.
                Ultra-premium aesthetics meets enterprise-grade performance.
              </p>

              {/* Trust markers - pill style */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-1">
                {[
                  { label: "95+ PageSpeed", icon: <Zap className="h-3.5 w-3.5" /> },
                  { label: "3–5 Day Delivery", icon: <Award className="h-3.5 w-3.5" /> },
                  { label: "Global Clients", icon: <Globe className="h-3.5 w-3.5" /> },
                ].map((t) => (
                  <span key={t.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/15 text-xs font-medium text-accent">
                    {t.icon} {t.label}
                  </span>
                ))}
              </div>

              {/* Desktop-only scroll hint */}
              <div className="hidden lg:flex items-center gap-2 pt-4 text-muted-foreground/60">
                <ArrowDown className="h-4 w-4 animate-bounce" />
                <span className="text-xs uppercase tracking-widest">Scroll to explore our work</span>
              </div>
            </div>

            {/* Form + CTAs */}
            <div id="claim-offer" className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-full space-y-4">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <InquiryForm className="relative bg-card/80 backdrop-blur-sm border-accent/20 shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ S2: WHO THIS IS FOR ═══════ */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-accent text-sm">Is This You?</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Built for Leaders Who Demand Excellence</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {audienceCards.map((c, i) => (
              <LiquidCard key={i} className="h-full bg-card/40 border-accent/10 hover:border-accent/30 transition-colors">
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 ring-1 ring-accent/20">{c.icon}</div>
                  <CardTitle className="text-xl">{c.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-muted-foreground leading-relaxed">{c.desc}</p></CardContent>
              </LiquidCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S3: PAIN POINT AGITATION ═══════ */}
      <section className="py-16 md:py-24 bg-muted/10 border-y border-white/5">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Your Website Is <span className="text-accent">Costing You</span> Clients.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
            Every second a visitor waits for your page to load, every generic stock photo they see,
            every clunky mobile interaction — it erodes the trust you&apos;ve spent years building.
            In high-ticket markets, your website isn&apos;t just a brochure. It&apos;s a qualifying filter.
            And right now, it might be filtering out your best prospects.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {painStats.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-bold text-accent">{s.value}</span>
                <span className="mt-2 text-sm text-muted-foreground max-w-[200px]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S4: THE SOLUTION ═══════ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-accent text-sm">Engineered Elegance</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Beyond the Template. Beyond the Ordinary.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We don&apos;t use page builders, themes, or drag-and-drop tools. Every pixel is purpose-built
              in code — Next.js and React — delivering websites that are as technically robust as they are visually breathtaking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {solutionCards.map((c, i) => (
              <LiquidCard key={i} className="h-full bg-card/40 border-accent/10 hover:border-accent/30 transition-colors">
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 ring-1 ring-accent/20">{c.icon}</div>
                  <CardTitle className="text-xl">{c.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-muted-foreground leading-relaxed">{c.desc}</p></CardContent>
              </LiquidCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S5: SERVICES BREAKDOWN ═══════ */}
      <section className="py-16 md:py-24 border-y border-white/5 bg-muted/10">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-accent text-sm">What We Deliver</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Full-Stack Premium Services</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((s, i) => (
              <Card key={i} className="flex flex-col text-left p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">{s.icon}</div>
                  <CardTitle className="text-2xl tracking-wide leading-tight">{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <CardDescription>{s.description}</CardDescription>
                  <ul className="mt-6 space-y-2">
                    {s.features.map((f, fi) => (
                      <li key={fi} className="flex items-center text-sm font-medium">
                        <CheckCircle className="h-4 w-4 mr-3 text-accent shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S6: PORTFOLIO ═══════ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-accent text-sm">Our Work</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Trusted by Visionaries. <span className="text-accent">Globally.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From Australian service brands to global manufacturers, from fashion designers to ed-tech firms — we deliver premium results, every time.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item, i) => (
              <Link key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-accent/30 h-full">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.category} — ${item.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="flex flex-1 flex-col p-6">
                    <p className="mb-2 text-sm font-semibold text-muted-foreground">{item.category}</p>
                    <h3 className="mb-4 text-xl font-semibold">{item.title}</h3>
                    <div className="flex flex-wrap gap-2 text-sm mt-auto">
                      {item.metrics.map((m, mi) => (
                        <Badge key={mi} variant="outline">{m}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <span className="flex items-center text-sm font-semibold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      View Project <ArrowUpRight className="ml-2 h-4 w-4" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MID-PAGE CTA ═══════ */}
      <MidPageCta />

      {/* ═══════ S7: STATS BAR ═══════ */}
      <section className="py-16 md:py-20 bg-muted/10 border-y border-white/5">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-3">{s.icon}</div>
                <p className="text-4xl md:text-5xl font-bold text-foreground">{s.value}</p>
                <h3 className="mt-2 text-sm font-semibold text-muted-foreground">{s.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S8: PROCESS TIMELINE ═══════ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-accent text-sm">Our Process</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">From Vision to Launch in 4 Steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {processSteps.map((s, i) => (
              <div key={i} className="relative flex gap-5 p-6 rounded-xl border border-border/50 bg-card/30 hover:border-accent/30 transition-colors">
                <span className="text-5xl font-bold text-accent/20 leading-none select-none">{s.num}</span>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S9: FAQ ═══════ */}
      <section className="py-16 md:py-24 bg-muted/10 border-y border-white/5">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="font-semibold uppercase tracking-wider text-accent text-sm">FAQ</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((f, i) => (
              <div key={i} className="rounded-xl border border-border/50 bg-card/30 p-6 hover:border-accent/20 transition-colors">
                <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S10: FINAL CTA ═══════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute bottom-0 left-[10%] w-[60%] h-[50%] bg-accent/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 container mx-auto max-w-2xl px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to Elevate Your <span className="text-accent">Digital Presence?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Schedule your free discovery call. No commitments. No generic pitches.
            Just a focused conversation about your vision.
          </p>

          <div id="inquiry-form" className="space-y-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/40 to-accent/10 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <InquiryForm className="relative bg-card/80 backdrop-blur-sm border-accent/20 shadow-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
