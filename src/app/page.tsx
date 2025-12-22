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
import { DynamicIslandDemo } from "@/components/ui/d-island";
import { Particles } from "@/components/ui/particles";
import { AuroraText } from "@/components/ui/aurora-text";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

export const metadata: Metadata = {
  title: "Kinstel | Web Design & Digital Marketing Agency",
  description:
    "Kinstel is a leading web design and digital marketing agency. We help businesses grow online with custom websites, SEO, and marketing strategies.",
};

const defaultStats = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    value: "98%",
    label: "Page Speed Score",
    description: "Blazing-fast load times to keep your users engaged.",
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    value: "150+",
    label: "Clients Served",
    description: "Trusted by businesses across various industries.",
  },
  {
    icon: <Award className="h-8 w-8 text-accent" />,
    value: "300%",
    label: "Avg. Conversion Uplift",
    description: "Our conversion-focused designs deliver measurable results.",
  },
];

const defaultServices = [
  {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: "Custom Web Design",
    description:
      "We create unique, professional websites that reflect your brand and vision.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-accent" />,
    title: "Responsive Development",
    description:
      "We build fast, mobile-friendly websites that work perfectly on all devices.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-accent" />,
    title: "Performance & SEO",
    description:
      "Our websites are optimized for speed and search engines to help you reach a wider audience.",
  },
];

const defaultPortfolioItems = [
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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      <Particles
        className="fixed inset-0 pointer-events-none z-0 animate-fade-in"
        quantity={140}
        staticity={30}
        ease={50}
        size={1.0}
        color="#F59E0B"
        refresh
      />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center py-20">
            <div className="container relative z-10 mx-auto flex flex-col items-center justify-center text-center px-4 md:px-6">
              <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-12 duration-500">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
                  Expert{" "}
                  <AuroraText
                    colors={["#F59E0B", "#D97706", "#FCD34D", "#F59E0B"]}>
                    Web Design
                  </AuroraText>{" "}
                  for Modern Businesses
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  We are a web design agency that helps businesses grow online.
                  We build beautiful, high-performing websites that are designed
                  to convert.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4 justify-center">
                  <DynamicIslandDemo />
                </div>
              </div>
            </div>

            <div className="relative flex w-full flex-col mt-12 items-center justify-center overflow-hidden">
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
            </div>
          </section>

          {/* Stats Section */}
          <section
            id="stats"
            className="py-20 sm:py-28">
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
            </div>
          </section>

          {/* Services Section */}
          <section
            id="services"
            className="py-20 sm:py-28">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-semibold uppercase tracking-wider text-accent">
                  Designed for Growth
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Modern <span className="text-accent">Web Design</span>{" "}
                  Services
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  We build beautiful, high-performing websites that are designed
                  to convert visitors into customers. Every project is built
                  around speed, simplicity, and strategic design.
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
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-2">
                      <CardDescription>{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section
            id="portfolio"
            className="py-20 sm:py-28">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-semibold uppercase tracking-wider text-accent">
                  Our Work
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Websites That{" "}
                  <span className="text-accent">Drive Growth</span>
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
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Call To Action Section */}
          <section
            id="contact"
            className="py-20 sm:py-28">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <div className="max-w-3xl mx-auto">
                <p className="font-semibold uppercase tracking-wider text-accent">
                  Let's Get Started
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Ready to Grow Your Business?
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Your website is your most important marketing asset. Partner
                  with a trusted web design agency to build a website that
                  drives results. Get a free quote to get started.
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
