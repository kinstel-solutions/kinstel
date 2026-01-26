import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Search,
  Timer,
  MousePointer2,
  Code,
  Layers,
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  Utensils,
  Gift,
  ArrowDown,
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
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { ScrollToFormButton } from "@/components/ui/scroll-to-form-button";
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
  InquiryFormDynamic,
} from "./client-wrappers";
import { TrackedLink } from "@/components/ui/tracked-link";
import { cn } from "@/lib/utils"
import { DotPattern } from "@/components/ui/dot-pattern"

export const metadata: Metadata = {
  title: "Leading Website Design Company in Lucknow | Kinstel",
  description:
    "Best Web Designers in Lucknow. Get Premium Web Design from ₹9999. SEO-Ready, Mobile-Friendly, No Upfront Cost. Schedule a consultation today!",
  keywords: [
    "web design company in lucknow",
    "web development company in lucknow",
    "website designer in lucknow",
    "website designer in lucknow",
    "best website designing company in lucknow",
    "seo company lucknow",
  ],
};

const lucknowStats = [
  {
    icon: <Zap className="h-8 w-8 text-accent" aria-hidden="true" />,
    value: "95+",
    label: "Performance & SEO Scores",
    description:
      "Beat the competition with lightning-fast, SEO-ready websites.",
  },
  {
    icon: <Users className="h-8 w-8 text-accent" aria-hidden="true" />,
    value: "Zero",
    label: "Upfront Cost",
    description: "Get your Website Now - Pay Later. No booking fees.",
  },
  {
    icon: <Award className="h-8 w-8 text-accent" aria-hidden="true" />,
    value: "Zero",
    label: "Maintenance",
    description: "Your website Won't break under our watch.",
  },
];

const lucknowServices = [
  {
    icon: <Code className="h-8 w-8 text-accent" />,
    title: "Custom Web Development",
    description:
      "Tailored web solutions that align perfectly with your business goals, ensuring scalability and a unique competitive edge.",
    features: [
      "Custom UI/UX Design",
      "React/Next.js Development",
      "E-commerce Development",
      "Hosting & Domain Registration",
      "Custom IT solutions",
    ],
  },
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: "Digital Marketing",
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
   {
    icon: <ShoppingBag className="h-8 w-8 text-accent" />,
    title: "Content Creation",
    description:
      "We create engaging and informative content to help your business stand out in the digital world.",
    features: [
      "Logo Design",
      "Brochure & Catalog Design",
      "Professional Photo & Video Creation",
      "Creative Copywriting",
      "Ad Creatives",
    ],
  },
];

const packageFeatures = [
  {
    icon: <Smartphone className="h-5 w-5 text-accent" />,
    text: "Fully Responsive & Mobile-Friendly",
  },
  {
    icon: <Search className="h-5 w-5 text-accent" />,
    text: "Advanced On-Page SEO Optimization",
  },
  {
    icon: <Zap className="h-5 w-5 text-accent" />,
    text: "Lightning Fast Loading (95+ Score)",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-accent" />,
    text: "Free SSL Certificate & Hosting Setup",
  },
  {
    icon: <Timer className="h-5 w-5 text-accent" />,
    text: "Fast Delivery (Within 7-10 Days)",
  },
  {
    icon: <MousePointer2 className="h-5 w-5 text-accent" />,
    text: "Custom UI/UX Design (No Templates)",
  },
];

const processSteps = [
  {
    title: "Discovery",
    description:
      "We discuss your business goals, target audience, target location(Gomti Nagar, Hazaratganj etc), and design preferences.",
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
  { icon: <Briefcase className="h-6 w-6" />, name: "Corporate" },
  { icon: <Utensils className="h-6 w-6" />, name: "Restaurants" },
];

const faqs = [
  {
    question: "What is included in the ₹9999 package?",
    answer:
      "Our ₹9999 package is a comprehensive starter kit including a custom-designed professional website (up to 5 pages), mobile optimization, basic SEO, hosting setup. It's perfect for small businesses looking for a premium online presence.",
  },
  {
    question: "What does 'Zero Upfront Cost' mean?",
    answer:
      "It means you don't pay a single rupee to start your project. We design and develop your website first. You only pay once you are 100% satisfied with the work. No booking fees, no hidden charges.",
  },
  {
    question: "How long does it take to deliver the website?",
    answer:
      "Standard websites are usually delivered within 7 to 10 working days, depending on the complexity and how quickly we receive content from your side.",
  },
  {
    question: "Will my website be SEO-friendly?",
    answer:
      "Yes, every website we build is optimized for search engines from the ground up. We target a 95+ SEO score on Google PageSpeed Insights to ensure you rank well in Lucknow and beyond.",
  },
  {
    question: "Do you offer maintenance after the website is live?",
    answer:
      "Absolutely. We provide 12 months of support. We ensure your website stays updated, secure, and performs optimally long after the launch.",
  },
];

const portfolioItems = [
  {
    image: "/Photography-Service Page.png",
    imageHint: "screenshot photography service catalog website",
    title: "Services Showcase Website",
    category: "Independent Photographer",
    metrics: ["Modern UX Design", "Visually Engaging UI", "SEO Optimization"],
    link: "https://massey-production.vercel.app/",
  },
  {
    image: "/singhLawFirmSiteHome.png",
    imageHint: "screenshot singh and associates law firm website",
    title: "Lead-Gen Website",
    category: "Law Firm",
    metrics: ["Technical + Local SEO", "Google Ads Optimized", "Google My Business"],
    link: "https://ababneh-law.vercel.app/",
  },
  {
    image: "/Enviro-ProductListing page.png",
    imageHint: "screenshot a product listing page",
    title: "B2B Company Website",
    category: "Air-Quality Monitoring Solutions",
    metrics: ["Mobile-First Design", "High Conversion", "Quick Navigation"],
    link: "https://envirosmart.vercel.app/",
  },
];

export default function LucknowPage() {
  return (
    <div className="flex flex-col gap-8 py-4">
       {/* <DotPattern
       
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)]"
        )}
      /> */}
      <Header />
       
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center py-12 md:py-20">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div
                className="flex flex-col text-center lg:text-left items-center lg:items-start"
                // animate-in fade-in slide-in-from-bottom-12 duration-500
              >
                
                <Badge
                  variant="outline"
                  className="mb-6 px-4 py-1.5 text-sm font-medium border-accent/30 bg-accent/5 text-accent rounded-full">
                  Premium Websites starting @9999
                </Badge>
                {/* <Badge
                  variant="secondary"
                  className="px-4 py-2 text-sm md:text-base font-medium bg-accent/10 text-accent border-accent/20">
                  🎉 Limited Time New Year Offer: Save ₹20,000
                </Badge> */}
                
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-5xl font-headline leading-tight">
                  Lucknow's{" "}
                  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent via-orange-500 to-accent ">
                    Leading
                  </span>{" "}
                  Web Design Company
                </h1>
                
                <p className="mt-6 text-lg leading-8  max-w-2xl">
                  Convert Clicks into Clients/Customer with a Premium, SEO-Ready
                  Website. Schedule a consultation today to claim (*Limited
                  Time) <span className="font-bold">offers</span>{" "}
                  worth <span className=" font-bold">₹20,000</span> &{" "}
                  <span className=" font-bold">Zero booking cost.</span>
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                  <SmartCtaButton
                    phoneNumber="+919889988408"
                    email="contact@kinstel.com"
                    className="h-12 px-8 text-lg">
                    Let's Discuss on Call
                  </SmartCtaButton>
                  <TrackedLink
                    href="#offers"
                    trackingAction="view_offer"
                    trackingLabel="hero_cta"
                    className="inline-flex items-center justify-center rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 border-2 border-accent/80 text-accent hover:bg-accent hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] group">
                    <span className="flex items-center gap-2">
                      View Offer
                      <ArrowDown aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </TrackedLink>
                </div>
              </div>

              {/* Form Content */}
              <div
                id="inquiry-form"
                className="w-full max-w-md mx-auto lg:mr-0 relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent-foreground/20 to-primary/20 blur-xl" />
                <InquiryFormDynamic
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
                Web Design Lucknow • SEO Ready • 95+ PageSpeed • Custom UI/UX •
                No Upfront Cost • Free Hosting Setup • 24/7 Support •
              </span>
            </ScrollVelocityRowDynamic>
          </ScrollVelocityContainerDynamic>
        </div>

        {/* Offer Details */}
        <section
          id="offers"
          className="py-20">
          <div className="container px-4 mx-auto">
            <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-accent/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 p-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

              <div className="relative z-10 max-w-4xl mx-auto">
                <Gift className="h-16 w-16 text-accent mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Claim Limited Time Offer Worth ₹20,000*
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Schedule your consultation today and claim your free digital
                  growth package.
                </p>

                <div className="grid sm:grid-cols-3 gap-6 mb-10 text-left">
                  <div className="bg-card/50 p-4 rounded-xl border border-border/50">
                    <span className="block text-2xl font-bold text-accent mb-1">
                      Free
                    </span>
                    <span className="font-medium">
                      SSL + 1 Year Hosting (worth ₹4,000){" "}
                    </span>
                  </div>
                  <div className="bg-card/50 p-4 rounded-xl border border-border/50">
                    <span className="block text-2xl font-bold text-accent mb-1">
                      Free
                    </span>
                    <span className="font-medium">
                      Basic SEO Setup (worth ₹5,000)
                    </span>
                  </div>
                  <div className="bg-card/50 p-4 rounded-xl border border-border/50">
                    <span className="block text-2xl font-bold text-accent mb-1">
                      Free
                    </span>
                    <span className="font-medium">
                      Basic Logo (worth ₹2,000)
                    </span>
                  </div>
                  <div className="bg-card/50 p-4 rounded-xl border border-border/50">
                    <span className="block text-2xl font-bold text-accent mb-1">
                      Free
                    </span>
                    <span className="font-medium">
                      1 year AMC (worth ₹6,000)
                    </span>
                  </div>
                  <div className="bg-card/50 p-4 rounded-xl border border-border/50">
                    <span className="block text-2xl font-bold text-accent mb-1">
                      Free
                    </span>
                    <span className="font-medium">
                      Google Analytics Setup (worth ₹1,500)
                    </span>
                  </div>

                  <div className="bg-card/50 p-4 rounded-xl border border-border/50">
                    <span className="block text-2xl font-bold text-accent mb-1">
                      Free
                    </span>
                    <span className="font-medium">
                      Professional Website Copy (worth ₹1,500)
                    </span>
                  </div>
                </div>

                <ScrollToFormButton
                  size="lg"
                  className="shadow-lg shadow-accent/20"
                  trackingAction="claim_offer"
                  trackingCategory="conversion"
                  trackingLabel="offers_section">
                  Claim Offer
                </ScrollToFormButton>
                <p className="mt-4 text-sm text-muted-foreground">
                  *Offer valid for limited time only. Terms apply.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Package Breakdown Section */}
        {/* <section
          id="package"
          className=" py-12 md:py-24 lg:py-32 bg-accent/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="bg-accent text-accent-foreground mb-4">
                  Bestseller Package
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline mb-6">
                  Complete Web Package <br />
                  <span className="text-accent">at ₹9999 Only</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Everything you need to launch your business online in Lucknow.
                  Premium design, high performance, and SEO optimization
                  included.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {packageFeatures.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3">
                      <div className="flex-shrink-0 bg-accent/10 p-1.5 rounded-full">
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <SmartCtaButton
                    phoneNumber="+919889988408"
                    email="contact@kinstel.com"
                    className="h-12 px-8 text-lg">
                    Book This Package
                  </SmartCtaButton>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/10 to-transparent blur-3xl" />
                <LiquidCard className="p-8 border-accent/20">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Premium Starter</h3>
                      <p className="text-muted-foreground">
                        For Small Business
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-bold text-accent">
                        ₹9999
                      </span>
                      <p className="text-xs text-muted-foreground line-through">
                        ₹14,999
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Pages</span>
                      <span className="font-semibold text-foreground">
                        Up to 5 Pages
                      </span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-border/50">
                      <span className="text-muted-foreground">SEO</span>
                      <span className="font-semibold text-foreground">
                        Advanced On-Page
                      </span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-semibold text-foreground">
                        7-10 Days
                      </span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-border/50">
                      <span className="text-muted-foreground">
                        SSL Certificate
                      </span>
                      <span className="font-semibold text-foreground">
                        Lifetime Free
                      </span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-border/50">
                      <span className="text-muted-foreground">
                        Upfront Cost
                      </span>
                      <span className="font-semibold text-accent">₹0</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground italic">
                    * Offer includes New Year vouchers worth ₹15,000
                  </p>
                </LiquidCard>
              </div>
            </div>
          </div>
        </section> */}

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
                Affordable <span className="text-accent">Web Design Services</span> in
                Lucknow
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                We provide comprehensive web design and digital marketing
                services to help Lucknow businesses thrive in the digital era.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {lucknowServices.map((service, index) => (
                <LiquidCard
                  key={index}
                  className="flex flex-col text-left p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
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
                    <ul className="mt-4 space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 mr-2 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </LiquidCard>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Comparison */}
        <section className="py-12 md:py-24 lg:py-32">
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
                    <TableCell className="font-medium">Upfront Cost</TableCell>
                    <TableCell className="text-center bg-accent/5 font-bold text-green-500">
                      Zero (₹0)
                    </TableCell>
                    <TableCell className="text-center">50% Advance</TableCell>
                    <TableCell className="text-center">
                      50-100% Advance
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
                      Guaranteed 95+ Score
                    </TableCell>
                    <TableCell className="text-center">Basic/None</TableCell>
                    <TableCell className="text-center">Extra Charge</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Support</TableCell>
                    <TableCell className="text-center bg-accent/5 font-bold">
                      1 year Free AMC
                    </TableCell>
                    <TableCell className="text-center">
                      Limited/Ghosted
                    </TableCell>
                    <TableCell className="text-center">Expensive AMC</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          id="stats"
          className=" py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {lucknowStats.map((stat, index) => (
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
                    className="group flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 h-full"
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
                        className="object-cover object-top transition-transform duration-500"
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
                  </LiquidCard>
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

       

        {/* Industries Section */}
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Industries We <span className="text-accent">Serve</span> in Lucknow
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
        <section className=" py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked <span className="text-accent">Questions</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to know about our web design services in
                Lucknow.
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
        <section className="py-12 md:py-24">
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
                Expert Web Designers in Lucknow
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Claim your New Year Offers worth{" "}
                <span className="text-foreground font-bold">₹20,000</span>. Get
                your Website Now-Pay Later.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <SmartCtaButton
                  phoneNumber="+919889988408"
                  email="contact@kinstel.com"
                  size="lg"
                  className="shadow-lg shadow-accent/20 h-14 px-10 text-xl">
                  Schedule Consultation
                </SmartCtaButton>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Talk with a Web Designer today. No obligation.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />{" "}
    </div>
  );
}
