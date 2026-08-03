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
  Code,
  ShoppingBag,
  Gauge,
  Calculator,
  Wrench,
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
import { AuroraText } from "@/components/ui/aurora-text";
import {
  DynamicIslandDemo,
  StripeBgGuides,
} from "@/components/home-client-components";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Kinstel Solutions | Premium Web Design, Development & Digital Marketing",
  description:
    "Kinstel Solutions is a web engineering studio that designs and builds high-performing websites and custom platforms — then runs the SEO and Google Ads that grow them.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kinstel Solutions | Premium Web Engineering & Digital Growth",
    description:
      "Kinstel Solutions designs and builds high-performing websites and custom platforms — then runs the SEO and Google Ads that grow them.",
    url: "https://www.kinstel.com",
    siteName: "Kinstel Solutions",
    images: [
      {
        url: "/social-assets/home-og-image.webp",
        width: 1200,
        height: 630,
        alt: "Kinstel Solutions — Premium Web Design & Development Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinstel Solutions | Premium Web Engineering & Digital Growth",
    description:
      "Kinstel Solutions designs and builds high-performing websites and custom platforms.",
    images: ["/social-assets/home-og-image.webp"],
  },
};

const defaultStats = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    value: "90+",
    label: "Page Speed Score",
    description: "Blazing-fast load times to keep your users engaged.",
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    value: "45+",
    label: "Projects Delivered",
    description: "Across custom web apps, platforms & growth campaigns.",
  },
  {
    icon: <Award className="h-8 w-8 text-accent" />,
    value: "3–5 Day",
    label: "Delivery",
    description:
      "Rapid delivery without cutting corners — most sites go live in under a week.",
  },
];

const defaultServices = [
  {
    icon: <Code className="h-8 w-8 text-accent" />,
    title: "Custom Web Solutions",
    description:
      "Tailored web solutions that align perfectly with your business goals, ensuring scalability and a unique competitive edge.",
    features: [
      "React & Next.js Development",
      "E-commerce Development",
      "Hosting & Domain Registration",
      "Software as a Service (SaaS) Development",
      "Secure & Scalable Architecture",
    ],
  },
  {
    icon: <Palette className="h-10 w-10 text-accent" />,
    title: "Bespoke Web Design",
    description:
      "Stand out with a unique website designed specifically for your brand. We focus on user experience, conversion optimization, and stunning aesthetics.",
    features: [
      "Custom UI/UX Design",
      "Brand Identity Integration",
      "Mobile-First Approach",
      "High Performance (Min. Load Time)",
      "Landing Page Design (Conversion Focused)",
    ],
  },
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: "Performance & Organic Marketing",
    description:
      "Our Strategy is simple: Increase visitors => Leads => Sales/Clients, While maintaining high relevancy from start to finish.",
    features: [
      "Google Ads Management",
      "Technical & On-Page SEO",
      "Conversion Rate Optimization",
      "PPC Campaign Management",
      "Google My Business Optimization",
    ],
  },
  // {
  //   icon: <ShoppingBag className="h-8 w-8 text-accent" />,
  //   title: "E-Commerce Development",
  //   description:
  //     "Launch a powerful online store designed to convert visitors into loyal customers with seamless payments and intuitive user experiences.",
  //   features: [
  //     "Custom Storefronts",
  //     "Payment Gateway Integration",
  //     "Secure Checkout Flow",
  //     "Inventory Management System",
  //   ],
  // },
  // {
  //   icon: <ShoppingBag className="h-8 w-8 text-accent" />,
  //   title: "Content Creation",
  //   description:
  //     "We create engaging and informative content to help your business stand out in the digital world.",
  //   features: [
  //     "Logo Design",
  //     "Brochure & Catalog Design",
  //     "Professional Photo & Video Creation",
  //     "Creative Copywriting",
  //     "Ad Creatives",
  //   ],
  // },
];

const defaultPortfolioItems = [
  {
    image: "/portfolio-imgs/blissfulStation.webp",
    imageHint: "screenshot blissful station website",
    title: "Premium & Elegant UI",
    category: "Blissful Station",
    metrics: [
      "High Performance",
      "Mobile Optimized",
      "Premium Animations",
      "Custom UI/UX",
    ],
    link: "https://www.theblissfulstation.com/",
  },
  {
    image: "/portfolio-imgs/chopraretec.webp",
    imageHint: "screenshot chopra retec industrial technology website",
    title: "Premium B2B Presence",
    category: "Global Rubber Manufacturer",
    metrics: [
      "B2B Excellence",
      "Professional Visuals & animations",
      "Enterprise Scale",
    ],
    link: "https://chopraretec.com",
  },
  {
    image: "/portfolio-imgs/jamesbond.webp",
    imageHint: "screenshot james bond cleaning services website",
    title: "Modern Service Industry",
    category: "Australian Cleaning Business",
    metrics: [
      "Blog Pages",
      "Lead Generation",
      "Conversion Focused",
      "SEO Optimized",
    ],
    link: "https://www.jamesbondcleaning.au",
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
    metrics: [
      "Brand Authority",
      "Google Ads Optimized",
      "Minimalist UI",
      "Local SEO Optimized",
    ],
    link: "https://singhassociates.ai-fied.com/",
  },
  {
    image: "/portfolio-imgs/edgrowth.webp",
    imageHint:
      "screenshot edgrowth consultants educational counselling website",
    title: "Professional Online Presence",
    category: "Ed-Tech Firm",
    metrics: [
      "Mobile Optimized",
      "Premium Animations",
      "Light & Dark Theme",
      "Modern UI",
    ],
    link: "https://www.edgrowth.info/",
  },
];

const defaultFreeTools = [
  {
    icon: <Gauge className="h-8 w-8 text-accent" />,
    title: "Free Website Audit",
    description:
      "See your site's real speed, SEO & performance scores in seconds.",
    link: "/website-audit",
  },
  {
    icon: <Calculator className="h-8 w-8 text-accent" />,
    title: "Instant Quote",
    description:
      "Get a ballpark price for your project in a couple of clicks.",
    link: "/quote",
  },
  {
    icon: <Wrench className="h-8 w-8 text-accent" />,
    title: "Free Calculators",
    description:
      "Website ROI, Google Ads budget, and Next.js-vs-WordPress — free tools to plan smarter.",
    link: "/tools",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <JsonLd data={localBusinessJsonLd} />
      <StripeBgGuides
        columnCount={8}
        animated={true}
        animationDuration={8}
        animationDelay={0.8}
        glowColor="hsl(var(--accent))"
        glowSize="5vh"
        glowOpacity={0.8}
        randomize={false}
        randomInterval={120}
        maxActiveColumns={8}
        contained={false}
        easing="spring"
        darkMode={true}
      />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative overflow-hidden min-h-[80dvh] flex flex-col items-center justify-center py-10">
            <div className="container relative z-10 mx-auto flex flex-col items-center justify-center text-center px-4 md:px-6">
              <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-12 duration-500">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
                  Turn Your{" "}
                  <AuroraText
                    colors={["#F59E0B", "#D97706", "#FCD34D", "#F59E0B"]}>
                    Web Presence
                  </AuroraText>{" "}
                  Into a High-Converting Sales Engine
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  No bloated agency timelines. No slow templates. Just lightning-fast web builds and performance marketing that generates real revenue.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4 justify-center">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md font-semibold px-6 py-6 text-base">
                    <Link href="/website-audit">Get Free Instant Audit</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-6 py-6 text-base font-medium">
                    <Link href="/quote">Estimate Project Quote</Link>
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4 justify-center">
                  <DynamicIslandDemo />
                </div>
              </div>
            </div>

            {/* <div className="relative flex w-full flex-col mt-12 items-center justify-center overflow-hidden">
              <ScrollVelocityContainer className="text-4xl tracking-[-0.02em] md:text-5xl md:leading-[5rem]">
                <ScrollVelocityRow
                  baseVelocity={20}
                  direction={1}>
                  Nothing Is True
                </ScrollVelocityRow>
                <ScrollVelocityRow
                  baseVelocity={20}
                  direction={-1}>
                  Everything Is Permitted
                </ScrollVelocityRow>
              </ScrollVelocityContainer>
            </div> */}
          </section>

          {/* Services Section */}
          <section
            id="services"
            className="py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-semibold uppercase tracking-wider text-accent">
                  Designed for Growth
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Our <span className="text-accent">Premium</span> Services
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  From high-performing websites to custom platforms and SaaS,
                  every build is engineered for speed, conversion, and growth —
                  and backed by the marketing to match.
                </p>
              </div>
              <div className="mt-16 grid gap-8 md:grid-cols-3">
                {defaultServices.map((service, index) => (
                  <Card
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
                      <CardTitle className="text-4xl tracking-wide leading-tight">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <CardDescription>{service.description}</CardDescription>
                      <ul className="mt-8 space-y-2">
                        {service.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center text-lg font-medium animate-in fade-in slide-in-from-left-2 duration-500"
                            style={{
                              animationDelay: `${index * 150 + i * 100 + 400}ms`,
                              animationFillMode: "backwards",
                            }}>
                            <CheckCircle className="h-5 w-5 mr-3 text-accent shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <Button size="lg" asChild>
                  <Link href="/services">
                    Explore All Services
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section
            id="portfolio"
            className="py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-semibold uppercase tracking-wider text-accent">
                  Premium Clientele
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Our work speaks{" "}
                  <span className="text-accent">for itself</span>
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  We create beautiful, high-performing websites that deliver
                  measurable results for our clients. Explore some of our recent
                  projects.
                </p>
              </div>

              <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {defaultPortfolioItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full">
                    <Card
                      className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl animate-in fade-in slide-in-from-bottom-5 h-full"
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
                        <p className="mb-2 text-sm font-semibold text-white/80">
                          {item.category}
                        </p>
                        <h3 className="mb-4 text-2xl font-headline font-semibold">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-sm mt-auto">
                          {item.metrics.map((metric, metricIndex) => (
                            <Badge
                              key={metricIndex}
                              variant="outline">
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
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section
            id="stats"
            className="py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {defaultStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-6 text-center animate-in fade-in slide-in-from-bottom-5"
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
                  </div>
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <SmartCtaButton
                  phoneNumber="+919889988408"
                  email="contact@kinstel.com"
                  size="lg">
                  Get Your Free Consultation
                </SmartCtaButton>
              </div>
            </div>
          </section>

          {/* Free Tools Section */}
          <section
            id="free-tools"
            className="py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-semibold uppercase tracking-wider text-accent">
                  Free Tools
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Try Before You{" "}
                  <span className="text-accent">Talk to Us</span>
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Free, no-strings tools to see where you stand and plan your
                  project.
                </p>
              </div>
              <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                {defaultFreeTools.map((tool, index) => (
                  <Link
                    key={index}
                    href={tool.link}
                    className="block h-full">
                    <Card
                      className="group flex h-full flex-col text-left p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg animate-in fade-in slide-in-from-bottom-5"
                      style={{
                        animationDelay: `${index * 150}ms`,
                        animationFillMode: "backwards",
                      }}>
                      <CardHeader className="p-0">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                          {tool.icon}
                        </div>
                        <CardTitle className="text-2xl font-headline tracking-wide leading-tight">
                          {tool.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col p-0 mt-4">
                        <CardDescription>{tool.description}</CardDescription>
                        <span className="mt-auto pt-6 flex items-center text-sm font-semibold text-accent">
                          Try it now{" "}
                          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
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
                <p className="font-semibold uppercase tracking-wider text-accent">
                  Let's Get Started
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Ready to Grow Your Business?
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Your website is your most important growth asset. Partner
                  with a studio that designs, builds, and markets — so your
                  site doesn't just look great, it delivers customers. Get a
                  free quote to start.
                </p>
                <div className="mt-10">
                  <SmartCtaButton
                    phoneNumber="+919889988408"
                    email="contact@kinstel.com"
                    size="lg"
                    className="shadow-lg shadow-accent/20">
                    Request a Free Quote
                  </SmartCtaButton>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
