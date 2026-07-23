import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real client work from Kinstel Solutions — booking platforms, B2B websites, and lead-generation engines we've designed, built, and grown end to end.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Case Studies
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                Real work, for real businesses.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                A look at platforms and websites we've designed, built, and
                grown — from booking systems to lead-generation engines.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {caseStudies.map((study, index) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="block h-full">
                  <Card
                    className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-xl animate-in fade-in slide-in-from-bottom-5"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "backwards",
                    }}>
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={study.image}
                        alt={`Screenshot of the ${study.client} website`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="flex flex-1 flex-col p-6">
                      <p className="mb-2 text-sm font-semibold text-accent">
                        {study.industry}
                      </p>
                      <h2 className="mb-3 text-2xl font-headline font-semibold">
                        {study.client}
                      </h2>
                      <p className="text-muted-foreground">{study.summary}</p>
                      <span className="mt-6 inline-flex items-center text-sm font-semibold text-accent">
                        Read case study →
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
