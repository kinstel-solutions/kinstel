import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DynamicIslandDemo } from "@/components/ui/d-island";
import { Particles } from "@/components/ui/particles";
import { AuroraText } from "../ui/aurora-text";
import LogoCarousel from "../ui/logo-carousel";

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
    <section className="relative overflow-hidden bg-background py-20 md:py-32 min-h-screen flex items-center justify-center">
      <Particles
        className="absolute inset-0 animate-fade-in"
        quantity={140}
        staticity={30}
        ease={50}
        size={1.0}
        color="#F59E0B"
        refresh
      />
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center text-center px-4 md:px-6">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-12 duration-500">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 justify-center">
            <DynamicIslandDemo />
          </div>
          <div className="mt-16 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              Powering modern digital experiences with
            </p>
            <div className="overflow-hidden w-full flex justify-center">
              <LogoCarousel />
            </div>
          </div>
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
          Expert{" "}
          <AuroraText colors={["#F59E0B", "#D97706", "#FCD34D", "#F59E0B"]}>
            Web Design
          </AuroraText>{" "}
          for Modern Businesses
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
