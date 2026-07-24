import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How to Choose a Web Design Partner — Compare Your Options",
  description:
    "DIY template, freelancer, agency, or a studio like Kinstel? An honest, side-by-side comparison of cost, quality, and support to help you pick what actually fits your goals and budget.",
  alternates: {
    canonical: "/compare",
  },
};

type Row = {
  label: string;
  values: [string, string, string, string];
};

const rows: Row[] = [
  {
    label: "Upfront cost",
    values: ["Lowest", "Low", "High", "Mid (value)"],
  },
  {
    label: "Design & code",
    values: [
      "Generic template",
      "Varies widely",
      "Custom",
      "Custom, modern code (Next.js/React)",
    ],
  },
  {
    label: "Performance & SEO",
    values: ["Often weak", "Varies", "Usually good", "Strong, built-in"],
  },
  {
    label: "Marketing (SEO/Ads) included",
    values: [
      "No",
      "Rarely",
      "Sometimes (separate team)",
      "Yes — same team builds & markets",
    ],
  },
  {
    label: "Turnaround",
    values: [
      "Instant (you do it)",
      "Varies",
      "Often slow",
      "Fast (days for standard sites)",
    ],
  },
  {
    label: "Ongoing support",
    values: ["You handle it", "Depends", "Yes (premium)", "Yes (hosting + AMC)"],
  },
  {
    label: "Accountability",
    values: [
      "You",
      "One individual",
      "Company",
      "Registered business + verifiable credentials",
    ],
  },
];

const columns = ["DIY / Template", "Freelancer", "Typical Agency", "Kinstel"];

const guide = [
  {
    title: "A template/DIY builder",
    description:
      "if it's a hobby, a temporary page, or the budget is near-zero and you'll maintain it yourself.",
  },
  {
    title: "A freelancer",
    description:
      "if you need a simple site cheaply and can manage the project and follow-ups yourself.",
  },
  {
    title: "A large agency",
    description:
      "if you're an enterprise with the budget and process for it.",
  },
  {
    title: "A studio like Kinstel",
    description:
      "if you want custom, high-performing work and the marketing to grow it — delivered fast by one accountable team, at fair value.",
  },
];

export default function ComparePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                How to Choose
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                How to Choose the Right Way to Build Your Website
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Template, freelancer, agency, or a studio like us? Here's an
                honest comparison to help you pick what actually fits your
                goals and budget — even if that isn't us.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section id="comparison" className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="overflow-x-auto rounded-lg border">
              <Table className="min-w-[720px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[220px]">&nbsp;</TableHead>
                    {columns.map((col, index) => (
                      <TableHead
                        key={col}
                        className={cn(
                          "text-foreground font-semibold",
                          index === columns.length - 1 &&
                            "bg-accent/10 text-accent border-l border-accent/20"
                        )}>
                        {col}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell className="font-medium text-foreground">
                        {row.label}
                      </TableCell>
                      {row.values.map((value, index) => (
                        <TableCell
                          key={index}
                          className={cn(
                            "text-muted-foreground",
                            index === row.values.length - 1 &&
                              "bg-accent/5 font-medium text-foreground border-l border-accent/20"
                          )}>
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Which is right for you Section */}
        <section id="guide" className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Which is right for <span className="text-accent">you?</span>
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {guide.map((item, index) => (
                <Card
                  key={item.title}
                  className={cn(
                    "flex flex-col p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg animate-in fade-in slide-in-from-bottom-5",
                    index === guide.length - 1 && "border-accent/30 bg-accent/5"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "backwards",
                  }}>
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl tracking-wide leading-tight">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-2">
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Note + CTA Section */}
        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground">
                The best choice depends on your goals and budget — and
                sometimes a simpler option genuinely is enough. If you want a
                straight recommendation for your situation, just ask.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <SmartCtaButton
                  phoneNumber="+919889988408"
                  email="contact@kinstel.com"
                  size="lg"
                  className="shadow-lg shadow-accent/20">
                  Get an Honest Recommendation
                </SmartCtaButton>
                <Link
                  href="/quote"
                  className="font-semibold text-accent hover:underline">
                  or try the quote builder →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
