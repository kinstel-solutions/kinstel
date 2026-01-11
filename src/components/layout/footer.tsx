import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import { ClickToCallLink } from "../ui/click-to-call-link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="mb-4 flex items-center gap-2"
              aria-label="Kinstel Home">
              <span className="text-2xl font-bold font-headline text-foreground">
                <span className="text-accent">K</span>instel
              </span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground mt-2">
              Kinstel builds professional, fast, and credible websites for
              Modern Businesses.
            </p>
            <address className="mt-4 text-sm  text-primary text-muted-foreground not-italic space-y-2">
              <a
                href="mailto:contact@kinstel.com"
                className="inline-block hover:text-accent">
                contact@kinstel.com
              </a>
              <br />
              <ClickToCallLink
                phoneNumber="+919889988408"
                className="hover:text-accent">
                +91 98899 88408
              </ClickToCallLink>
            </address>
            <div className="mt-8 flex flex-col items-start gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Recognized By
              </span>
              <Link 
                href="https://www.designrush.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-accent p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 inline-block"
              >
                <Image 
                  src="/designrush-badge.png" 
                  alt="DesignRush" 
                  width={120} 
                  height={160}
                  className="w-[100px] h-auto object-contain" 
                />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:justify-end lg:gap-16">
            <div className="grid gap-2">
              <h3 className="font-semibold">Navigation</h3>
              <Link
                href="/#services"
                className="block py-2 sm:py-0 text-muted-foreground hover:text-foreground">
                Services
              </Link>
              <Link
                href="/#portfolio"
                className="block py-2 sm:py-0 text-muted-foreground hover:text-foreground">
                Portfolio
              </Link>
              <Link
                href="/contact"
                className="block py-2 sm:py-0 text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link
                href="/pay"
                className="block py-2 sm:py-0 text-muted-foreground hover:text-foreground">
                Quick Pay
              </Link>
              <Link
                href="/law-firm-marketing"
                className="block py-2 sm:py-0 text-muted-foreground hover:text-foreground">
                For Lawyers
              </Link>
              <Link
                href="/web-design-company-lucknow"
                className="block py-2 sm:py-0 text-muted-foreground hover:text-foreground">
                Lucknow
              </Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Legal</h3>
              <Link
                href="/privacy-policy"
                className="block py-2 sm:py-0 text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="block py-2 sm:py-0 text-muted-foreground hover:text-foreground">
                Terms & Conditions
              </Link>
              <Link
                href="/refund-policy"
                className="block py-2 sm:py-0 text-muted-foreground hover:text-foreground">
                Refund Policy
              </Link>
              <Link
                href="/shipping"
                className="block py-2 sm:py-0 text-muted-foreground hover:text-foreground">
                Shipping Policy
              </Link>
              <Link
                href="/credentials"
                className="block py-2 sm:py-0 text-muted-foreground hover:text-foreground">
                Credentials
              </Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Connect</h3>
              <div className="flex items-center space-x-4">
                <a
                  href="https://x.com/Hi4mKinstel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/company/kinstel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2 text-xs opacity-70">Udyam: UDYAM-UP-50-0230220 • IEC: HLCPS8014Q</p>
          <p>&copy; {currentYear} Kinstel Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
