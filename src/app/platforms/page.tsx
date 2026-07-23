import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import {
  CalendarCheck,
  Store,
  LayoutDashboard,
  Users,
  AppWindow,
  Plug,
  Search,
  Hammer,
  Rocket,
  Sparkles,
  ShieldCheck,
  Workflow,
  CheckCircle,
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
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Custom Web Platforms & Applications",
  description:
    "Kinstel builds custom web platforms — booking systems, multi-vendor marketplaces, dashboards, and web apps — engineered in modern code (Next.js, React). From MVP to scale.",
  alternates: {
    canonical: "/platforms",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Custom Web Platform & Application Development",
  provider: {
    "@type": "Organization",
    name: "Kinstel Solutions",
  },
  areaServed: ["India", "Worldwide"],
};

const whatWeBuild = [
  {
    icon: <CalendarCheck className="h-8 w-8 text-accent" />,
    title: "Booking & Appointment Platforms",
    description:
      "Slot-based scheduling, payments, reminders, and admin control — for clinics, studios, and service businesses.",
  },
  {
    icon: <Store className="h-8 w-8 text-accent" />,
    title: "Multi-Vendor Marketplaces",
    description:
      "Vendor onboarding, listings, bookings, payments, and payouts — a complete two-sided platform.",
  },
  {
    icon: <LayoutDashboard className="h-8 w-8 text-accent" />,
    title: "Customer & Admin Dashboards",
    description:
      "Secure logins, role-based access, and the data views your team actually needs.",
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: "Member Portals & Subscriptions",
    description: "Gated content, memberships, and recurring billing.",
  },
  {
    icon: <AppWindow className="h-8 w-8 text-accent" />,
    title: "Web Apps & Custom Software",
    description:
      "The workflows your business runs on — built to fit, not off-the-shelf compromises.",
  },
  {
    icon: <Plug className="h-8 w-8 text-accent" />,
    title: "Integrations & Automation",
    description:
      "Payments, CRMs, email, calendars, and the APIs that tie it all together.",
  },
];

const flagshipBullets = [
  "Practitioner profiles & discovery",
  "Slot-based online + in-clinic booking with pre-payment",
  "Secure in-platform video consultations",
  "Client & practitioner dashboards",
  "Admin panel with verification & financial tracking",
];

const howWeBuild = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Discovery & Scoping",
    description: "We turn your idea into a clear, buildable plan.",
  },
  {
    icon: <Hammer className="h-6 w-6" />,
    title: "MVP Build",
    description:
      "A working first version, fast — so you can test with real users.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Iterate & Scale",
    description: "We add features, harden, and grow it as you do.",
  },
];

const whyKinstel = [
  {
    icon: <Sparkles className="h-6 w-6 text-accent" />,
    title: "AI-native speed",
    description:
      "We ship platforms faster and leaner than a traditional dev shop.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-accent" />,
    title: "Senior engineering",
    description: "Real code, real architecture — built to scale and secure.",
  },
  {
    icon: <Workflow className="h-6 w-6 text-accent" />,
    title: "Build + grow, one team",
    description:
      "The team that builds your platform can also drive the traffic and conversions that fill it.",
  },
];

export default function PlatformsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={serviceJsonLd} />
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Beyond Websites
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                When a website isn't enough, we build the platform.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Booking systems, marketplaces, dashboards, member portals, and
                full web apps — engineered in modern code, built to scale, and
                designed to convert. If you can describe it, we can build it.
              </p>
            </div>
          </div>
        </section>

        {/* What We Build Section */}
        <section
          id="what-we-build"
          className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What We <span className="text-accent">Build</span>
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {whatWeBuild.map((item, index) => (
                <Card
                  key={index}
                  className="flex flex-col text-left p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg animate-in fade-in slide-in-from-bottom-5"
                  style={{
                    animationDelay: `${index * 100}ms`,
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

        {/* Flagship Proof Section */}
        <section
          id="flagship"
          className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="mx-auto max-w-4xl border-accent/20 p-8 md:p-12">
              <div className="flex flex-col gap-4">
                <Badge
                  variant="outline"
                  className="w-fit border-accent/30 bg-accent/5 text-accent">
                  Flagship Build
                </Badge>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl font-headline">
                  The Blissful Station — an online consultation & booking
                  platform
                </h2>
                <p className="text-muted-foreground">
                  A complete platform for a mental-health practice — built end
                  to end by Kinstel.
                </p>
                <ul className="mt-2 space-y-2">
                  {flagshipBullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start text-base font-medium">
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-accent shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="https://www.theblissfulstation.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 font-semibold text-accent hover:underline">
                  Visit the live platform →
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* How We Build Section */}
        <section
          id="how-we-build"
          className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Modern stack. <span className="text-accent">Scoped to ship.</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                We build on a modern, scalable stack (Next.js, React, Node,
                cloud infrastructure) — secure by design. We start with a
                focused MVP that proves the concept, then grow it feature by
                feature.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {howWeBuild.map((step, index) => (
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
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
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
          </div>
        </section>

        {/* Call To Action Section */}
        <section
          id="contact"
          className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Have a platform in mind?
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Tell us what you're building — we'll scope it and show you the
                fastest path to launch.
              </p>
              <div className="mt-10">
                <SmartCtaButton
                  phoneNumber="+919889988408"
                  email="contact@kinstel.com"
                  size="lg"
                  className="shadow-lg shadow-accent/20">
                  Book a Discovery Call
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
