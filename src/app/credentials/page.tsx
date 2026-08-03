import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Globe, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Credentials & Compliance",
  description: "View Kinstel Solutions government registrations, Udyam MSME certification, and official IEC credentials.",
  alternates: {
    canonical: "/credentials",
  },
};

export default function CredentialsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Credentials & Compliance
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kinstel Solutions is a fully registered entity with the Government of India, committed to transparency and regulatory compliance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-12">
            {/* MSME/Udyam Card */}
            <Card className="border-accent/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">MSME Registration</CardTitle>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <CardDescription>Udyam Registration Certificate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    Registration Number
                  </p>
                  <p className="font-mono text-lg font-medium select-all">
                    UDYAM-UP-50-0230220
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Status: Active / Verified
                </div>
              </CardContent>
            </Card>

            {/* IEC Card */}
            <Card className="border-accent/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Import-Export Code</CardTitle>
                  <Globe className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Directorate General of Foreign Trade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    IEC Number
                  </p>
                  <p className="font-mono text-lg font-medium select-all">
                    HLCPS8014Q
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Licensed for International Services Export
                </p>
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Status: Active / Verified
                </div>
              </CardContent>
            </Card>

            {/* D-U-N-S Card */}
            <Card className="border-accent/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">D-U-N-S® Number</CardTitle>
                  <Building2 className="h-5 w-5 text-purple-500" />
                </div>
                <CardDescription>Dun & Bradstreet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    D-U-N-S® Number
                  </p>
                  <p className="font-mono text-lg font-medium select-all">
                    77-197-4415
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Universal global standard for business identification
                </p>
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Status: Active / Verified
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Verified Directory Profiles Section */}
          <div className="pt-10 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold font-headline text-foreground">
                Verified B2B Directory Profiles
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Official agency profiles across global B2B platforms and search networks.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Clutch.co", link: "https://clutch.co/profile/kinstel-solutions", category: "B2B Agency Reviews" },
                { name: "DesignRush", link: "https://www.designrush.com/agency/profile/kinstel-solutions", category: "Top Web Design Agency" },
                { name: "GoodFirms", link: "https://www.goodfirms.co/company/kinstel-solutions-official", category: "Verified Tech Vendor" },
                { name: "TechBehemoths", link: "https://techbehemoths.com/company/kinstel-solutions", category: "Web Development Studio" },
                { name: "Google Business Profile", link: "https://share.google/r0DGTJyecJmBUBaWC", category: "Verified Local Listing (5.0 ★)" },
                { name: "Justdial", link: "https://jsdl.in/DT-3969OKJ36IF", category: "Verified Service Listing (5.0 ★)" },
                { name: "Bing Places for Business", link: "https://www.bing.com/maps/search?mkt=en-IN&ss=id.ypid%3AYNE59A5E76D46BB06B&cp=26.854063%7E81.043716&lvl=16&style=r", category: "Verified Search Listing" },
                { name: "LinkedIn Company Page", link: "https://www.linkedin.com/company/kinstel", category: "Official Corporate Page" },
                { name: "X (Twitter) Official", link: "https://x.com/kinstelhq", category: "Official Brand Channel" },
              ].map((profile, i) => (
                <a
                  key={i}
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-border/60 bg-card/40 hover:bg-card hover:border-accent/40 transition-all flex flex-col justify-between group">
                  <div>
                    <span className="text-[11px] font-semibold text-accent uppercase tracking-wider block mb-1">
                      {profile.category}
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors flex items-center justify-between">
                      {profile.name}
                      <span className="text-xs text-muted-foreground group-hover:translate-x-0.5 transition-transform">→</span>
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
