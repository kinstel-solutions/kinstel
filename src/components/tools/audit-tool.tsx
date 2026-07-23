"use client";

import * as React from "react";
import { Loader2, Gauge, Search, Accessibility, ShieldCheck, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { cn } from "@/lib/utils";
import { event } from "@/lib/gtag";
import { submitAuditLead } from "@/app/actions";

interface AuditReport {
  url: string;
  scores: {
    performance: number | null;
    seo: number | null;
    accessibility: number | null;
    bestPractices: number | null;
  };
  vitals: {
    lcp: string | null;
    cls: string | null;
    tbt: string | null;
    fcp: string | null;
  };
  opportunities: { title: string; description: string }[];
}

type Status = "idle" | "loading" | "success" | "error";

function scoreColor(score: number | null) {
  if (score === null) return "text-muted-foreground";
  if (score < 50) return "text-red-500";
  if (score < 90) return "text-amber-500";
  return "text-emerald-500";
}

function scoreStroke(score: number | null) {
  if (score === null) return "stroke-muted-foreground/40";
  if (score < 50) return "stroke-red-500";
  if (score < 90) return "stroke-amber-500";
  return "stroke-emerald-500";
}

function ScoreRing({
  label,
  score,
  icon,
}: {
  label: string;
  score: number | null;
  icon: React.ReactNode;
}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = score !== null ? (score / 100) * circumference : 0;

  return (
    <Card className="flex flex-col items-center gap-3 p-6 text-center transition-all duration-300 hover:border-accent/50 hover:shadow-lg">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="fill-none stroke-muted/40"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="8"
            strokeLinecap="round"
            className={cn("fill-none transition-all duration-700 ease-out", scoreStroke(score))}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
          />
        </svg>
        <div className={cn("absolute flex flex-col items-center", scoreColor(score))}>
          <span className="text-2xl font-bold">{score ?? "—"}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        {icon}
        {label}
      </div>
    </Card>
  );
}

const vitalsCopy: { key: keyof AuditReport["vitals"]; label: string; hint: string }[] = [
  { key: "lcp", label: "Largest Contentful Paint", hint: "How fast the main content loads" },
  { key: "cls", label: "Cumulative Layout Shift", hint: "How much the page jumps around" },
  { key: "tbt", label: "Total Blocking Time", hint: "How responsive the page feels (proxy for INP)" },
  { key: "fcp", label: "First Contentful Paint", hint: "How fast something appears on screen" },
];

export function AuditTool() {
  const [url, setUrl] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [source, setSource] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [report, setReport] = React.useState<AuditReport | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!url.trim() || !email.trim()) {
      setStatus("error");
      setErrorMessage("Please enter both a website URL and your email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);
    setReport(null);

    // Fire the lead capture in the background — it must never block the
    // audit itself. Also track the lead-generation event immediately.
    event({ action: "generate_lead", category: "tool", label: "website-audit" });
    submitAuditLead({ url, email, source: source || undefined }).catch((err) => {
      console.error("Failed to submit audit lead:", err);
    });

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong while running the audit.");
      }

      setReport(data as AuditReport);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err?.message || "Something went wrong while running the audit. Please try again.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card className="border-accent/20 p-6 md:p-8">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="audit-url">Website URL</Label>
            <Input
              id="audit-url"
              type="text"
              required
              placeholder="yourwebsite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="audit-email">Your Email</Label>
            <Input
              id="audit-email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="audit-source">How did you find us? (optional)</Label>
            <Input
              id="audit-source"
              type="text"
              placeholder="Google, referral, social..."
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div className="sm:col-span-2">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Audit...
                </>
              ) : (
                "Run Free Audit"
              )}
            </Button>
          </div>
        </form>

        {status === "loading" && (
          <p className="mt-4 text-center text-sm text-muted-foreground animate-in fade-in">
            Fetching real performance data from Google PageSpeed Insights — this usually
            takes 10–20 seconds. Hang tight.
          </p>
        )}

        {status === "error" && errorMessage && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive animate-in fade-in">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}
      </Card>

      {status === "success" && report && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-5">
          <p className="text-center text-sm text-muted-foreground">
            Results for{" "}
            <span className="font-semibold text-foreground">{report.url}</span> (mobile)
          </p>

          {/* Score rings */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <ScoreRing
              label="Performance"
              score={report.scores.performance}
              icon={<Gauge className="h-4 w-4 text-accent" />}
            />
            <ScoreRing
              label="SEO"
              score={report.scores.seo}
              icon={<Search className="h-4 w-4 text-accent" />}
            />
            <ScoreRing
              label="Accessibility"
              score={report.scores.accessibility}
              icon={<Accessibility className="h-4 w-4 text-accent" />}
            />
            <ScoreRing
              label="Best Practices"
              score={report.scores.bestPractices}
              icon={<ShieldCheck className="h-4 w-4 text-accent" />}
            />
          </div>

          {/* Core Web Vitals */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold tracking-tight">Core Web Vitals</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {vitalsCopy.map(({ key, label, hint }) => (
                <Card
                  key={key}
                  className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {report.vitals[key] ?? "N/A"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Top opportunities */}
          {report.opportunities.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold tracking-tight">
                Top Opportunities to Fix
              </h3>
              <div className="mt-4 grid gap-3">
                {report.opportunities.map((opp, i) => (
                  <Card
                    key={i}
                    className="flex items-start gap-3 p-4">
                    <Badge
                      variant="outline"
                      className="mt-0.5 shrink-0">
                      {i + 1}
                    </Badge>
                    <div>
                      <p className="font-semibold text-foreground">{opp.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{opp.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <Card className="mt-12 border-accent/20 bg-accent/5 p-8 text-center">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl">Want us to fix these?</CardTitle>
              <CardDescription className="mt-2 text-base">
                We'll turn this report into a prioritized action plan — and handle the
                fixes for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4 flex justify-center p-0">
              <SmartCtaButton
                phoneNumber="+919889988408"
                email="contact@kinstel.com"
                emailSubject="Website Audit Follow-up"
                emailBody={`Hello, I just ran a free audit on ${report.url} and would like help fixing the issues.`}
                size="lg"
                className="shadow-lg shadow-accent/20">
                Book a Call
              </SmartCtaButton>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
