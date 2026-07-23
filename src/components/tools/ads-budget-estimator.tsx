"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";

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
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { cn } from "@/lib/utils";
import { event } from "@/lib/gtag";

type Mode = "budget" | "leads";
type Competitiveness = "low" | "medium" | "high";

const cpcBands: Record<Competitiveness, { low: number; high: number; label: string }> = {
  low: { low: 10, high: 30, label: "Low" },
  medium: { low: 30, high: 70, label: "Medium" },
  high: { low: 70, high: 150, label: "High" },
};

const DEFAULT_CONV_LOW = 5;
const DEFAULT_CONV_HIGH = 12;

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

function formatNum(amount: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(amount),
  );
}

export function AdsBudgetEstimator() {
  const [mode, setMode] = React.useState<Mode>("budget");
  const [budget, setBudget] = React.useState(20000);
  const [leadTarget, setLeadTarget] = React.useState(30);
  const [competitiveness, setCompetitiveness] = React.useState<Competitiveness>("medium");
  const [convRateInput, setConvRateInput] = React.useState("");

  const didMountRef = React.useRef(false);
  React.useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    event({ action: "use_tool", category: "tool", label: "ads-budget-estimator" });
  }, [mode, budget, leadTarget, competitiveness, convRateInput]);

  const cpc = cpcBands[competitiveness];

  const customConv = Number(convRateInput);
  const hasCustomConv = convRateInput.trim() !== "" && customConv > 0;
  const convLow = hasCustomConv ? customConv : DEFAULT_CONV_LOW;
  const convHigh = hasCustomConv ? customConv : DEFAULT_CONV_HIGH;

  let clicksLow = 0;
  let clicksHigh = 0;
  let leadsLow = 0;
  let leadsHigh = 0;
  let budgetLow = 0;
  let budgetHigh = 0;

  if (mode === "budget") {
    clicksLow = budget / cpc.high;
    clicksHigh = budget / cpc.low;
    leadsLow = clicksLow * (convLow / 100);
    leadsHigh = clicksHigh * (convHigh / 100);
  } else {
    const clicksNeededLow = leadTarget / (convHigh / 100);
    const clicksNeededHigh = leadTarget / (convLow / 100);
    budgetLow = clicksNeededLow * cpc.low;
    budgetHigh = clicksNeededHigh * cpc.high;
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="border-accent/20 p-6 md:p-8">
        {/* Mode toggle */}
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant={mode === "budget" ? "default" : "outline"}
            onClick={() => setMode("budget")}
            className="flex-1">
            I have a budget
          </Button>
          <Button
            type="button"
            variant={mode === "leads" ? "default" : "outline"}
            onClick={() => setMode("leads")}
            className="flex-1">
            I have a lead target
          </Button>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {mode === "budget" ? (
            <div>
              <Label htmlFor="ads-budget">Monthly budget (₹)</Label>
              <Input
                id="ads-budget"
                type="number"
                min={0}
                inputMode="numeric"
                value={budget}
                onChange={(e) => setBudget(Math.max(0, Number(e.target.value) || 0))}
                className="mt-1.5"
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="ads-leads">Lead target (leads/mo)</Label>
              <Input
                id="ads-leads"
                type="number"
                min={0}
                inputMode="numeric"
                value={leadTarget}
                onChange={(e) => setLeadTarget(Math.max(0, Number(e.target.value) || 0))}
                className="mt-1.5"
              />
            </div>
          )}

          <div>
            <Label htmlFor="ads-conv">Landing page conversion rate (%, optional)</Label>
            <Input
              id="ads-conv"
              type="number"
              min={0}
              step={0.5}
              inputMode="decimal"
              placeholder={`Default ${DEFAULT_CONV_LOW}–${DEFAULT_CONV_HIGH}%`}
              value={convRateInput}
              onChange={(e) => setConvRateInput(e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="mt-6">
          <Label className="mb-2 block">Competitiveness of your industry</Label>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(cpcBands) as Competitiveness[]).map((key) => (
              <button
                type="button"
                key={key}
                onClick={() => setCompetitiveness(key)}
                className={cn(
                  "rounded-lg border px-3 py-3 text-center text-sm font-semibold transition-colors",
                  competitiveness === key
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border/50 text-muted-foreground hover:border-accent/40",
                )}>
                {cpcBands[key].label}
                <span className="mt-1 block text-xs font-normal text-muted-foreground">
                  ₹{cpcBands[key].low}–{cpcBands[key].high} CPC
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
          {mode === "budget" ? (
            <p className="text-lg leading-relaxed text-foreground">
              With <span className="font-semibold text-accent">{formatINR(budget)}</span>
              /mo at {cpc.label.toLowerCase()} competition, expect ~
              <span className="font-semibold">
                {formatNum(clicksLow)}–{formatNum(clicksHigh)}
              </span>{" "}
              clicks and ~
              <span className="font-semibold">
                {formatNum(leadsLow)}–{formatNum(leadsHigh)}
              </span>{" "}
              leads/month.
            </p>
          ) : (
            <p className="text-lg leading-relaxed text-foreground">
              To get ~<span className="font-semibold text-accent">{formatNum(leadTarget)}</span>{" "}
              leads/month at {cpc.label.toLowerCase()} competition, budget ~
              <span className="font-semibold">
                {formatINR(budgetLow)}–{formatINR(budgetHigh)}
              </span>
              /month.
            </p>
          )}
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-lg border border-border/50 bg-muted/30 p-4 text-sm text-muted-foreground">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>
            Rough estimates — real results depend on your niche, targeting, and
            landing page. We've run campaigns at ~15–40% conversion on tuned
            funnels.
          </p>
        </div>
      </Card>

      {/* CTA */}
      <Card className="mt-10 border-accent/20 bg-accent/5 p-8 text-center">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl">Want us to run it?</CardTitle>
          <CardDescription className="mt-2 text-base">
            Google Ads management from ₹10,000/mo — we'll build the funnel to
            hit the high end of these ranges.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex justify-center p-0">
          <SmartCtaButton
            phoneNumber="+919889988408"
            email="contact@kinstel.com"
            emailSubject="Google Ads Budget Follow-up"
            emailBody="Hello, I used the Google Ads Budget Estimator and would like to talk about running a campaign."
            size="lg"
            className="shadow-lg shadow-accent/20">
            Book a Free Call
          </SmartCtaButton>
        </CardContent>
      </Card>
    </div>
  );
}
