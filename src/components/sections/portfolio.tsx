import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const portfolioItems = [
  {
    image: "/advratnasingh.png",
    imageHint: "screenshot advocate ratna singh website",
    title: "Advocate Ratna Singh",
    category: "Independent Advocate",
    metrics: ["Modern Design", "Client-Focused"],
    link: "https://advratnasingh.vercel.app/",
  },
  {
    image: "/ababneh-law.png",
    imageHint: "screenshot ababneh and associates law firm website",
    title: "Ababneh & Associates",
    category: "International Law Firm",
    metrics: ["Multilingual", "Corporate Branding"],
    link: "https://ababneh-law.vercel.app/",
  },
  {
    image: "/advonex.png",
    imageHint: "screenshot advonex legal consultancy website",
    title: "Advonex",
    category: "Modern Legal Consultancy",
    metrics: ["Sleek UI", "Fast Load Times"],
    link: "https://advonex.vercel.app/",
  },
  // {
  //   image: "/showcase-1.png",
  //   imageHint: "screenshot of a modern website dashboard",
  //   title: "SaaS Platform",
  //   category: "Web Application",
  //   metrics: ["UI/UX Design", "Next.js", "Scalability"],
  //   link: "#",
  // },
  // {
  //   image: "/showcase-2.png",
  //   imageHint: "screenshot of a creative agency website",
  //   title: "Creative Agency",
  //   category: "Branding & Identity",
  //   metrics: ["Visual Design", "Webflow", "Animations"],
  //   link: "#",
  // },
  // {
  //   image: "/showcase-3.png",
  //   imageHint: "screenshot of an e-commerce website for a fashion brand",
  //   title: "E-commerce Store",
  //   category: "Online Retail",
  //   metrics: ["Shopify", "Conversion Rate", "Mobile-First"],
  //   link: "#",
  // },
];

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="bg-background py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-wider text-accent">
            Our Work
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Websites That <span className="text-accent">Drive Growth</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We create beautiful, high-performing websites that deliver
            measurable results for our clients. Explore some of our recent
            projects.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full">
              <Card
                className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl animate-in fade-in slide-in-from-bottom-5 h-full"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "backwards",
                }}
                data-testid={`portfolio-item-${index}`}>
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`Showcase of the ${item.title} project`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={item.imageHint}
                  />
                </div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-sm font-semibold text-accent">
                    {item.category}
                  </p>
                  <h3 className="mb-4 text-2xl font-headline font-semibold">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm mt-auto">
                    {item.metrics.map((metric, metricIndex) => (
                      <Badge
                        key={metricIndex}
                        variant="secondary">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <span className="flex items-center text-sm font-semibold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Project <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
