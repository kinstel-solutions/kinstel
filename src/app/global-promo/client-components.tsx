"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { event } from "@/lib/gtag";

/* ═══════════════════════════════════════════════════════════
   PromoHeader — Minimal header with logo only (zero nav)
   ═══════════════════════════════════════════════════════════ */

export function PromoHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border/40 bg-background/95 backdrop-blur-sm"
          : "bg-transparent"
      )}>
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-3 md:px-6">
        <Image
          src="/Kinstel_logo-G Font.svg"
          alt="Kinstel Logo"
          width={400}
          height={400}
          priority
          className="object-contain w-[100px] md:w-[120px] h-auto"
        />
        {/* Desktop-only: subtle email CTA */}
        <div className="hidden md:block">
          <PromoEmailCta />
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   StickyMobileCTA — Fixed bottom bar on mobile
   Appears after user scrolls past the hero section.
   ═══════════════════════════════════════════════════════════ */

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show the sticky CTA when hero is NOT visible (scrolled past it)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    // Observe the hero inquiry form (top of page)
    const heroForm = document.getElementById("promo-hero-form");
    if (heroForm) observer.observe(heroForm);

    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById("promo-hero-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = form.querySelector(
          'input[name="name"]'
        ) as HTMLInputElement;
        if (input) input.focus({ preventScroll: true });
      }, 600);
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      )}>
      <div className="bg-background/95 backdrop-blur-md border-t border-border/50 px-4 py-3 shadow-lg shadow-black/20">
        <Button
          onClick={scrollToForm}
          className="w-full h-12 text-base font-semibold shadow-lg shadow-accent/25"
          size="lg">
          Get A Free Audit
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PromoEmailCta — Separate email CTA with PMax tracking
   ═══════════════════════════════════════════════════════════ */

export function PromoEmailCta({ className }: { className?: string }) {
  const email = "contact@kinstel.com";
  const subject = "Free Website Audit Request";
  const body =
    "Hi Kinstel Team,\n\nI'd like to request a free website audit and strategy session.\n\nThanks!";
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleClick = () => {
    event({
      action: "pmax_email_click",
      category: "cta",
      label: "promo_email_cta",
    });
  };

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={cn(
        "border-accent/30 text-accent hover:bg-accent/10",
        className
      )}>
      <a href={href} onClick={handleClick}>
        Write to us
        <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>
    </Button>
  );
}
