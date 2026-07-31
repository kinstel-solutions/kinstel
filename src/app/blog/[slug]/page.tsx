import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { posts } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.kinstel.com/blog/${slug}`,
      siteName: "Kinstel Solutions",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@kinstelhq",
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const verifiedSameAs = [
  "https://share.google/r0DGTJyecJmBUBaWC",
  "https://www.linkedin.com/company/kinstel",
  "https://x.com/kinstelhq",
  "https://www.facebook.com/kinstelhq",
  "https://www.instagram.com/kinstel.hq",
  "https://wa.me/919889988408",
  "https://www.goodfirms.co/company/kinstel-solutions-official",
  "https://techbehemoths.com/company/kinstel-solutions",
  "https://www.designrush.com/agency/profile/kinstel-solutions",
  "https://clutch.co/profile/kinstel-solutions",
  "https://jsdl.in/DT-3969OKJ36IF",
  "https://www.bing.com/maps/search?mkt=en-IN&ss=id.ypid%3AYNE59A5E76D46BB06B&cp=26.854063%7E81.043716&lvl=16&style=r",
];

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.kinstel.com/blog/${slug}`,
    },
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Kinstel Solutions",
      url: "https://www.kinstel.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Kinstel Solutions",
      url: "https://www.kinstel.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.kinstel.com/android-chrome-512x512.png",
      },
      sameAs: verifiedSameAs,
    },
    description: post.description,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: "https://www.kinstel.com/blog",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: `https://www.kinstel.com/blog/${slug}`,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={[jsonLd, breadcrumbJsonLd]} />
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Blog
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">•</span>
                <span>{post.author}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-accent/30 bg-accent/5 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Body Section */}
        <section className="py-4 md:py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div
              className="mx-auto max-w-3xl
                [&>h2]:mt-10 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:text-foreground [&>h2]:sm:text-3xl
                [&>p]:mt-4 [&>p]:text-lg [&>p]:leading-8 [&>p]:text-muted-foreground
                [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>ul]:text-lg [&>ul]:leading-8 [&>ul]:text-muted-foreground
                [&_strong]:font-semibold [&_strong]:text-foreground
                [&_em]:italic
                [&>*:first-child]:mt-0">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.body}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
