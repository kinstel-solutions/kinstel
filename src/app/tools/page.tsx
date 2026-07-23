import { type Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  Scale,
  TrendingUp,
  Gauge,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Free Tools for Growing Your Website",
  description:
    "Free, instant, ungated tools to help you grow your website — an ROI calculator, a Next.js vs WordPress picker, a Google Ads budget estimator, a speed & SEO audit, and an instant project quote.",
  alternates: {
    canonical: "/tools",
  },
};

const tools = [
  {
    href: "/tools/website-roi-calculator",
    icon: <Calculator className="h-7 w-7 text-accent" />,
    title: "Website ROI Calculator",
    description:
      "See exactly how much more revenue a higher conversion rate would add to your website — based only on the numbers you enter.",
  },
  {
    href: "/tools/nextjs-vs-wordpress",
    icon: <Scale className="h-7 w-7 text-accent" />,
    title: "Next.js vs WordPress Picker",
    description:
      "Answer 5 honest questions and get a straight recommendation for your project — even if that answer is WordPress.",
  },
  {
    href: "/tools/google-ads-budget-estimator",
    icon: <TrendingUp className="h-7 w-7 text-accent" />,
    title: "Google Ads Budget Estimator",
    description:
      "Estimate clicks and leads from a monthly budget — or work backward from a lead target to the budget you'll need.",
  },
  {
    href: "/website-audit",
    icon: <Gauge className="h-7 w-7 text-accent" />,
    title: "Free Website Audit",
    description:
      "An instant speed, SEO, accessibility, and best-practices score for your live site, powered by Google PageSpeed Insights.",
  },
  {
    href: "/quote",
    icon: <FileSpreadsheet className="h-7 w-7 text-accent" />,
    title: "Get a Quote",
    description:
      "Answer a few quick questions and get an instant starting-from price range for your website, platform, or marketing project.",
  },
];

export default function ToolsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Free Tools
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                Free Tools for Growing Your Website
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                No signup, no gated PDF — just fast, honest calculators and
                checkers to help you make better decisions about your website
                and marketing.
              </p>
            </div>
          </div>
        </section>

        {/* Tools grid */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
              {tools.map((tool, index) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block">
                  <Card
                    className="flex h-full flex-col p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg animate-in fade-in slide-in-from-bottom-5"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "backwards",
                    }}>
                    <CardHeader className="p-0">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                        {tool.icon}
                      </div>
                      <CardTitle className="text-xl tracking-wide leading-tight">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-2 flex flex-1 flex-col justify-between p-0">
                      <CardDescription className="text-base">
                        {tool.description}
                      </CardDescription>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                        Try it
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
