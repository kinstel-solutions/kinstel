import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Wrench, Sparkles, Newspaper, Mail } from "lucide-react";

const helpfulLinks = [
  { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
  { href: "/services", label: "Services", icon: <Sparkles className="h-4 w-4" /> },
  { href: "/tools", label: "Free Tools", icon: <Wrench className="h-4 w-4" /> },
  { href: "/blog", label: "Blog", icon: <Newspaper className="h-4 w-4" /> },
  { href: "/contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow flex items-center">
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-semibold uppercase tracking-wider text-accent">
                404
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-headline">
                404 — Page Not Found
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                The page you're looking for moved or never existed. Let's get
                you back on track.
              </p>

              <div className="mt-10">
                <Button asChild size="lg" className="shadow-lg shadow-accent/20">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>

              <div className="mt-16">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Or explore
                </p>
                <ul className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {helpfulLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 rounded-md border border-border/50 bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent">
                        {link.icon}
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
