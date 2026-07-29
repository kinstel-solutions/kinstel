import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CareersHero } from "@/components/sections/careers-hero";
import { CareersCulture } from "@/components/sections/careers-culture";
import { CareersRoles } from "@/components/sections/careers-roles";

export const metadata: Metadata = {
  title: "Careers at Kinstel Solutions | Join Our Team",
  description:
    "Join Kinstel Solutions in Lucknow or remote. Explore open positions in Operations, Reception, Full-Stack Engineering, UI/UX Design, and Performance Marketing.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <CareersHero />
        <CareersCulture />
        <CareersRoles />
      </main>
      <Footer />
    </div>
  );
}
