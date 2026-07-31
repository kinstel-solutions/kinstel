"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";

interface PortfolioItem {
  image: string;
  imageHint: string;
  title: string;
  category: string;
  metrics: string[];
  link: string;
}

export function PortfolioGridSequential({ items }: { items: PortfolioItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4000); // 4 seconds per card
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full">
          <BorderBeam
            active={index === activeIndex}
            duration={4}
            size={2}
            className="h-full"
            radius="var(--radius)">
            <Card
              className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl h-full border-0 bg-card/50"
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
                <p className="mb-2 text-sm font-semibold text-white/80">
                  {item.category}
                </p>
                <h3 className="mb-4 text-2xl font-headline font-semibold">
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-2 text-sm mt-auto">
                  {item.metrics.map((metric, metricIndex) => (
                    <Badge
                      key={metricIndex}
                      variant="outline">
                      {metric}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <span className="flex items-center text-sm font-semibold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View Project <ArrowUpRight className="ml-2 h-5 w-5" />
                </span>
              </CardFooter>
            </Card>
          </BorderBeam>
        </Link>
      ))}
    </div>
  );
}

interface StatItem {
    icon: React.ReactNode;
    value: string;
    label: string;
    description: string;
}

export function StatsGridSequential({ items }: { items: StatItem[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 3000); // 3 seconds per card
        return () => clearInterval(interval);
    }, [items.length]);

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {items.map((stat, index) => (
                <BorderBeam
                    key={index}
                    active={index === activeIndex}
                    duration={3}
                    size={2}
                    className="h-full"
                    radius="var(--radius)">
                    <Card
                        className="text-center transition-all duration-300 hover:shadow-lg border-0 bg-card/50 h-full flex flex-col justify-between"
                        data-testid={`stat-item-${index}`}>
                        <CardContent className="pt-6">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                                {stat.icon}
                            </div>
                            <div className="text-4xl font-bold font-headline text-accent">
                                {stat.value}
                            </div>
                            <div className="mt-2 text-xl font-semibold">
                                {stat.label}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                </BorderBeam>
            ))}
        </div>
    );
}
