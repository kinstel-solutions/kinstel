"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import Image from "next/image";
import { TimeBasedSmartCtaButton } from "../ui/time-based-smart-cta-button";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export function GlobalHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Helper to determine if we should use a local hash or a full path
  // Since this is specifically for the global landing page, we just return the hash.
  const getSmartHref = (href: string) => {
    return href;
  };

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
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={getSmartHref(link.href)}
          className="group relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80">
          {link.label}
          <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </Link>
      ))}
      <TimeBasedSmartCtaButton
        phoneNumber="+919889988408"
        whatsappNumber="919889988408"
        className="ml-2 bg-accent text-accent-foreground hover:bg-accent shadow-sm">
        <Phone className="h-4 w-4 text-white animate-pulse" />
        9889988408
      </TimeBasedSmartCtaButton>
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
            href={getSmartHref(link.href)}
            onClick={() => setIsSheetOpen(false)}>
            {link.label}
          </Link>
        </Button>
      ))}
      <TimeBasedSmartCtaButton
        phoneNumber="+919889988408"
        whatsappNumber="919889988408"
        className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent shadow-sm"
        onClick={() => setIsSheetOpen(false)}>
        Inquire Now
      </TimeBasedSmartCtaButton>
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
        <div className="flex items-center gap-0">
          <Image
            src="/Kinstel_logo-G Font.svg"
            alt="Kinstel Logo"
            width={400}
            height={400}
            priority
            className="object-contain w-[100px]  md:w-[120px] h-auto"
          />
        </div>

        {/* Desktop Navigation */}
        {DesktopNav}

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden flex items-center gap-1">
          <TimeBasedSmartCtaButton
            size="sm"
            arrow={false}
            phoneNumber="+919889988408"
            whatsappNumber="919889988408"
            className="ml-2 bg-accent text-accent-foreground hover:bg-accent shadow-sm">
            <Phone className="h-4 w-4 text-white animate-pulse" />
            9889988408
          </TimeBasedSmartCtaButton>
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
