import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Mail, Phone } from "lucide-react";
import { ClickToCallLink } from "@/components/ui/click-to-call-link";

const InquiryForm = dynamic(() => import("@/components/sections/inquiry-form").then(mod => mod.InquiryForm), {
  ssr: true,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-card/50 border border-border/50 rounded-xl" />
});

export const metadata: Metadata = {
  title: "Kinstel Solutions | Contact Us",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-2">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">
            Contact Us
          </h1>
        </div>

        <div className="mt-8 mb-32 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <InquiryForm />

          <div className="space-y-8 text-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold">Email</h2>
                <a
                  href="mailto:contact@kinstel.com"
                  className="text-muted-foreground hover:text-accent">
                  contact@kinstel.com
                </a>
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
            <div className="mt-12 text-sm text-muted-foreground border-t pt-8">
              <p>
                Kinstel Solutions is a proprietorship registered under India’s
                Ministry of MSME.
              </p>
              <p>Udyam Registration: UDYAM-UP-50-0230220</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
