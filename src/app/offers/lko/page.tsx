import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { type Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  CheckCircle,
  Zap,
  Gift,
  Phone,
  Clock,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { LiquidCard } from "@/components/ui/liquid-glass-card";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Dynamically import InquiryForm
const InquiryForm = dynamic(
  () =>
    import("@/components/sections/inquiry-form").then((mod) => mod.InquiryForm),
  {
    ssr: true,
    loading: () => (
      <div className="h-[400px] w-full animate-pulse bg-card/50 border border-border/50 rounded-xl" />
    ),
  },
);

export const metadata: Metadata = {
  title: "Complete Web Package @ ₹9999 | Best Website Designer in Lucknow",
  description:
    "Get a premium, SEO-ready website starting at just ₹9999. No upfront cost options available. Schedule a consultation with Kinstel, Lucknow's leading web design company.",
  keywords: [
    "best website designing company in lucknow",
    "web development company in lucknow",
    "website designer in lucknow",
    "website design company in lucknow",
    "best web design company in lucknow",
    "premium web design lucknow",
  ],
};

const features = [
  {
    icon: <Zap className="h-6 w-6 text-accent" />,
    title: "95+ SEO Score",
    description: "Lightning-fast websites that rank higher on Google.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-accent" />,
    title: "Premium Design",
    description: "Stunning visuals that convert visitors into customers.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-accent" />,
    title: "No Upfront Cost",
    description: "Get started today with our flexible payment options.",
  },
  {
    icon: <Clock className="h-6 w-6 text-accent" />,
    title: "Fast Delivery",
    description: "Get your business online in record time.",
  },
];

export default function OffersLkoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left space-y-8">
                <div className="space-y-4">
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm md:text-base font-medium bg-accent/10 text-accent border-accent/20">
                    🎉 Limited Time Offer: Save ₹20,000
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                    Convert Clicks into <br className="hidden lg:block" />
                    <span className="text-accent">Loyal Clients</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                    Get a <strong>Complete Web Package</strong> starting at just{" "}
                    <span className="text-foreground font-bold">₹9999</span>.
                    Partner with Lucknow's leading web designer to grow your
                    business.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <SmartCtaButton
                    phoneNumber="+919889988408"
                    email="contact@kinstel.com"
                    className="h-12 px-8 text-lg w-full sm:w-auto">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </SmartCtaButton>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-lg w-full sm:w-auto">
                    <Link href="#claim-offer">Claim Offer</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left max-w-lg mx-auto lg:mx-0 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      Zero Booking Cost
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      Pay Later Options
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">SEO Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      Free Domain (1yr)
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div
                id="claim-offer"
                className="w-full max-w-md flex-shrink-0">
                <div className="relative">
                  {/* Decorative blur behind form */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-2xl blur opacity-20"></div>

                  <InquiryForm className="relative bg-card border-accent/20 shadow-2xl" />

                  <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold shadow-lg transform rotate-12 text-sm">
                    Only few slots left!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features/Value Props */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Kinstel?</h2>
              <p className="text-muted-foreground">
                We don't just build websites; we build digital assets that work
                for your business 24/7.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <LiquidCard
                  key={i}
                  className="h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </LiquidCard>
              ))}
            </div>
          </div>
        </section>

        {/* Offer Details */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="bg-gradient-to-br from-accent/5 to-purple-500/5 border border-accent/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 p-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

              <div className="relative z-10 max-w-4xl mx-auto">
                <Gift className="h-16 w-16 text-accent mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Unlock Exclusive Benefits Worth ₹15,000
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Schedule your consultation today and claim your free digital
                  growth package.
                </p>

                <div className="grid sm:grid-cols-3 gap-6 mb-10 text-left">
                  <div className="bg-card/50 p-4 rounded-xl border border-border/50">
                    <span className="block text-2xl font-bold text-accent mb-1">
                      Free
                    </span>
                    <span className="font-medium">1 Year Hosting & Domain</span>
                  </div>
                  <div className="bg-card/50 p-4 rounded-xl border border-border/50">
                    <span className="block text-2xl font-bold text-accent mb-1">
                      Free
                    </span>
                    <span className="font-medium">Business Email Setup</span>
                  </div>
                  <div className="bg-card/50 p-4 rounded-xl border border-border/50">
                    <span className="block text-2xl font-bold text-accent mb-1">
                      Free
                    </span>
                    <span className="font-medium">
                      Google My Business Profile
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="text-lg px-8 py-6 h-auto shadow-lg shadow-accent/25"
                  asChild>
                  <Link href="#claim-offer">Grab This Offer Now</Link>
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  *Offer valid for limited time only. Terms apply.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
