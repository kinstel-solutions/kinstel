import Link from "next/link";
import { MapPin, Globe, Building2, Twitter } from "lucide-react";
import { ClickToCallLink } from "../ui/click-to-call-link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/40 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand & Contact Information Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-2"
                aria-label="Kinstel Home">
                <span className="text-2xl font-bold font-headline text-foreground tracking-tight">
                  <span className="text-accent">K</span>instel
                </span>
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground mt-2">
                Kinstel builds high-performance, fast, and conversion-engineered websites & platforms for modern businesses.
              </p>
              <address className="mt-4 text-sm text-muted-foreground not-italic space-y-2">
                <div>
                  <a
                    href="mailto:contact@kinstel.com"
                    className="hover:text-foreground transition-colors">
                    contact@kinstel.com
                  </a>
                </div>
                <div>
                  <ClickToCallLink
                    phoneNumber="+919889988408"
                    className="hover:text-foreground transition-colors">
                    +91 98899 88408
                  </ClickToCallLink>
                </div>
              </address>
            </div>

            <div className="mt-8 flex flex-col items-start gap-2.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Recognized By
              </span>
              <div className="flex items-center gap-4">
                <Link 
                  href="https://www.designrush.com/agency/profile/kinstel-solutions" 
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
                <a 
                  href="//www.dmca.com/Protection/Status.aspx?ID=ac032bda-1f65-4094-8b6e-d802f9a9ab66" 
                  title="DMCA.com Protection Status" 
                  className="dmca-badge inline-block opacity-90 hover:opacity-100 transition-opacity duration-300"
                  suppressHydrationWarning
                >
                  <img 
                    src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-08.png?ID=ac032bda-1f65-4094-8b6e-d802f9a9ab66" 
                    alt="DMCA.com Protection Status" 
                    className="h-7 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Evenly Balanced Navigation Links Grid (8 Cols) */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {/* Column 1: Company */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground tracking-wide">Company</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link href="/packages" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing & Packages
                  </Link>
                </li>
                <li>
                  <Link href="/global-promo" className="text-muted-foreground hover:text-foreground transition-colors">
                    Global Presence
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog & Articles
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Services */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground tracking-wide">Services</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                    Web Design & Dev
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                    SEO & Marketing
                  </Link>
                </li>
                <li>
                  <Link href="/platforms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Custom Platforms
                  </Link>
                </li>
                <li>
                  <Link href="/website-audit" className="text-muted-foreground hover:text-foreground transition-colors">
                    Free Website Audit
                  </Link>
                </li>
                <li>
                  <Link href="/quote" className="text-muted-foreground hover:text-foreground transition-colors">
                    Get a Quote
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources & Tools */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground tracking-wide">Resources</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
                    Free Web Tools
                  </Link>
                </li>
                <li>
                  <Link href="/industries" className="text-muted-foreground hover:text-foreground transition-colors">
                    Industries Served
                  </Link>
                </li>
                <li>
                  <Link href="/compare" className="text-muted-foreground hover:text-foreground transition-colors">
                    Compare Options
                  </Link>
                </li>
                <li>
                  <Link href="/pay" className="text-muted-foreground hover:text-foreground transition-colors">
                    Quick Pay
                  </Link>
                </li>
                <li>
                  <Link href="/web-design-company-lucknow" className="text-muted-foreground hover:text-foreground transition-colors">
                    Lucknow Agency
                  </Link>
                </li>
                <li>
                  <Link href="/feed.xml" className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors" aria-label="RSS Feed">
                    RSS Feed
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal & Verified Profiles */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground tracking-wide">Legal</h3>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-and-conditions" className="text-muted-foreground hover:text-foreground transition-colors">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/refund-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/credentials" className="text-muted-foreground hover:text-foreground transition-colors">
                      Credentials
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Verified Profiles Row (Subtle Icon Group) */}
              <div className="pt-2 border-t border-border/40">
                <span className="text-[11px] font-semibold text-muted-foreground/80 uppercase tracking-wider block mb-1.5">
                  Verified On
                </span>
                <div className="flex items-center space-x-1.5 text-muted-foreground">
                  <a
                    href="https://maps.google.com/?cid=11184302972758853612"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Google Business Profile"
                    title="Google Business Profile">
                    <MapPin className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://x.com/kinstelhq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="X (Twitter) Profile"
                    title="X (@kinstelhq)">
                    <Twitter className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://www.designrush.com/agency/profile/kinstel-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="DesignRush Profile"
                    title="DesignRush Profile">
                    <Globe className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://jsdl.in/DT-3969OKJ36IF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Justdial Listing"
                    title="Justdial Listing">
                    <Building2 className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-muted-foreground/80">
            <span className="rounded-md border border-border/60 bg-muted/30 px-2.5 py-1">UDYAM: UDYAM-UP-50-0230220</span>
            <span className="rounded-md border border-border/60 bg-muted/30 px-2.5 py-1">IEC: HLCPS8014Q</span>
            <span className="rounded-md border border-border/60 bg-muted/30 px-2.5 py-1">D-U-N-S®: 77-197-4415</span>
          </div>
          <p>Copyright &copy; {currentYear} Kinstel Solutions. All rights reserved.</p>
        </div>
      </div>
      <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
    </footer>
  );
}
