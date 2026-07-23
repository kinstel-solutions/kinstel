"use client";

import * as React from "react";
import { Plus, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { event } from "@/lib/gtag";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function RoiCalculator() {
  const [visitors, setVisitors] = React.useState(1000);
  const [convRate, setConvRate] = React.useState(2);
  const [customerValue, setCustomerValue] = React.useState(2000);
  const [targetRate, setTargetRate] = React.useState(3);

  const didMountRef = React.useRef(false);
  React.useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    event({ action: "use_tool", category: "tool", label: "roi-calculator" });
  }, [visitors, convRate, customerValue, targetRate]);

  // Keep the target rate from ever falling below the current rate.
  React.useEffect(() => {
    if (targetRate < convRate) {
      setTargetRate(Math.round((convRate + 1) * 10) / 10);
    }
  }, [convRate, targetRate]);

  const currentCustomers = visitors * (convRate / 100);
  const currentRevenue = currentCustomers * customerValue;

  const targetCustomers = visitors * (targetRate / 100);
  const targetRevenue = targetCustomers * customerValue;

  const deltaMonth = Math.max(0, targetRevenue - currentRevenue);
  const deltaYear = deltaMonth * 12;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card className="border-accent/20 p-6 md:p-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <Label htmlFor="roi-visitors">Monthly visitors</Label>
            <Input
              id="roi-visitors"
              type="number"
              min={0}
              inputMode="numeric"
              value={visitors}
              onChange={(e) => setVisitors(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="roi-conv">Current conversion rate (%)</Label>
            <Input
              id="roi-conv"
              type="number"
              min={0.1}
              step={0.1}
              inputMode="decimal"
              value={convRate}
              onChange={(e) => setConvRate(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="roi-value">Average customer value (₹)</Label>
            <Input
              id="roi-value"
              type="number"
              min={0}
              inputMode="numeric"
              value={customerValue}
              onChange={(e) => setCustomerValue(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/50 bg-accent/5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Label htmlFor="roi-target-slider" className="text-base">
              Target conversion rate:{" "}
              <span className="text-accent">{targetRate.toFixed(1)}%</span>
            </Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTargetRate((r) => Math.round((r + 1) * 10) / 10)}>
                <Plus className="h-3.5 w-3.5" /> 1pt
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTargetRate((r) => Math.round((r + 2) * 10) / 10)}>
                <Plus className="h-3.5 w-3.5" /> 2pt
              </Button>
            </div>
          </div>
          <Slider
            id="roi-target-slider"
            className="mt-4"
            min={convRate}
            max={Math.max(convRate + 15, 10)}
            step={0.1}
            value={[targetRate]}
            onValueChange={([v]) => setTargetRate(v)}
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              At {convRate}% conversion, today
            </p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {formatINR(currentRevenue)}
              <span className="text-sm font-medium text-muted-foreground">/mo</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              ~{Math.round(currentCustomers)} customers/mo
            </p>
          </div>
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <TrendingUp className="h-3.5 w-3.5" /> At {targetRate.toFixed(1)}% conversion
            </p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {formatINR(targetRevenue)}
              <span className="text-sm font-medium text-muted-foreground">/mo</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              ~{Math.round(targetCustomers)} customers/mo
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-lg leading-relaxed text-foreground">
          At <span className="font-semibold text-accent">{convRate}%</span> you earn ~
          <span className="font-semibold">{formatINR(currentRevenue)}</span>/mo. Lifting to{" "}
          <span className="font-semibold text-accent">{targetRate.toFixed(1)}%</span> adds ~
          <span className="font-semibold">{formatINR(deltaMonth)}</span>/mo (
          <span className="font-semibold">{formatINR(deltaYear)}</span>/yr).
        </p>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Estimates based on the numbers you enter.
        </p>
      </Card>

      {/* CTA */}
      <Card className="mt-10 border-accent/20 bg-accent/5 p-8 text-center">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl">
            A better-converting site pays for itself.
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            Book a free call and we'll show you exactly where visitors are
            dropping off — and how to fix it.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex justify-center p-0">
          <SmartCtaButton
            phoneNumber="+919889988408"
            email="contact@kinstel.com"
            emailSubject="Website ROI Calculator Follow-up"
            emailBody={`Hello, I used the Website ROI Calculator (currently at ${convRate}% conversion, targeting ${targetRate.toFixed(
              1,
            )}%) and would like help improving my site's conversion rate.`}
            size="lg"
            className="shadow-lg shadow-accent/20">
            Book a Free Call
          </SmartCtaButton>
        </CardContent>
      </Card>
    </div>
  );
}
