
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

export const metadata: Metadata = {
  title: "Services | Kinstel - Web Design & Digital Marketing",
  description:
    "Explore our professional web design, development, and digital marketing services. specialized packages for businesses of all sizes.",
};

const services = [
  {
    icon: <Palette className="h-10 w-10 text-accent" />,
    title: "Custom Web Design",
    description:
      "Stand out with a unique website designed specifically for your brand. We focus on user experience, conversion optimization, and stunning aesthetics.",
    features: [
      "Custom UI/UX Design",
      "Brand Identity Integration",
      "Mobile-First Approach",
      "Interactive Elements",
    ],
  },
  {
    icon: <Code className="h-10 w-10 text-accent" />,
    title: "Web Development",
    description:
      "Robust and scalable web solutions built with modern technologies. From simple landing pages to complex web applications.",
    features: [
      "Next.js & React Development",
      "CMS Integration",
      "API Development",
      "Secure & Scalable Architecture",
    ],
  },
  {
    icon: <LineChart className="h-10 w-10 text-accent" />,
    title: "SEO & Performance",
    description:
      "Get found online and keep visitors engaged. We optimize every aspect of your site for search engines and loading speed.",
    features: [
      "Technical SEO",
      "Core Web Vitals Optimization",
      "Content Strategy",
      "Keyword Research",
    ],
  },
  {
    icon: <Smartphone className="h-10 w-10 text-accent" />,
    title: "App Development",
    description:
      "Extend your reach with mobile applications. We build cross-platform apps that provide seamless user experiences.",
    features: [
      "React Native Development",
      "iOS & Android",
      "App Store Deployment",
      "Maintenance & Support",
    ],
  },
  {
    icon: <Shield className="h-10 w-10 text-accent" />,
    title: "Maintenance & Security",
    description:
      "Keep your website running smoothly and securely. We provide ongoing support and updates to protect your digital assets.",
    features: [
      "Regular Updates",
      "Security Monitoring",
      "Backup Solutions",
      "Performance Monitoring",
    ],
  },
];

const pricingPackages = [
  {
    name: "Starter",
    price: "From ₹24,999",
    description: "Perfect for small businesses and startups.",
    features: [
      "Custom 5-Page Website",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "1 Month Support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Business",
    price: "From ₹49,999",
    description: "Ideal for growing businesses needing more features.",
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
              We understand that every business is unique. Contact us to discuss your specific requirements and get a tailored quote.
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
