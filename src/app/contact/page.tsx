import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Mail, Phone, MapPin, Navigation, Star } from "lucide-react";
import { ClickToCallLink } from "@/components/ui/click-to-call-link";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessJsonLd } from "@/lib/schema";

const InquiryForm = dynamic(() => import("@/components/sections/inquiry-form").then(mod => mod.InquiryForm), {
  ssr: true,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-card/50 border border-border/50 rounded-xl" />
});

export const metadata: Metadata = {
  title: "Contact Us — Kinstel Solutions",
  description: "Get in touch with Kinstel Solutions for web engineering, custom SaaS platforms, SEO, and Google Ads management. Registered office in Gomti Nagar, Lucknow.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={localBusinessJsonLd} />
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Contact Us
          </h1>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            Have a project in mind or need assistance? Reach out directly to our dedicated teams below.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
            <span>⚡ Support Response SLA:</span>
            <span className="text-foreground">Average 2–4 Business Hours (Guaranteed &lt;24h)</span>
          </div>
        </div>

        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <InquiryForm
            title="Send Us a Message"
            subtitle="Have a project in mind or need assistance? Fill in your details below."
            ctaText="Send Message"
          />

          <div className="space-y-8 text-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div className="space-y-4">
                {/* Primary Email */}
                <div>
                  <h2 className="font-semibold text-foreground text-lg">Primary Email</h2>
                  <a
                    href="mailto:contact@kinstel.com"
                    className="text-accent hover:underline font-medium text-lg block">
                    contact@kinstel.com
                  </a>
                </div>

                {/* Department Contacts Group */}
                <div className="pt-2 border-t border-border/40">
                  <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground mb-2">Department Directory</p>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Sales & Proposals:</span>{" "}
                      <a href="mailto:sales@kinstel.com" className="hover:text-accent font-mono text-xs">sales@kinstel.com</a>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Billing & Wire Remittances:</span>{" "}
                      <a href="mailto:payments@kinstel.com" className="hover:text-accent font-mono text-xs">payments@kinstel.com</a>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Technical & Project Support:</span>{" "}
                      <a href="mailto:support@kinstel.com" className="hover:text-accent font-mono text-xs">support@kinstel.com</a>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Legal & Privacy:</span>{" "}
                      <a href="mailto:legal@kinstel.com" className="hover:text-accent font-mono text-xs">legal@kinstel.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold">Phone</h2>
                <ClickToCallLink
                  phoneNumber="+919889988408"
                  className="text-muted-foreground hover:text-accent">
                  +91 98899 88408
                </ClickToCallLink>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold">Registered Office</h2>
                <p className="text-muted-foreground text-base">
                  H. No. 33, Shivlok Colony, Vigyan Khand, Gomti Nagar, Nijampur Malhaur, Lucknow, Uttar Pradesh 226010, India.
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Kinstel+Solutions,+H.+No.+33,+Shivlok+Colony,+Vigyan+Khand,+Gomti+Nagar,+Lucknow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-xs font-semibold text-accent hover:bg-accent hover:text-accent-foreground transition-all">
                    <Navigation className="w-3.5 h-3.5" />
                    Get Directions
                  </a>
                  <a
                    href="https://share.google/r0DGTJyecJmBUBaWC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-500 hover:bg-amber-500 hover:text-white transition-all">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Review Us on Google (5.0 ★)
                  </a>
                  <a
                    href="https://jsdl.in/DT-3969OKJ36IF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-500 hover:bg-amber-500 hover:text-white transition-all">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Justdial Profile (5.0 ★)
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="font-semibold text-base mb-2">Legal Identity & Business Verification</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Registered Entity: Kinstel Solutions</p>
                <p className="font-mono text-xs">UDYAM: UDYAM-UP-50-0230220</p>
                <p className="font-mono text-xs">IEC: HLCPS8014Q</p>
                <p className="font-mono text-xs">D-U-N-S®: 77-197-4415</p>
                <p className="text-xs text-accent/80 font-medium pt-2">
                  🔒 International Payments & Wire Remittances Processed Securely via Razorpay & PayPal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Google Map Section */}
        <div className="mt-16 mb-20 max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border/60 shadow-xl h-[360px]">
          <iframe
            title="Kinstel Solutions Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14238.250123932039!2d81.04234215!3d26.8538632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x63e0a7fe2fa957fb%3A0x9b36a04bf7a307ec!2sKinstel%20Solutions!5e0!3m2!1sen!2sin!4v1785763367462!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
