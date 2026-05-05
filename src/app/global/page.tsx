import { GlobalHeader } from "@/components/layout/global-header";
import { type Metadata } from "next";
import dynamic from "next/dynamic";
import {
  Award,
  Users,
  Zap,
  Palette,
  Rocket,
  CheckCircle,
  ArrowUpRight,
  ShieldCheck,
  Code,
  Layers,
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
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
import { LiquidCard } from "@/components/ui/liquid-glass-card";
import {
  ScrollVelocityContainerDynamic,
  ScrollVelocityRowDynamic,
} from "../web-design-company-lucknow/client-wrappers";
import { InquiryForm } from "@/components/sections/inquiry-form";
import { DotPattern } from "@/components/ui/dot-pattern";

export const metadata: Metadata = {
  title: "Premium Global Website Design Company | Kinstel",
  description:
    "Top Tier Web Designers. Get Affordable Premium Web Design. SEO-Ready, Mobile-Friendly, Free Digital Consult. Schedule a consultation today!",
  keywords: [
    "global web design company",
    "web development company",
    "professional website designer",
    "best website designing company",
    "international seo company",
  ],
  openGraph: {
    title: "Premium Global Website Design Company | Kinstel",
    description:
      "Top Tier Web Designers. Get Affordable Premium Web Design. SEO-Ready, Mobile-Friendly, Free Digital Consult.",
    url: "https://kinstel.com/global",
    siteName: "Kinstel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Global Website Design Company | Kinstel",
    description:
      "Get Affordable Premium Web Design. SEO-Ready, Mobile-Friendly, Free Digital Consult.",
  },
};

const globalStats = [
  {
    icon: (
      <Zap
        className="h-8 w-8 text-accent"
        aria-hidden="true"
      />
    ),
    value: "95+",
    label: "Performance & SEO Scores",
    description:
      "Beat the competition with lightning-fast, SEO-ready websites.",
  },
  {
    icon: (
      <Users
        className="h-8 w-8 text-accent"
        aria-hidden="true"
      />
    ),
    value: "Free Digital Consult",
    label: "Free Consultation",
    description: "Get your Digital Audit Now. No booking fees.",
  },
  {
    icon: (
      <Award
        className="h-8 w-8 text-accent"
        aria-hidden="true"
      />
    ),
    value: "3 Months",
    label: "Free Support Included",
    description:
      "Post-launch support to keep your site updated, secure & fast.",
  },
];

const globalServices = [
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
      "Our strategy is simple: Increase visitors → Leads → Sales & Clients, while maintaining high relevancy from start to finish.",
    features: [
      "Google Ads Management",
      "Technical & On-Page SEO",
      "Conversion Rate Optimization",
      "PPC Campaign Management",
      "Google My Business Optimization",
    ],
  },
];

const processSteps = [
  {
    title: "Discovery",
    description:
      "We discuss your business goals, target audience, target market, and design preferences.",
  },
  {
    title: "Design",
    description:
      "Our designers create a custom UI/UX mockup tailored to your brand.",
  },
  {
    title: "Development",
    description: "We build your site using the latest tech for speed and SEO.",
  },
  {
    title: "Launch",
    description: "We test everything and deploy your site to the live server.",
  },
];

const industries = [
  { icon: <Building2 className="h-6 w-6" />, name: "Real Estate" },
  { icon: <Stethoscope className="h-6 w-6" />, name: "Healthcare" },
  { icon: <GraduationCap className="h-6 w-6" />, name: "Education" },
  { icon: <ShoppingBag className="h-6 w-6" />, name: "E-Commerce" },
  { icon: <Briefcase className="h-6 w-6" />, name: "Corporate & B2B" },
  { icon: <Utensils className="h-6 w-6" />, name: "Restaurants" },
];

const faqs = [
  {
    question: "What is included in the starting package?",
    answer: (
      <>
        Our starting package (from <DynamicPrice amount={14999} />) is a comprehensive starter kit including a custom-designed professional website(2-3 pages maximum), mobile optimization, basic SEO, hosting setup. It's perfect for small businesses looking for a basic online presence.
      </>
    ),
  },
  {
    question: "What does 'Free Digital Consult' mean?",
    answer: (
      <>
        It means you don't pay a single <DynamicTerm type="currency-fraction" /> to start your Consult. We perform a Free Digital Audit first. You only pay once you are 100% satisfied with the work. No booking fees, no hidden charges.
      </>
    ),
  },
  {
    question: "How long does it take to deliver the website?",
    answer:
      "Standard websites are usually delivered within 7 to 10 working days, depending on the complexity and how quickly we receive content from your side.",
  },
  {
    question: "Will my website be SEO-friendly?",
    answer:
      "Yes, every website we build is optimized for search engines from the ground up. We target a 95+ SEO score on Google PageSpeed Insights to ensure you rank well globally.",
  },
  {
    question: "Do you offer maintenance after the website is live?",
    answer:
      "Absolutely. We provide 3 months of support. We ensure your website stays updated, secure, and performs optimally long after the launch.",
  },
];

const portfolioItems = [
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
    link: "https://jamesbondcleaning.au",
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

export default function GlobalPage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <GlobalHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden md:min-h-[90vh] flex flex-col items-center justify-center py-12 md:py-20">
          <DotPattern className="absolute inset-0 opacity-20 text-accent [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,white_20%,transparent_100%)]" />
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
                <Badge
                  variant="outline"
                  className="mb-6 px-4 py-1.5 text-sm font-medium border-accent/30 bg-accent/5 text-accent rounded-full">
                  World Class Services at Affordable Prices
                </Badge>

                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-5xl font-headline leading-tight">
                  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent via-orange-500 to-accent ">
                    Premier
                  </span>{" "}
                  Web Development Company
                </h1>
                <h2 className="mt-4">
                  <span className="text-xl md:text-2xl font-medium text-muted-foreground tracking-tight">
                    Elevating{" "}
                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent via-orange-500 to-accent">
                      businesses globally
                    </span>{" "}
                    to a{" "}
                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent via-orange-500 to-accent">
                      world-class digital presence.
                    </span>
                  </span>
                </h2>

                <p className="mt-6 text-lg leading-8  max-w-2xl">
                  Convert Clicks into Clients &amp; Customers with a Premium,
                  SEO-Ready Website. Schedule a consultation today to claim
                  (*Limited Time) <span className="font-bold">offers</span>{" "}
                  worth over <span className="font-bold"><DynamicPrice amount={20000} /></span> &amp;{" "}
                  <span className="font-bold">
                    Get a Free Digital Audit Now.
                  </span>
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                  <ScrollToFormButton className="h-12 px-8 text-lg">
                    Claim Free Consultation Now
                  </ScrollToFormButton>
                </div>
              </div>

              {/* Form Content */}
              <div
                id="inquiry-form"
                className="w-full max-w-md mx-auto lg:mr-0 relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent-foreground/20 to-primary/20 blur-xl" />
                <InquiryForm
                  minimal={true}
                  className="p-6 relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Velocity Scroll */}
        <div className="bg-accent/5 py-4 border-y border-accent/10 min-h-[52px]">
          <ScrollVelocityContainerDynamic>
            <ScrollVelocityRowDynamic baseVelocity={3}>
              <span className="mx-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Premium Web Design • SEO Ready • 95+ PageSpeed • Custom UI/UX •
                Free Digital Consult • Free Hosting Setup • 24/7 Support •
              </span>
            </ScrollVelocityRowDynamic>
          </ScrollVelocityContainerDynamic>
        </div>

        {/* Services Section */}
        <section
          id="services"
          className=" py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                What We Do
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Premium <span className="text-accent">Web Design Services</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                We provide comprehensive web design and digital marketing
                services to help businesses thrive in the digital era globally.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {globalServices.map((service, index) => (
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
          </div>
        </section>

        {/* Portfolio Section */}
        <section
          id="portfolio"
          className=" py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Premium Clientele
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Our work speaks <span className="text-accent">for itself</span>
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
            <div className="mt-12 flex justify-center">
              <ScrollToFormButton
                size="lg"
                className="shadow-lg shadow-accent/20">
                Get a Website Like This
              </ScrollToFormButton>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          id="stats"
          className=" py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {globalStats.map((stat, index) => (
                <LiquidCard
                  key={index}
                  className="flex flex-col items-center p-4 transition-all duration-300 text-center animate-in fade-in slide-in-from-bottom-5"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: "backwards",
                  }}>
                  <div>{stat.icon}</div>
                  <p className="text-3xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <h3 className=" text-lg font-semibold">{stat.label}</h3>
                  <p className=" text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </LiquidCard>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <ScrollToFormButton
                size="lg"
                className="shadow-lg shadow-accent/20">
                Get a Free Quote
              </ScrollToFormButton>
            </div>
          </div>
        </section>

        {/* Tech Stack Marquee */}
        <div className="py-12 bg-background border-y border-border/50 min-h-[176px]">
          <div className="container mx-auto px-4 mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Powered By Modern Tech
            </p>
          </div>
          <ScrollVelocityContainerDynamic>
            <ScrollVelocityRowDynamic baseVelocity={-2}>
              <span className="mx-8 text-xl font-bold text-foreground/50 flex items-center gap-2">
                <Code className="w-6 h-6" /> Next.js
              </span>
              <span className="mx-8 text-xl font-bold text-foreground/50 flex items-center gap-2">
                <Zap className="w-6 h-6" /> React
              </span>
              <span className="mx-8 text-xl font-bold text-foreground/50 flex items-center gap-2">
                <Palette className="w-6 h-6" /> Tailwind CSS
              </span>
              <span className="mx-8 text-xl font-bold text-foreground/50 flex items-center gap-2">
                <Layers className="w-6 h-6" /> Node.js
              </span>
              <span className="mx-8 text-xl font-bold text-foreground/50 flex items-center gap-2">
                <Rocket className="w-6 h-6" /> Vercel
              </span>
              <span className="mx-8 text-xl font-bold text-foreground/50 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" /> TypeScript
              </span>
            </ScrollVelocityRowDynamic>
          </ScrollVelocityContainerDynamic>
        </div>

        {/* Why Choose Us Comparison */}
        <section
          id="why-choose-us"
          className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why Choose <span className="text-accent">Kinstel</span>?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See how we stack up against freelancers and other agencies.
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Feature</TableHead>
                    <TableHead className="text-center bg-accent/10 text-accent font-bold text-lg rounded-t-lg">
                      Kinstel
                    </TableHead>
                    <TableHead className="text-center">Freelancers</TableHead>
                    <TableHead className="text-center">
                      Traditional Agencies
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Design Approach
                    </TableCell>
                    <TableCell className="text-center bg-accent/5 font-bold text-green-500">
                      100% Custom UI/UX
                    </TableCell>
                    <TableCell className="text-center">
                      Template Based
                    </TableCell>
                    <TableCell className="text-center">
                      Generic / Recycled
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Initial Step</TableCell>
                    <TableCell className="text-center bg-accent/5 font-bold text-green-500">
                      Free Digital Audit
                    </TableCell>
                    <TableCell className="text-center">Direct Quote</TableCell>
                    <TableCell className="text-center">
                      Paid Consultation
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Delivery Time</TableCell>
                    <TableCell className="text-center bg-accent/5 font-bold">
                      7-10 Days
                    </TableCell>
                    <TableCell className="text-center">Unpredictable</TableCell>
                    <TableCell className="text-center">4-6 Weeks</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SEO & Speed</TableCell>
                    <TableCell className="text-center bg-accent/5 font-bold text-green-500">
                      Guaranteed 90+ Score
                    </TableCell>
                    <TableCell className="text-center">Basic/None</TableCell>
                    <TableCell className="text-center">Extra Charge</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Post-Launch Support
                    </TableCell>
                    <TableCell className="text-center bg-accent/5 font-bold text-green-500">
                      3 Months Free
                    </TableCell>
                    <TableCell className="text-center">Usually None</TableCell>
                    <TableCell className="text-center">
                      Expensive Retainer
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Conversion Focus
                    </TableCell>
                    <TableCell className="text-center bg-accent/5 font-bold text-green-500">
                      CRO Optimized
                    </TableCell>
                    <TableCell className="text-center">Hit or Miss</TableCell>
                    <TableCell className="text-center">
                      Upsell Service
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pricing</TableCell>
                    <TableCell className="text-center bg-accent/5 font-bold text-green-500">
                      Transparent & Fixed
                    </TableCell>
                    <TableCell className="text-center">
                      Variable / Hidden
                    </TableCell>
                    <TableCell className="text-center">High / Hourly</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section
          id="industries"
          className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Industries We <span className="text-accent">Serve</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {industries.map((ind, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-6 bg-card border border-border/50 rounded-xl hover:border-accent/50 transition-colors">
                  <div className="mb-3 text-accent">{ind.icon}</div>
                  <span className="font-medium text-sm">{ind.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <ScrollToFormButton
                size="lg"
                className="shadow-lg shadow-accent/20">
                Discuss Your Industry Needs
              </ScrollToFormButton>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className=" py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked <span className="text-accent">Questions</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to know about our web design services.
              </p>
            </div>
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

        {/* Process Section */}
        <section
          id="process"
          className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How We Get You <span className="text-accent">Online</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From concept to launch in 4 simple steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center p-6 bg-accent/5 rounded-xl border border-accent/10">
                  <div className="absolute -top-4 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
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
          className=" py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 -z-10" />
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Limited Time Offer
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Expert Web Designers
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Claim your limited time offer (First 50 customers this summer)
                worth over <span className="text-foreground font-bold"><DynamicPrice amount={20000} /></span>
                . Get your Digital Audit Now.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <ContactCtaButton
                  size="lg"
                  className="shadow-lg shadow-accent/20 h-14 px-10 text-xl">
                  Schedule Consultation
                </ContactCtaButton>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Talk with a Web Designer today. No obligation.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
