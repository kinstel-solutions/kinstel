import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, MapPin, Building2, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { JsonLd } from "@/components/seo/json-ld";
import { caseStudies } from "@/lib/case-studies";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return {};
  }

  return {
    title: `${study.client} Case Study`,
    description: study.summary,
    alternates: {
      canonical: `/work/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const showTestimonial = !study.testimonial.quote.startsWith("[");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Case Studies",
        item: "https://www.kinstel.com/work",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: study.client,
        item: `https://www.kinstel.com/work/${study.slug}`,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Case Study
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                {study.client}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  {study.industry}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {study.location}
                </span>
              </div>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {study.summary}
              </p>
              <Link
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
                Visit the live site
                <ExternalLink className="h-4 w-4" />
              </Link>

              <div className="relative mt-10 h-72 w-full overflow-hidden rounded-xl border border-border/50 md:h-[420px]">
                <Image
                  src={study.image}
                  alt={`Screenshot of the ${study.client} website`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                The <span className="text-accent">Challenge</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {study.challenge}
              </p>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Our <span className="text-accent">Approach</span>
              </h2>
              <ul className="mt-6 space-y-3">
                {study.approach.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-base font-medium">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <Card className="border-accent/20 p-8 md:p-12">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Results
                </h2>
                <ul className="mt-6 space-y-3">
                  {study.results.map((item, i) => (
                    <li
                      key={i}
                      className="text-base font-medium text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Tech Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Tech <span className="text-accent">Stack</span>
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {study.tech.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="px-3 py-1.5 text-sm border-accent/30 bg-accent/5">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        {showTestimonial && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
              <Card className="mx-auto max-w-4xl border-accent/20 p-8 md:p-12 text-center">
                <blockquote className="text-xl font-medium leading-relaxed">
                  &ldquo;{study.testimonial.quote}&rdquo;
                </blockquote>
                <p className="mt-4 font-semibold text-accent">
                  {study.testimonial.author}
                </p>
              </Card>
            </div>
          </section>
        )}

        {/* Call To Action Section */}
        <section
          id="contact"
          className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Want results like this?
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Tell us what you're building. We'll show you the fastest path
                there.
              </p>
              <div className="mt-10">
                <SmartCtaButton
                  phoneNumber="+919889988408"
                  email="contact@kinstel.com"
                  size="lg"
                  className="shadow-lg shadow-accent/20">
                  Get a Free Consultation
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
