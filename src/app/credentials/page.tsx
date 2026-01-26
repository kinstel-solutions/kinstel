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
  title: "Credentials & Compliance | Kinstel Solutions",
  description: "View our government registrations and compliance credentials including Udyam MSME and IEC.",
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
