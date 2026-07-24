import { type Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { RetainerTracker } from "@/components/studio/retainer-tracker";

// Internal tool — must never be indexed or crawled.
export const metadata: Metadata = {
  title: "Retainers & MRR",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioRetainersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-grow">
        <section className="border-b border-border/60 py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <Link
              href="/studio"
              className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-accent">
              <ArrowLeft className="h-4 w-4" />
              Studio
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Retainers &amp; MRR Tracker
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Track recurring client retainers, monthly recurring revenue,
              and upcoming billing renewals. Everything is stored only in
              this browser&apos;s local storage. Nothing is uploaded
              anywhere.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <RetainerTracker />
          </div>
        </section>
      </main>
    </div>
  );
}
