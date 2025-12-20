import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InquiryForm } from "./inquiry-form";
import { ArrowUpRight } from "lucide-react";
import { DynamicIslandDemo } from "@/components/ui/d-island";

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export function HeroSection({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div className="max-w-xl animate-in fade-in slide-in-from-left-12 duration-500 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 justify-center">
            <DynamicIslandDemo />
          </div>
        </div>
        <div className="flex items-center justify-center animate-in fade-in slide-in-from-right-12 duration-500">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <HeroSection
      title={
        <>
          Expert <span className="text-accent">Web Design</span> for Modern
          Businesses
        </>
      }
      subtitle="We are a web design agency that helps businesses grow online. We build beautiful, high-performing websites that are designed to convert."
      primaryButtonText="Get a Free Quote"
      primaryButtonLink="/contact"
      secondaryButtonText="View Our Work"
      secondaryButtonLink="#portfolio"
    />
  );
}
