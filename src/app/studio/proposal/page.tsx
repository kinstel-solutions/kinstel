import { type Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProposalGenerator } from "@/components/studio/proposal-generator";

// Internal tool — must never be indexed or crawled.
export const metadata: Metadata = {
  title: "Proposal Generator",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioProposalPage() {
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
              Proposal Generator
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Build a client proposal and download it as a PDF. Business
              details and saved clients carry over from the Invoice
              Generator. Everything is stored only in this browser&apos;s
              local storage — nothing is uploaded anywhere.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <ProposalGenerator />
          </div>
        </section>
      </main>
    </div>
  );
}
