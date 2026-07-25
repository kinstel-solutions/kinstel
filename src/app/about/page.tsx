import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import {
  Code2,
  TrendingUp,
  LifeBuoy,
  Sparkles,
  Workflow,
  ShieldCheck,
  LineChart,
  Search,
  Palette,
  Hammer,
  Rocket,
  BadgeCheck,
  Award,
  Building2,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";

export const metadata: Metadata = {
  title: "About Kinstel Solutions",
  description:
    "Kinstel Solutions is an AI-native web design, development, and marketing studio in Lucknow, serving businesses across India and worldwide. Verified, credentialed, and built for results.",
  alternates: {
    canonical: "/about",
  },
};

const whatWeDo = [
  {
    icon: <Code2 className="h-8 w-8 text-accent" />,
    title: "Design & Build",
    description:
      "High-performing websites, custom platforms, and SaaS — engineered in modern code (Next.js, React), not templates.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-accent" />,
    title: "Grow",
    description:
      "SEO, Google Ads, and conversion optimization that turn traffic into customers — and every rupee into a measurable return.",
  },
  {
    icon: <LifeBuoy className="h-8 w-8 text-accent" />,
    title: "Support",
    description:
      "Hosting, maintenance, and ongoing optimization, so what we build keeps working and keeps improving.",
  },
];

const whyKinstel = [
  {
    icon: <Sparkles className="h-6 w-6 text-accent" />,
    title: "AI-native & senior",
    description:
      "AI doesn't replace our engineering craft—it accelerates it. By leveraging modern AI dev tools, our team builds sub-second Next.js applications and ad funnels in days rather than months.",
  },
  {
    icon: <Workflow className="h-6 w-6 text-accent" />,
    title: "Full-funnel, not just a handoff",
    description:
      "We don't just deliver a website and disappear. We build the conversion machine and run the traffic that fills it.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-accent" />,
    title: "Real engineering",
    description:
      "From marketing sites to booking platforms and SaaS, we build in modern code — fast, secure, and scalable.",
  },
  {
    icon: <LineChart className="h-6 w-6 text-accent" />,
    title: "Measured by results",
    description:
      "Every build is wired for analytics and conversion tracking, so you see exactly what your investment returns.",
  },
];

const credentials = [
  { icon: <BadgeCheck className="h-4 w-4" />, label: "Udyam MSME: UDYAM-UP-50-0230220" },
  { icon: <BadgeCheck className="h-4 w-4" />, label: "IEC: HLCPS8014Q" },
  { icon: <BadgeCheck className="h-4 w-4" />, label: "D-U-N-S®: 77-197-4415" },
  { icon: <Award className="h-4 w-4" />, label: "Recognized by DesignRush" },
];

const howWeWork = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Discovery",
    description:
      "We learn your business, goals, and audience, and map the fastest path to results.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Design",
    description:
      "A bespoke design built around your brand and conversion science.",
  },
  {
    icon: <Hammer className="h-6 w-6" />,
    title: "Build",
    description:
      "Engineered in modern code with obsessive attention to speed and detail.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Grow",
    description:
      "We launch, measure, and optimize — turning your site into a growth engine.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Who We Are
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                A studio that builds — and grows — your digital presence.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Kinstel Solutions is an AI-native web design, development, and
                marketing studio based in Lucknow, working with businesses
                across India and around the world. We design and build
                high-performing websites and{" "}
                <Link href="/platforms" className="underline hover:text-accent">
                  custom platforms
                </Link>{" "}
                — then run{" "}
                <Link href="/services" className="underline hover:text-accent">
                  the marketing
                </Link>{" "}
                that grows them.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section
          id="what-we-do"
          className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What We <span className="text-accent">Do</span>
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {whatWeDo.map((item, index) => (
                <Card
                  key={index}
                  className="flex flex-col text-left p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg animate-in fade-in slide-in-from-bottom-5"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: "backwards",
                  }}>
                  <CardHeader className="p-0">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      {item.icon}
                    </div>
                    <CardTitle className="text-2xl tracking-wide leading-tight">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Kinstel Section */}
        <section
          id="why-kinstel"
          className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why <span className="text-accent">Kinstel</span>
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {whyKinstel.map((item, index) => (
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
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Related:{" "}
              <Link href="/work" className="underline hover:text-accent">
                See our work
              </Link>
            </p>
          </div>
        </section>

        {/* Verified & Compliant Section */}
        <section
          id="verified"
          className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="mx-auto max-w-4xl border-accent/20 p-8 md:p-12">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <Building2 className="h-7 w-7 text-accent" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Verified. Credentialed. Accountable.
                </h2>
                <p className="max-w-2xl text-muted-foreground">
                  We're a registered business with verifiable credentials —
                  rare for a studio our size. When you work with Kinstel,
                  you're working with a real, accountable entity.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  {credentials.map((cred, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm border-accent/30 bg-accent/5">
                      {cred.icon}
                      {cred.label}
                    </Badge>
                  ))}
                </div>
                <Link
                  href="/credentials"
                  className="mt-4 font-semibold text-accent hover:underline">
                  See our full credentials →
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* How We Work Section */}
        <section
          id="how-we-work"
          className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How We <span className="text-accent">Work</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {howWeWork.map((step, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center p-6 bg-accent/5 rounded-xl border border-accent/10">
                  <div className="absolute -top-4 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="mt-4 mb-2 text-accent">{step.icon}</div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
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
                Ready to grow?
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Tell us what you're building. We'll show you the fastest path
                there.
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
