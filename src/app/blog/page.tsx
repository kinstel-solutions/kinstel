import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Straight-talking articles on web design, development, and marketing from Kinstel Solutions — pricing, platform choices, and what actually drives results.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                Blog
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                Straight talk on web design, development & marketing.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                No hype, no invented stats — just honest breakdowns to help
                you make better decisions for your business.
              </p>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block h-full">
                  <Card
                    className="group flex h-full flex-col p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-xl animate-in fade-in slide-in-from-bottom-5"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "backwards",
                    }}>
                    <CardContent className="flex flex-1 flex-col p-0">
                      <p className="mb-2 text-sm font-semibold text-accent">
                        {formatDate(post.date)}
                      </p>
                      <h2 className="mb-3 text-2xl font-headline font-semibold">
                        {post.title}
                      </h2>
                      <p className="flex-1 text-muted-foreground">
                        {post.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-accent/30 bg-accent/5 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="mt-6 inline-flex items-center text-sm font-semibold text-accent">
                        Read →
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
