import { type Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Internal tool — must never be indexed or crawled.
export const metadata: Metadata = {
  title: "Studio",
  robots: {
    index: false,
    follow: false,
  },
};

const studioTools = [
  {
    href: "/studio/invoice",
    icon: <FileText className="h-7 w-7 text-accent" />,
    title: "Invoice Generator",
    description:
      "Create and download a Kinstel Solutions invoice PDF. Everything is saved locally on this device only.",
  },
  // Add more internal Kinstel Studio tools here as they are built.
];

export default function StudioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-grow">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Internal
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                Kinstel Studio
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Internal tools for running Kinstel Solutions. Not public,
                not indexed — data stays on this device only.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
              {studioTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block">
                  <Card className="flex h-full flex-col p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg">
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
                        Open
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
    </div>
  );
}
