import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import { ClickToCallLink } from "../ui/click-to-call-link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
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
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:justify-end lg:gap-16">
            <div className="grid gap-2">
              <h3 className="font-semibold">Navigation</h3>
              <Link
                href="/#services"
                className="text-muted-foreground hover:text-foreground">
                Services
              </Link>
              <Link
                href="/#portfolio"
                className="text-muted-foreground hover:text-foreground">
                Portfolio
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Legal</h3>
              <Link
                href="/privacy-policy"
                className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-muted-foreground hover:text-foreground">
                Terms & Conditions
              </Link>
              <Link
                href="/refund-policy"
                className="text-muted-foreground hover:text-foreground">
                Refund Policy
              </Link>
              <Link
                href="/shipping"
                className="text-muted-foreground hover:text-foreground">
                Shipping Policy
              </Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Connect</h3>
              <div className="flex items-center space-x-4">
                <a
                  href="https://x.com/kinstels"
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
          <p>&copy; {currentYear} Kinstel Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
