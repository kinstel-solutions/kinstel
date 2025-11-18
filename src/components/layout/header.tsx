'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { SmartCtaButton } from '../ui/smart-cta-button';

const navLinks = [
  { href: '/lawyers', label: 'For Lawyers' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navContent = (
    <nav className={cn('flex items-center gap-1', isMobile ? 'flex-col space-y-4 pt-8' : 'space-x-4')}>
      {navLinks.map((link) => (
        <Button key={link.href} variant="ghost" asChild>
          <Link
            href={link.href}
            className="text-sm font-medium transition-colors"
          >
            {link.label}
          </Link>
        </Button>
      ))}
       <SmartCtaButton 
          phoneNumber="+919889988408" 
          email="contact@kinstel.com"
          className={cn(isMobile && 'w-full', 'ml-4')}
        >
          Inquire Now
        </SmartCtaButton>
    </nav>
  );

  if (!isClient) {
    // Render a placeholder header on the server to avoid layout shift
    return (
      <header className="sticky top-0 z-50 w-full bg-transparent">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
           <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold font-headline text-foreground">
              <span className=" text-accent">K</span>instel
            </span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300', 
        isScrolled ? 'border-b border-border/40 bg-background/95 backdrop-blur-sm' : 'bg-transparent'
      )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold font-headline text-foreground">
            <span className="text-accent">K</span>instel
          </span>
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-16 w-full">
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
