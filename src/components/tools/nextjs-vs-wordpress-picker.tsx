"use client";

import * as React from "react";
import Link from "next/link";
import { Check, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { cn } from "@/lib/utils";
import { event } from "@/lib/gtag";

type Platform = "wp" | "next";
type Answer = "yes" | "no" | null;

interface Question {
  id: string;
  question: string;
  yesFavors: Platform;
  yesReason: (platform: Platform) => string;
  noReason: (platform: Platform) => string;
}

const questions: Question[] = [
  {
    id: "content",
    question: "Will you update content yourself, often?",
    yesFavors: "wp",
    yesReason: () =>
      "You'll be updating content yourself often — WordPress's editor and plugin ecosystem make that easy without needing a developer.",
    noReason: () =>
      "You won't be touching content constantly — a Next.js build removes the plugin bloat and maintenance overhead you don't need.",
  },
  {
    id: "cost",
    question: "Is lowest upfront cost your top priority?",
    yesFavors: "wp",
    yesReason: () =>
      "Lowest upfront cost is your top priority — WordPress with a theme is typically cheaper to launch than a fully custom build.",
    noReason: () =>
      "Upfront cost isn't your main constraint — that opens the door to a custom Next.js build engineered around your exact needs.",
  },
  {
    id: "customApp",
    question:
      "Need a custom app — booking, marketplace, dashboard, logins?",
    yesFavors: "next",
    yesReason: () =>
      "You need custom app functionality (booking, marketplace, dashboard, logins) — that requires real engineering, which is where Next.js excels and WordPress struggles.",
    noReason: () =>
      "You don't need custom app functionality — WordPress's page-builder approach comfortably covers a standard content site.",
  },
  {
    id: "performance",
    question: "Is top performance & a premium custom look important?",
    yesFavors: "next",
    yesReason: () =>
      "Top performance and a premium, custom look matter to you — Next.js is built for speed and pixel-perfect design without plugin overhead.",
    noReason: () =>
      "Performance and bespoke design aren't top priorities — a well-built WordPress theme can get you a decent-looking site quickly.",
  },
  {
    id: "devTeam",
    question: "Do you have a developer/agency to build & maintain it?",
    yesFavors: "next",
    yesReason: () =>
      "You have a developer or agency to build and maintain it — that unlocks everything a custom Next.js platform can do.",
    noReason: () =>
      "Without an ongoing developer or agency, WordPress's huge support community and no-code tools make maintenance far easier.",
  },
];

export function NextjsVsWordpressPicker() {
  const [answers, setAnswers] = React.useState<Record<string, Answer>>({});

  const answeredCount = Object.values(answers).filter((a) => a !== null && a !== undefined).length;
  const isComplete = answeredCount === questions.length;

  const trackedRef = React.useRef(false);
  React.useEffect(() => {
    if (isComplete && !trackedRef.current) {
      trackedRef.current = true;
      event({ action: "use_tool", category: "tool", label: "nextjs-vs-wordpress" });
    }
    if (!isComplete) {
      trackedRef.current = false;
    }
  }, [isComplete]);

  function selectAnswer(id: string, value: Answer) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function reset() {
    setAnswers({});
  }

  let wpScore = 0;
  let nextScore = 0;
  const reasons: string[] = [];

  if (isComplete) {
    questions.forEach((q) => {
      const answer = answers[q.id];
      const chosePlatform: Platform =
        answer === "yes" ? q.yesFavors : q.yesFavors === "wp" ? "next" : "wp";
      if (chosePlatform === "wp") wpScore += 1;
      else nextScore += 1;
    });
  }

  const recommendation: "WordPress" | "Next.js" | "Either" =
    wpScore > nextScore ? "WordPress" : nextScore > wpScore ? "Next.js" : "Either";

  if (isComplete) {
    const winningPlatform: Platform =
      recommendation === "WordPress" ? "wp" : recommendation === "Next.js" ? "next" : "wp";
    questions.forEach((q) => {
      const answer = answers[q.id];
      const chosePlatform: Platform =
        answer === "yes" ? q.yesFavors : q.yesFavors === "wp" ? "next" : "wp";
      if (recommendation === "Either" || chosePlatform === winningPlatform) {
        reasons.push(answer === "yes" ? q.yesReason(chosePlatform) : q.noReason(chosePlatform));
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="border-accent/20 p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {answeredCount} of {questions.length} answered
          </p>
          {answeredCount > 0 && (
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
          )}
        </div>

        <div className="grid gap-4">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="rounded-xl border border-border/50 p-4 sm:p-5">
              <p className="font-semibold text-foreground">
                {index + 1}. {q.question}
              </p>
              <div className="mt-3 flex gap-3">
                <Button
                  type="button"
                  variant={answers[q.id] === "yes" ? "default" : "outline"}
                  size="sm"
                  onClick={() => selectAnswer(q.id, "yes")}
                  className="min-w-24">
                  {answers[q.id] === "yes" && <Check className="h-3.5 w-3.5" />}
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={answers[q.id] === "no" ? "default" : "outline"}
                  size="sm"
                  onClick={() => selectAnswer(q.id, "no")}
                  className="min-w-24">
                  {answers[q.id] === "no" && <Check className="h-3.5 w-3.5" />}
                  No
                </Button>
              </div>
            </div>
          ))}
        </div>

        {isComplete && (
          <div
            className={cn(
              "mt-8 rounded-xl border p-6 text-center animate-in fade-in slide-in-from-bottom-3",
              "border-accent/30 bg-accent/5",
            )}>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Our honest recommendation
            </p>
            <h3 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              {recommendation === "Either"
                ? "Either platform works for you"
                : recommendation}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on your answers: {wpScore} point{wpScore === 1 ? "" : "s"} toward
              WordPress, {nextScore} point{nextScore === 1 ? "" : "s"} toward Next.js.
            </p>
            <ul className="mt-4 space-y-2 text-left text-sm text-muted-foreground">
              {reasons.map((reason, i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          This picker weighs 5 tradeoffs equally, based only on the answers you give.
        </p>
      </Card>

      {/* CTA */}
      <Card className="mt-10 border-accent/20 bg-accent/5 p-8 text-center">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl">Not sure yet?</CardTitle>
          <CardDescription className="mt-2 text-base">
            See how we approach both platforms, or read our full comparison
            breakdown.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex flex-wrap justify-center gap-3 p-0">
          <Button asChild size="lg" variant="outline">
            <Link href="/platforms">Explore Our Platforms</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/blog/nextjs-vs-wordpress">Read the Full Comparison</Link>
          </Button>
          <SmartCtaButton
            phoneNumber="+919889988408"
            email="contact@kinstel.com"
            emailSubject="Next.js vs WordPress Follow-up"
            emailBody={`Hello, I used the Next.js vs WordPress picker and got the recommendation: ${recommendation === "Either" ? "either platform" : recommendation}. I'd like to talk it through.`}
            size="lg"
            className="shadow-lg shadow-accent/20">
            Book a Free Call
          </SmartCtaButton>
        </CardContent>
      </Card>
    </div>
  );
}
