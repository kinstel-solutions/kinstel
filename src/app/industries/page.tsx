import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import {
  Factory,
  HeartPulse,
  GraduationCap,
  Wrench,
  Scale,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Kinstel Solutions engineers websites, custom platforms, and digital marketing for B2B manufacturing, healthcare, education, local services, and legal practices.",
  alternates: {
    canonical: "/industries",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.kinstel.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Industries We Serve",
      item: "https://www.kinstel.com/industries",
    },
  ],
};

const industries = [
  {
    icon: <Factory className="h-8 w-8 text-accent" />,
    name: "B2B & Manufacturing",
    description:
      "Enterprise-grade websites with proper enquiry (RFQ) pipelines and the credibility a serious manufacturer needs.",
    href: "/work/chopra-retec",
    cta: "See the case study",
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-accent" />,
    name: "Healthcare & Wellness",
    description:
      "From clinic sites to full booking & consultation platforms — secure, professional, and built to grow.",
    href: "/work/blissful-station",
    cta: "See the case study",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-accent" />,
    name: "Education & Coaching",
    description:
      "Fast, modern sites that turn prospective students into enquiries, backed by Google Ads that fill the pipeline.",
    href: "/work/edgrowth",
    cta: "See the case study",
  },
  {
    icon: <Wrench className="h-8 w-8 text-accent" />,
    name: "Home & Local Services",
    description:
      "Conversion-focused sites plus local SEO, so service businesses get found and get booked.",
    href: "/work/james-bond-cleaning",
    cta: "See the case study",
  },
  {
    icon: <Scale className="h-8 w-8 text-accent" />,
    name: "Legal",
    description:
      "Credible, conversion-focused websites and marketing for law firms.",
    href: "/law-firm-marketing",
    cta: "Learn more",
  },
];

export default function IndustriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Who We Work With
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                Industries We Serve
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We work across industries — here's a look at some of the
                sectors we've built for, and the kind of results each needs.
              </p>
            </div>
          </div>
        </section>

        {/* Industries Grid Section */}
        <section id="industries" className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => (
                <Card
                  key={industry.name}
                  className="flex flex-col text-left p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg animate-in fade-in slide-in-from-bottom-5"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "backwards",
                  }}>
                  <CardHeader className="p-0">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      {industry.icon}
                    </div>
                    <CardTitle className="text-2xl tracking-wide leading-tight">
                      {industry.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col p-0 mt-4">
                    <CardDescription className="text-base flex-1">
                      {industry.description}
                    </CardDescription>
                    <Link
                      href={industry.href}
                      className="mt-4 font-semibold text-accent hover:underline">
                      {industry.cta} →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-12 text-center text-sm text-muted-foreground">
              This list isn't exhaustive — if your business doesn't fit
              neatly into one of these sectors,{" "}
              <Link href="/contact" className="underline hover:text-accent">
                get in touch
              </Link>{" "}
              and let's talk about what you need.
            </p>
          </div>
        </section>

        {/* Call To Action Section */}
        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Don't see your industry?
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Tell us about your business — we'll show you what a serious
                website and marketing plan looks like for it.
              </p>
              <div className="mt-10">
                <SmartCtaButton
                  phoneNumber="+919889988408"
                  email="contact@kinstel.com"
                  size="lg"
                  className="shadow-lg shadow-accent/20">
                  Tell Us About Your Project
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
