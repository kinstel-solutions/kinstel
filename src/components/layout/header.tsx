"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { KLogo } from "@/components/ui/k-logo";
import { SmartCtaButton } from "../ui/smart-cta-button";

const navLinks = [
  { href: "/lucknow", label: "Lucknow" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const DesktopNav = (
    <nav className="hidden md:flex items-center space-x-1">
      <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground transition-colors mr-2">
        <a href="tel:+919889988408">
          <Phone className="h-4 w-4 text-accent animate-pulse" />
          <span className="border-b border-accent/50">+91 98899 88408</span>
        </a>
      </Button>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80">
          {link.label}
          <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </Link>
      ))}
      <SmartCtaButton
        phoneNumber="+919889988408"
        email="contact@kinstel.com"
        className="ml-2 bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm">
        Inquire Now
      </SmartCtaButton>
    </nav>
  );

  const MobileNav = (
    <nav className="flex flex-col space-y-4 pt-8 gap-0">
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          className="w-full justify-start text-lg h-auto py-3">
          <Link
            href={link.href}
            onClick={() => setIsSheetOpen(false)}>
            {link.label}
          </Link>
        </Button>
      ))}
      <SmartCtaButton
        phoneNumber="+919889988408"
        email="contact@kinstel.com"
        className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm"
        onClick={() => setIsSheetOpen(false)}>
        Inquire Now
      </SmartCtaButton>
    </nav>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border/40 bg-background/95 backdrop-blur-sm"
          : "bg-transparent",
      )}>
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-3 md:px-6">
        <KLogo />

        {/* Desktop Navigation */}
        {DesktopNav}

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild className="h-9 px-1.5 gap-1.5 text-muted-foreground hover:text-foreground">
            <a href="tel:+919889988408">
              <Phone className="h-4 w-4 text-accent" />
              <span className="border-b border-accent/50 text-xs sm:text-sm">+91 98899 88408</span>
            </a>
          </Button>
          <Sheet
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="pt-16 w-full">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              {MobileNav}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
