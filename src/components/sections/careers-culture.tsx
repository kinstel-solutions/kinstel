import {
  Zap,
  ShieldCheck,
  Award,
  Sparkles,
  Smile,
  GraduationCap,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const perks = [
  {
    icon: <Zap className="h-6 w-6 text-accent" />,
    title: "AI-First & Modern Stack",
    description:
      "Work with cutting-edge tools (Next.js 16, React 19, Tailwind, AI tools) to eliminate busywork and focus on creative problem solving.",
  },
  {
    icon: <HeartHandshake className="h-6 w-6 text-accent" />,
    title: "Zero Bureaucracy",
    description:
      "No corporate bloat or endless meetings. Work directly with founders, brand leaders, and software architects to ship fast.",
  },
  {
    icon: <Award className="h-6 w-6 text-accent" />,
    title: "Competitive Pay & Bonuses",
    description:
      "Industry-benchmark compensation, milestone performance bonuses, and transparent evaluation cycles.",
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-accent" />,
    title: "Continuous Learning Stipend",
    description:
      "We budget for your growth—courses, technical books, workshops, and AI subscriptions to expand your craft.",
  },
  {
    icon: <Clock className="h-6 w-6 text-accent" />,
    title: "Flexible Work Culture",
    description:
      "On-site studio in Lucknow or hybrid/remote arrangements depending on your role. We value outcomes over hours spent at a desk.",
  },
  {
    icon: <Smile className="h-6 w-6 text-accent" />,
    title: "Welcoming & Inclusive Team",
    description:
      "A respectful, supportive studio environment where every team member's voice and idea matters from Day 1.",
  },
];

export function CareersCulture() {
  return (
    <section className="py-16 md:py-24 bg-card/40 border-y border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-wider text-accent text-sm">
            Life at Kinstel
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Why You'll Love Working With <span className="text-accent">Us</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            We are building an agile, high-performing studio in Lucknow. Here's what we offer to help you do the best work of your career.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk, index) => (
            <Card
              key={index}
              className="bg-background/80 border-border/60 hover:border-accent/50 transition-all duration-300 hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                  {perk.icon}
                </div>
                <CardTitle className="text-xl font-semibold leading-snug">
                  {perk.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {perk.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
