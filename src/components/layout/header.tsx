"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SmartCtaButton } from "../ui/smart-cta-button";
import Image from "next/image";

const navLinks = [
  { href: "/lawyers", label: "For Lawyers" },
  { href: "/lucknow", label: "Lucknow" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navContent = (
    <nav
      className={cn(
        "flex items-center gap-6",
        isMobile ? "flex-col space-y-4 pt-8 gap-0" : "space-x-1",
      )}>
      {navLinks.map((link) => (
        isMobile ? (
             <Button
              key={link.href}
              variant="ghost"
              asChild
              className="w-full justify-start text-lg h-auto py-3"
             >
              <Link
                href={link.href}
                onClick={() => setIsSheetOpen(false)}>
                {link.label}
              </Link>
            </Button>
        ) : (
            <Link
                key={link.href}
                href={link.href}
                className="group relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80"
                onClick={() => setIsSheetOpen(false)}>
                {link.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
        )
      ))}
      <SmartCtaButton
        phoneNumber="+919889988408"
        email="contact@kinstel.com"
        className={cn(isMobile && "w-full mt-4", "ml-2")}
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
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2">
          <Image
            src="/Logo.svg"
            alt="Kinstel Logo"
            width={150}
            height={40}
            className="object-contain"
          />
        </Link>
        {isMobile ? (
          <Sheet
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="pt-16 w-full">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              {navContent}
            </SheetContent>
          </Sheet>
        ) : (
          navContent
        )}
      </div>
    </header>
  );
}
