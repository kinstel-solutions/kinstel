import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import {
  Award,
  Users,
  Zap,
  Palette,
  Rocket,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { InquiryForm } from "@/components/sections/inquiry-form";

import { LiquidCard } from "@/components/ui/liquid-glass-card";

export const metadata: Metadata = {
  title: "Kinstel | Top Web Design Company in Lucknow",
  description:
    "Kinstel is the leading web design company in Lucknow. We deliver custom websites, SEO, and digital marketing solutions to businesses in Lucknow.",
  keywords: [
    "web design company in lucknow",
    "website design lucknow",
    "seo company lucknow",
    "digital marketing lucknow",
    "web development lucknow",
  ],
};

const lucknowStats = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    value: "99%",
    label: "Uptime Guarantee",
    description: "Reliable hosting and support for Lucknow businesses.",
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    value: "50+",
    label: "Local Clients",
    description: "Helping businesses in Lucknow grow their online presence.",
  },
  {
    icon: <Award className="h-8 w-8 text-accent" />,
    value: "Top Rated",
    label: "Agency in Lucknow",
    description: "Recognized for excellence in web design and SEO.",
  },
];

const lucknowServices = [
  {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: "Custom Websites in Lucknow",
    description:
      "We create unique, professional websites tailored for the Lucknow market and your specific brand.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-accent" />,
    title: "Local SEO & Speed",
    description:
      "We optimize for local search to ensure your business ranks high when customers search in Lucknow.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-accent" />,
    title: "Affordable Packages",
    description:
      "High-quality web design and marketing solutions at competitive rates for Lucknow businesses.",
  },
];

const portfolioItems = [
  {
    image: "/advratnasingh.png",
    imageHint: "screenshot advocate ratna singh website",
    title: "Advocate Ratna Singh",
    category: "Independent Advocate",
    metrics: ["Modern Design", "Client-Focused"],
    link: "https://advratnasingh.vercel.app/",
  },
  {
    image: "/ababneh-law.png",
    imageHint: "screenshot ababneh and associates law firm website",
    title: "Ababneh & Associates",
    category: "International Law Firm",
    metrics: ["Multilingual", "Corporate Branding"],
    link: "https://ababneh-law.vercel.app/",
  },
  {
    image: "/advonex.png",
    imageHint: "screenshot advonex legal consultancy website",
    title: "Advonex",
    category: "Modern Legal Consultancy",
    metrics: ["Sleek UI", "Fast Load Times"],
    link: "https://advonex.vercel.app/",
  },
];

export default function LucknowPage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="flex flex-col text-center lg:text-left items-center lg:items-start animate-in fade-in slide-in-from-bottom-12 duration-500">
                <Badge
                  variant="outline"
                  className="mb-6 px-4 py-1.5 text-sm font-medium border-accent/30 bg-accent/5 text-accent rounded-full">
                  Premium Websites Starting @₹9,999/-
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline leading-tight">
                  Premier{" "}
                  <span className="text-accent">Web Design Company</span> in
                  Lucknow
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
                  We are Lucknow's trusted web design agency. We create
                  stunning, mobile-friendly websites that help local businesses
                  attract more customers and grow online.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 px-8 text-lg">
                    <Link href="/contact">
                      Get a Free Quote
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-lg">
                    <Link href="#portfolio">View Our Portfolio</Link>
                  </Button>
                </div>
              </div>

              {/* Form Content */}
              <div className="w-full max-w-md mx-auto lg:mr-0 animate-in fade-in slide-in-from-bottom-12 duration-500 delay-150">
                <InquiryForm
                  minimal={true}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          id="stats"
          className=" py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {lucknowStats.map((stat, index) => (
                <LiquidCard
                  key={index}
                  className="flex flex-col items-center p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg text-center animate-in fade-in slide-in-from-bottom-5"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: "backwards",
                  }}>
                  <div className="mb-4">{stat.icon}</div>
                  <p className="text-5xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{stat.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </LiquidCard>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className=" py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Local Expertise
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Best <span className="text-accent">Web Services</span> in
                Lucknow
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                We provide comprehensive web design and digital marketing
                services to help Lucknow businesses thrive in the digital age.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {lucknowServices.map((service, index) => (
                <LiquidCard
                  key={index}
                  className="flex flex-col text-left p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg animate-in fade-in slide-in-from-bottom-5"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: "backwards",
                  }}>
                  <CardHeader className="p-0">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-2">
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </LiquidCard>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section
          id="portfolio"
          className=" py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Our Work
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Websites That <span className="text-accent">Drive Growth</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                We create beautiful, high-performing websites that deliver
                measurable results for our clients. Explore some of our recent
                projects.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {portfolioItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full">
                  <LiquidCard
                    className="group flex flex-col overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-lg animate-in fade-in slide-in-from-bottom-5 h-full"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: "backwards",
                    }}
                    data-testid={`portfolio-item-${index}`}>
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={`Showcase of the ${item.title} project`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={item.imageHint}
                      />
                    </div>
                    <CardContent className="flex flex-1 flex-col p-6">
                      <p className="mb-2 text-sm font-semibold text-accent">
                        {item.category}
                      </p>
                      <h3 className="mb-4 text-2xl font-headline font-semibold">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-sm mt-auto">
                        {item.metrics.map((metric, metricIndex) => (
                          <Badge
                            key={metricIndex}
                            variant="secondary">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <span className="flex items-center text-sm font-semibold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View Project <ArrowUpRight className="ml-2 h-5 w-5" />
                      </span>
                    </CardFooter>
                  </LiquidCard>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call To Action Section */}
        <section
          id="contact"
          className=" py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Grow Your Business
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Best Web Design Company in Lucknow
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Looking for the best web design company in Lucknow? We are here
                to help you establish a powerful online presence. Contact us
                today for a free consultation.
              </p>
              <div className="mt-10">
                <SmartCtaButton
                  phoneNumber="+919889988408"
                  email="contact@kinstel.com"
                  size="lg"
                  className="shadow-lg shadow-accent/20">
                  Contact Us Today
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
