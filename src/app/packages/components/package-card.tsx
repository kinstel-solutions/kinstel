"use client";

import {
  LiquidCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/liquid-glass-card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  name: string;
  priceText: string;
  description: string;
  features: string[];
  ctaText: string;
  tokenAmount?: number;
  highlight?: boolean;
  onSelect?: () => void;
}

export function PackageCard({
  name,
  priceText,
  description,
  features,
  ctaText,
  tokenAmount,
  highlight = false,
  onSelect,
}: PackageCardProps) {
  return (
    <LiquidCard
      className={cn(
        "h-full flex flex-col transition-all duration-300 hover:scale-[1.02]",
        highlight
          ? "border-accent/50 shadow-lg shadow-accent/5"
          : "border-border/30",
      )}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          {highlight && (
            <span className="bg-accent/10 text-accent text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-accent/20">
              Popular
            </span>
          )}
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold text-foreground">
            {priceText}
          </span>
        </div>
        <CardDescription className="mt-2 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow pt-4">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start text-sm text-balance">
              <Check className="h-4 w-4 text-accent mr-3 mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-6">
        <Button
          className="w-full"
          variant={"default"}
          onClick={onSelect}>
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </LiquidCard>
  );
}
