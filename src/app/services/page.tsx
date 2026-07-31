
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Palette, Smartphone, LineChart, Code, Shield } from "lucide-react";
import Link from "next/link";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { JsonLd } from "@/components/seo/json-ld";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Design & Digital Marketing",
  provider: {
    "@type": "Organization",
    name: "Kinstel Solutions",
  },
  areaServed: ["India", "Worldwide"],
};

export const metadata: Metadata = {
  title: "Services & Digital Marketing",
  description:
    "Explore our professional web design, development, and digital marketing services. specialized packages for businesses of all sizes.",
  alternates: {
    canonical: "/services",
  },
};

const services = [
  {
    icon: <Code className="h-10 w-10 text-accent" />,
    title: "Custom Next.js Web Development",
    description:
      "Sub-second, mobile-first websites built with modern Next.js and React. Engineered for peak conversion and 90+ PageSpeed scores.",
    features: [
      "Next.js & React 19 Development",
      "3–5 Day Rapid Rush Delivery",
      "90+ PageSpeed Guarantee",
      "Conversion-Focused UI/UX Design",
    ],
  },
  {
    icon: <LineChart className="h-10 w-10 text-accent" />,
    title: "Performance Marketing & Local SEO",
    description:
      "High-intent Google Ads RSA management and Google Business Profile optimization designed to drive immediate, qualified customer inquiries.",
    features: [
      "Google Search Ads (RSA) Management",
      "Google Business Profile Maps 3-Pack SEO",
      "Technical & On-Page SEO Optimization",
      "Conversion Rate Optimization (CRO)",
    ],
  },
  {
    icon: <Palette className="h-10 w-10 text-accent" />,
    title: "Custom Web Platforms & SaaS MVPs",
    description:
      "Scalable multi-tenant web applications, appointment booking engines, telehealth platforms, and client portals built for growing B2B businesses.",
    features: [
      "Supabase & PostgreSQL Backends",
      "Slot Booking & Availability Engines",
      "In-Browser Video & Payment Gateways",
      "Admin Dashboards & Client Portals",
    ],
  },
];

const pricingPackages = [
  {
    name: "Starter Web Suite",
    price: "From ₹25,000",
    description: "Perfect for local SMBs & starter builds. Delivered in 3-5 days.",
    features: [
      "Custom Next.js Website",
      "Mobile-First Responsive Design",
      "90+ PageSpeed Performance",
      "Basic SEO & Contact Form",
      "1 Month Free Support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth Lead Funnel",
    price: "From ₹54,000",
    description: "Ideal for growing B2B businesses needing leads & ad integration.",
    features: [
      "10-Page Custom Website",
      "CMS Integration",
      "Advanced SEO Optimization",
      "Social Media Integration",
      "Performance Optimization",
      "3 Months Support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations.",
    features: [
      "Complex Web Applications",
      "E-commerce Functionality",
      "Custom API Integration",
      "Priority Support",
      "Dedicated Project Manager",
      "Annual Maintenance",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={serviceJsonLd} />
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-background">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline mb-6">
                Our <span className="text-accent">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Comprehensive digital solutions designed to help your business grow.
                From design to deployment, we've got you covered.
              </p>
              <p className="text-sm text-muted-foreground">
                Need something beyond a website? See our{" "}
                <Link href="/platforms" className="underline hover:text-accent">
                  custom platforms & applications
                </Link>
                , or browse{" "}
                <Link href="/work" className="underline hover:text-accent">
                  our recent work
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Card key={index} className="flex flex-col h-full border-muted hover:border-accent/50 transition-colors duration-300">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-accent mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
             <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Transparent <span className="text-accent">Pricing</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the package that fits your needs. No hidden fees, just clear value.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {pricingPackages.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={`flex flex-col h-full relative ${
                    pkg.popular 
                      ? "border-accent shadow-lg shadow-accent/10 scale-105 z-10" 
                      : "border-muted"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                    </div>
                    <CardDescription className="mt-2">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-accent mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <SmartCtaButton 
                      className="w-full" 
                      variant={pkg.popular ? "default" : "outline"}
                      phoneNumber="919889988408"
                      email="contact@kinstel.com"
                    >
                      {pkg.cta}
                    </SmartCtaButton>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent text-accent-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              We understand that every business is unique.{" "}
              <Link href="/contact" className="underline hover:opacity-80">
                Contact us
              </Link>{" "}
              to discuss your specific requirements and get a tailored quote.
            </p>
             <SmartCtaButton 
                variant="secondary" 
                size="lg"
                phoneNumber="919889988408"
                email="contact@kinstel.com"
              >
              Contact Us Today
            </SmartCtaButton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
