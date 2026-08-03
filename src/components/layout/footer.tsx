import Link from "next/link";
import Script from "next/script";
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
              <address className="mt-4 text-sm text-muted-foreground not-italic space-y-1.5">
                <div>
                  <a
                    href="mailto:contact@kinstel.com"
                    className="hover:text-foreground transition-colors">
                    contact@kinstel.com
                  </a>
                </div>
                <div className="text-xs space-y-1 text-muted-foreground/80 pt-1">
                  <p>Sales: <a href="mailto:sales@kinstel.com" className="hover:text-foreground transition-colors font-mono">sales@kinstel.com</a></p>
                  <p>Billing & Remittances: <a href="mailto:payments@kinstel.com" className="hover:text-foreground transition-colors font-mono">payments@kinstel.com</a></p>
                  <p>Support: <a href="mailto:support@kinstel.com" className="hover:text-foreground transition-colors font-mono">support@kinstel.com</a></p>
                </div>
                <div className="pt-1">
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
                    src="/designrush-badge.webp" 
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
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers <span className="text-[10px] bg-accent/20 text-accent font-semibold px-1.5 py-0.5 rounded-full ml-1">Hiring</span>
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

              {/* Verified Profiles Row (Responsive Brand Badge Grid) */}
              <div className="pt-3 border-t border-border/40">
                <span className="text-[11px] font-semibold text-muted-foreground/80 uppercase tracking-wider block mb-2">
                  Verified On
                </span>
                <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
                  {/* Google Business Profile */}
                  <a
                    href="https://share.google/r0DGTJyecJmBUBaWC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105 text-xs font-semibold text-foreground"
                    aria-label="Google Business Profile (5.0 Stars)"
                    title="Google Business Profile (5.0 ★)">
                    <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                    </svg>
                    <span>Google 5.0 ★</span>
                  </a>

                  {/* Justdial Profile */}
                  <a
                    href="https://jsdl.in/DT-3969OKJ36IF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105 text-xs font-semibold text-foreground"
                    aria-label="Justdial Profile (5.0 Stars)"
                    title="Justdial Profile (5.0 ★)">
                    <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <span>Justdial 5.0 ★</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/kinstel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105"
                    aria-label="LinkedIn Company Profile"
                    title="LinkedIn">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://x.com/kinstelhq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105"
                    aria-label="X (Twitter) Profile"
                    title="X (@kinstelhq)">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/kinstel.hq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105"
                    aria-label="Instagram Profile"
                    title="Instagram (@kinstel.hq)">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/kinstelhq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105"
                    aria-label="Facebook Page"
                    title="Facebook">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.615V8z"/>
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/919889988408"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105"
                    aria-label="WhatsApp Direct"
                    title="WhatsApp Direct">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                    </svg>
                  </a>

                  {/* GoodFirms */}
                  <a
                    href="https://www.goodfirms.co/company/kinstel-solutions-official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105 text-[11px] font-bold px-2"
                    aria-label="GoodFirms Verified Profile"
                    title="GoodFirms Verified">
                    <svg className="w-3 h-3 fill-current text-blue-500" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8z"/>
                    </svg>
                    GoodFirms
                  </a>

                  {/* TechBehemoths */}
                  <a
                    href="https://techbehemoths.com/company/kinstel-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105 text-[11px] font-bold px-2"
                    aria-label="TechBehemoths Verified Profile"
                    title="TechBehemoths Verified">
                    <svg className="w-3 h-3 fill-current text-purple-400" viewBox="0 0 24 24">
                      <path d="M4 3h16v4H4V3zm0 7h16v4H4v-4zm0 7h16v4H4v-4z"/>
                    </svg>
                    TechBehemoths
                  </a>

                  {/* DesignRush */}
                  <a
                    href="https://www.designrush.com/agency/profile/kinstel-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105 text-[11px] font-bold px-2"
                    aria-label="DesignRush Agency Profile"
                    title="DesignRush Agency">
                    <svg className="w-3 h-3 fill-current text-emerald-400" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                    DesignRush
                  </a>

                  {/* Clutch */}
                  <a
                    href="https://clutch.co/profile/kinstel-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105 text-[11px] font-bold px-2"
                    aria-label="Clutch Profile"
                    title="Clutch Verified Agency">
                    <svg className="w-3 h-3 fill-current text-rose-500" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm-1 14.5a4.5 4.5 0 1 1 4.5-4.5h-2a2.5 2.5 0 1 0-2.5 2.5v2z"/>
                    </svg>
                    Clutch
                  </a>

                  {/* Justdial */}
                  <a
                    href="https://jsdl.in/DT-3969OKJ36IF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105 text-[11px] font-bold px-2"
                    aria-label="Justdial Listing (5.0 Stars)"
                    title="Justdial Verified (5.0 ★)">
                    <svg className="w-3 h-3 fill-current text-amber-400" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
                    </svg>
                    Justdial
                  </a>

                  {/* Bing Places */}
                  <a
                    href="https://www.bing.com/maps/search?mkt=en-IN&ss=id.ypid%3AYNE59A5E76D46BB06B&cp=26.854063%7E81.043716&lvl=16&style=r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center p-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted hover:text-foreground transition-all hover:scale-105"
                    aria-label="Bing Places for Business"
                    title="Bing Places">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M5 3v18l5-2.8V12l6 3.5 3-1.7L9.5 7.5 5 3z"/>
                    </svg>
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
          <p className="text-xs text-accent/90 mb-2 font-medium">
            🔒 Secure International Payments, PayPal & Bank Wire Remittances Processed via Razorpay
          </p>
          <p>Copyright &copy; {currentYear} Kinstel Solutions. All rights reserved.</p>
        </div>
      </div>
      <Script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" strategy="lazyOnload" />
    </footer>
  );
}
