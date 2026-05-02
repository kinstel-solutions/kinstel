import { KLogo } from "@/components/ui/k-logo";
import Link from "next/link";
import { type Metadata } from "next";
import { Phone } from "lucide-react";
import { ScrollToFormButton } from "@/components/ui/scroll-to-form-button";
import { TimeBasedCallButton } from "@/components/ui/time-based-call-button";

export const metadata: Metadata = {
  title: "Bespoke Next.js & React Engineering | Kinstel Solutions",
  description:
    "Engineered Elegance for the Visionary Enterprise. We build custom, ultra-premium web applications that bridge the gap between high-end design and scalable SaaS infrastructure.",
};

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Header with CTAs */}
      <header className="w-full py-3 px-4 md:px-12 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <KLogo />
        <div className="flex items-center gap-2 md:gap-3">
          <TimeBasedCallButton
            phoneNumber="+919889988408"
            whatsappNumber="919889988408"
            formId="claim-offer"
            variant="outline"
            size="sm"
            className="text-sm font-medium border-accent/30 hover:bg-accent/10 px-3 md:px-4"
          >
            <Phone className="h-4 w-4 md:mr-2 text-accent" />
            <span className="hidden md:inline">Talk to Us</span>
          </TimeBasedCallButton>
          <ScrollToFormButton
            size="sm"
            className="shadow-lg shadow-accent/20 text-sm font-semibold px-3 md:px-5"
            trackingAction="header_cta_click"
            trackingCategory="cta"
            trackingLabel="header_get_started"
          >
            <span className="hidden sm:inline">Get a Free Consultation</span>
            <span className="sm:hidden">Get Started</span>
          </ScrollToFormButton>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-8 border-t border-white/5 bg-black/50">
        <div className="container mx-auto px-6 flex flex-col items-center gap-4">
          <KLogo />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Kinstel Solutions. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <span className="text-border">|</span>
            <Link href="/terms-and-conditions" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
