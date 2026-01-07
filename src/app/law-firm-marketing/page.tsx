import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import { Award, Users, Zap, Palette, Rocket, CheckCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";

export const metadata: Metadata = {
  title: "Kinstel | Premier Law Firm Marketing Firm for Legal Growth",
  description:
    "Kinstel empowers lawyers and law firms to elevate their practice with custom website development, proven SEO, and legally compliant marketing.",
  keywords: [
    "law firm marketing firm",
    "legal marketing firm",
    "website developers for lawyers",
    "law firm website development",
    "law firm seo",
  ],
};

const lawyerStats = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    value: "98%",
    label: "Page Speed Score",
    description: "Blazing-fast load times to keep potential clients engaged.",
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    value: "150+",
    label: "Law Firms Served",
    description:
      "Trusted by legal professionals across various practice areas.",
  },
  {
    icon: <Award className="h-8 w-8 text-accent" />,
    value: "300%",
    label: "Avg. Lead Increase",
    description: "Our conversion-focused designs deliver measurable results.",
  },
];

const lawyerServices = [
  {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: "Credibility by Design",
    description:
      "Our law firm website development process focuses on clean layouts and strong visuals that reflect your professionalism.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-accent" />,
    title: "Performance & SEO",
    description:
      "We build blazing-fast, SEO-friendly websites designed to rank higher and convert visitors into clients.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-accent" />,
    title: "Conversion-Focused UX",
    description:
      "With a focus on user experience and SEO for lawyers, our designs ensure visitors can easily take action.",
  },
];

const lawyerPortfolioItems = [
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

export default function LawyersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background min-h-[100dvh] flex flex-col items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container relative z-10 mx-auto flex flex-col items-center justify-center text-center px-4 md:px-6">
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-12 duration-500">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
                Expert <span className="text-accent">Legal Marketing</span> for Law Firms
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                As a specialized law marketing firm, we focus on law firm website development and SEO for lawyers. We blend professional design with performance to make your practice stand out.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4 justify-center">
                <Button asChild size="lg" className="h-12 px-8 text-lg">
                  <Link href="/contact">
                    Book a Free Consultation
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-lg"
                >
                  <Link href="#portfolio">View Demo Designs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="bg-background py-12 md:py-24 lg:py-32 sm:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {lawyerStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 text-center animate-in fade-in slide-in-from-bottom-5"
                  style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
                >
                  <div className="mb-4">{stat.icon}</div>
                  <p className="text-5xl font-bold text-foreground">{stat.value}</p>
                  <h3 className="mt-2 text-lg font-semibold">{stat.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-background py-12 md:py-24 lg:py-32 sm:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">Built for Trust. Designed for Growth.</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Strategic <span className="text-accent">Legal Marketing</span> Services
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                We don’t just make websites—we craft digital first impressions that convert visitors into clients. Every project is built around speed, simplicity, and strategic design tailored for legal professionals.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {lawyerServices.map((service, index) => (
                <Card key={index} className="flex flex-col text-left p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg animate-in fade-in slide-in-from-bottom-5" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}>
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
        <section id="portfolio" className="bg-background py-12 md:py-24 lg:py-32 sm:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">Proven Results</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Legal Marketing That <span className="text-accent">Delivers Results</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                We've helped law firms across different practice areas increase their online presence and generate more qualified leads through expert website development.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {lawyerPortfolioItems.map((item, index) => (
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
        <section id="contact" className="bg-background py-12 md:py-24 lg:py-32 sm:py-28">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="font-semibold uppercase tracking-wider text-accent">Let's Get Started</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Start Your Legal Marketing Strategy Today
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Your website should work as hard as you do. Partner with a trusted legal marketing firm and get expert SEO for lawyers. Book a free consultation to get started.
              </p>
              <div className="mt-10">
                <SmartCtaButton
                  phoneNumber="+919889988408"
                  email="contact@kinstel.com"
                  size="lg"
                  className="shadow-lg shadow-accent/20"
                >
                  Request a Free Quote
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