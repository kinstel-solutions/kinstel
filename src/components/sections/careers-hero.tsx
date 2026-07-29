import { Badge } from "@/components/ui/badge";
import { Sparkles, MapPin, Users, Rocket, Zap } from "lucide-react";

export function CareersHero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-28 bg-gradient-to-b from-background via-accent/5 to-background">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Badge
            variant="outline"
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold border-accent/40 bg-accent/10 text-accent rounded-full mb-6">
            <Sparkles className="h-4 w-4 animate-pulse text-accent" />
            We're Hiring • Lucknow & Remote
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline leading-tight">
            Build & Elevate the Future of <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-accent via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Digital Experience
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Kinstel Solutions is an AI-native design, engineering, and digital growth studio.
            We're looking for passionate problem solvers, engineers, designers, front-desk hosts, and operational leaders to shape what's next.
          </p>

          {/* Quick Info Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-border/40">
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-card/60 backdrop-blur border border-border/50 shadow-sm">
              <MapPin className="h-5 w-5 text-accent mb-2" />
              <span className="text-sm font-semibold text-foreground">Lucknow & Remote</span>
              <span className="text-xs text-muted-foreground">Flexible Workspaces</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-card/60 backdrop-blur border border-border/50 shadow-sm">
              <Zap className="h-5 w-5 text-accent mb-2" />
              <span className="text-sm font-semibold text-foreground">AI-Native Stack</span>
              <span className="text-xs text-muted-foreground">Modern Tooling</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-card/60 backdrop-blur border border-border/50 shadow-sm">
              <Users className="h-5 w-5 text-accent mb-2" />
              <span className="text-sm font-semibold text-foreground">High Ownership</span>
              <span className="text-xs text-muted-foreground">Flat Structure</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-card/60 backdrop-blur border border-border/50 shadow-sm">
              <Rocket className="h-5 w-5 text-accent mb-2" />
              <span className="text-sm font-semibold text-foreground">Rapid Growth</span>
              <span className="text-xs text-muted-foreground">Competitive Pay & Perks</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
