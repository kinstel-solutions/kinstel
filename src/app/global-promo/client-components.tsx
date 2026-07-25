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
        <PromoEmailCta />
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   MothersDayPromo — Countdown timer + CTA for Mother's Day
   ═══════════════════════════════════════════════════════════ */

export function MothersDayPromo() {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    // Dynamic rolling 3-day countdown
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59).getTime();

    const timer = setInterval(() => {
      const current = new Date().getTime();
      const difference = targetDate - current;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToBottomForm = () => {
    const form = document.getElementById("inquiry-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = form.querySelector('input[name="name"]') as HTMLInputElement;
        if (input) input.focus({ preventScroll: true });
      }, 800);
    }
  };

  return (
    <div className="mt-8 p-4 rounded-2xl border border-accent/20 bg-accent/5 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm font-bold text-accent uppercase tracking-widest mb-1">
            ⚡ Special Studio Growth Offer
          </p>
          <div className="flex gap-3">
            {[
              { label: "D", val: timeLeft.days },
              { label: "H", val: timeLeft.hours },
              { label: "M", val: timeLeft.minutes },
              { label: "S", val: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-xl font-bold text-foreground tabular-nums">
                  {unit.val.toString().padStart(2, "0")}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center md:text-left flex-grow">
          <p className="text-sm text-foreground font-medium">
            Get an extra <span className="text-pink-500 font-bold text-base">20% OFF</span> for all new clients!
          </p>
        </div>

        <Button 
          onClick={scrollToBottomForm}
          variant="secondary" 
          className="bg-pink-500 hover:bg-pink-600 text-white border-none shadow-lg shadow-pink-500/20"
        >
          Claim Offer NOW!
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
