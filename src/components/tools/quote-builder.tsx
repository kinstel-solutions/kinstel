"use client";

import * as React from "react";
import {
  Globe,
  LayoutGrid,
  TrendingUp,
  HelpCircle,
  Loader2,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SmartCtaButton } from "@/components/ui/smart-cta-button";
import { cn } from "@/lib/utils";
import { event } from "@/lib/gtag";
import { submitQuoteLead } from "@/app/actions";
import {
  addOnLabels,
  formatINR,
  estimateRange,
  type AddOnKey,
  type WebsiteSize,
  sizeLabels,
} from "@/lib/quote-pricing";

type Need = "website" | "platform" | "marketing" | "unsure";
type Screen = "need" | "scope" | "contact" | "result";
type PlatformType = "booking" | "marketplace" | "dashboard" | "other";
type MarketingChoice = "seo" | "ads" | "both";

const needOptions: {
  value: Need;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "website",
    label: "A new website",
    description: "A site to represent your business and bring in leads.",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    value: "platform",
    label: "A web platform or app",
    description: "Booking systems, marketplaces, dashboards, custom software.",
    icon: <LayoutGrid className="h-5 w-5" />,
  },
  {
    value: "marketing",
    label: "Marketing & growth",
    description: "SEO, Google Business, or paid ads management.",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    value: "unsure",
    label: "Not sure — a mix",
    description: "Let's talk through what makes sense for you.",
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

const sizeOptions: { value: WebsiteSize; label: string }[] = [
  { value: "landing", label: sizeLabels.landing },
  { value: "small", label: sizeLabels.small },
  { value: "standard", label: sizeLabels.standard },
  { value: "large", label: sizeLabels.large },
];

const addOnOptions: { value: AddOnKey; label: string }[] = (
  Object.keys(addOnLabels) as AddOnKey[]
).map((value) => ({ value, label: addOnLabels[value] }));

const platformOptions: { value: PlatformType; label: string }[] = [
  { value: "booking", label: "Booking / reservations system" },
  { value: "marketplace", label: "Marketplace (multi-vendor)" },
  { value: "dashboard", label: "Internal dashboard / admin tool" },
  { value: "other", label: "Something else / custom software" },
];

const marketingOptions: { value: MarketingChoice; label: string }[] = [
  { value: "seo", label: "SEO & Google Business management" },
  { value: "ads", label: "Google Ads management" },
  { value: "both", label: "Both" },
];

function SelectCard({
  id,
  selected,
  onClick,
  children,
}: {
  id: string;
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id}>
      <Card
        onClick={onClick}
        className={cn(
          "flex cursor-pointer items-start gap-3 p-4 transition-all duration-200 hover:border-accent/50",
          selected && "border-accent bg-accent/5 shadow-glow-sm",
        )}
      >
        {children}
      </Card>
    </label>
  );
}

function StepHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export function QuoteBuilder() {
  const [screen, setScreen] = React.useState<Screen>("need");
  const [need, setNeed] = React.useState<Need | null>(null);

  // Website branch
  const [size, setSize] = React.useState<WebsiteSize | null>(null);
  const [addOns, setAddOns] = React.useState<Set<AddOnKey>>(new Set());
  const [rush, setRush] = React.useState(false);

  // Platform branch
  const [platformType, setPlatformType] = React.useState<PlatformType | null>(
    null,
  );

  // Marketing branch
  const [marketingChoice, setMarketingChoice] =
    React.useState<MarketingChoice | null>(null);

  // Contact
  const [name, setName] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [source, setSource] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [contactError, setContactError] = React.useState<string | null>(null);
  const leadSentRef = React.useRef(false);

  const hasScopeStep = need !== "unsure" && need !== null;

  // Progress: need -> [scope] -> contact -> result
  const totalSteps = hasScopeStep ? 4 : 3;
  const currentStepIndex = React.useMemo(() => {
    if (screen === "need") return 1;
    if (screen === "scope") return 2;
    if (screen === "contact") return hasScopeStep ? 3 : 2;
    return totalSteps;
  }, [screen, hasScopeStep, totalSteps]);
  const progressPct = Math.round((currentStepIndex / totalSteps) * 100);

  function toggleAddOn(key: AddOnKey) {
    setAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleSelectNeed(value: Need) {
    setNeed(value);
    setScreen(value === "unsure" ? "contact" : "scope");
  }

  function goBack() {
    if (screen === "scope") setScreen("need");
    else if (screen === "contact") setScreen(hasScopeStep ? "scope" : "need");
    else if (screen === "result") setScreen("contact");
  }

  function canContinueScope() {
    if (need === "website") return !!size;
    if (need === "platform") return !!platformType;
    if (need === "marketing") return !!marketingChoice;
    return true;
  }

  const range =
    need === "website" && size
      ? estimateRange(size, Array.from(addOns), rush)
      : null;

  function resultSummary(): string {
    if (need === "website" && range) {
      return `Estimated starting range shown: ${formatINR(range.low)} – ${formatINR(range.high)}`;
    }
    if (need === "platform") {
      return "Custom platform — starts around ₹1,00,000+, scoped individually.";
    }
    if (need === "marketing") {
      return "Marketing & growth — SEO/GBP from ₹20,000/mo, Google Ads management from ₹10,000/mo (or 20% of ad spend).";
    }
    return "Not sure yet — wants a call to talk through options.";
  }

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setContactError("Please enter your name and email address.");
      return;
    }
    setContactError(null);
    setSubmitting(true);

    if (!leadSentRef.current) {
      leadSentRef.current = true;
      event({ action: "generate_lead", category: "tool", label: "quote-builder" });
      submitQuoteLead({
        need: need as Need,
        websiteSize: size ? sizeLabels[size] : undefined,
        addOns: Array.from(addOns).map((key) => addOnLabels[key]),
        rush,
        platformType: platformType
          ? platformOptions.find((o) => o.value === platformType)?.label
          : undefined,
        marketingChoice: marketingChoice
          ? marketingOptions.find((o) => o.value === marketingChoice)?.label
          : undefined,
        name,
        businessName: businessName || undefined,
        email,
        phone: phone || undefined,
        source: source || undefined,
        rangeLow: range?.low,
        rangeHigh: range?.high,
        resultSummary: resultSummary(),
      }).catch((err) => {
        console.error("Failed to submit quote lead:", err);
      });
    }

    // Small delay purely for UX continuity — the lead capture above is fired
    // in the background and never blocks reaching the result screen.
    setTimeout(() => {
      setSubmitting(false);
      setScreen("result");
    }, 400);
  }

  return (
    <Card className="mx-auto w-full max-w-3xl border-accent/20 p-6 md:p-10">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            Step {currentStepIndex} of {totalSteps}
          </span>
          {screen !== "need" && screen !== "result" && (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
          )}
        </div>
        <Progress value={progressPct} className="h-1.5" />
      </div>

      {/* STEP 1: Need */}
      {screen === "need" && (
        <div className="animate-in fade-in slide-in-from-bottom-3">
          <StepHeading eyebrow="Let's start" title="What do you need?" />
          <div className="grid gap-3 sm:grid-cols-2">
            {needOptions.map((opt) => (
              <SelectCard
                key={opt.value}
                id={`need-${opt.value}`}
                selected={need === opt.value}
                onClick={() => handleSelectNeed(opt.value)}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {opt.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{opt.label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {opt.description}
                  </p>
                </div>
              </SelectCard>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Scope (branches) */}
      {screen === "scope" && need === "website" && (
        <div className="animate-in fade-in slide-in-from-bottom-3">
          <StepHeading eyebrow="Scope it out" title="How big is the site?" />
          <RadioGroup
            value={size ?? undefined}
            onValueChange={(v) => setSize(v as WebsiteSize)}
            className="grid gap-3 sm:grid-cols-2"
          >
            {sizeOptions.map((opt) => (
              <SelectCard
                key={opt.value}
                id={`size-${opt.value}`}
                selected={size === opt.value}
                onClick={() => setSize(opt.value)}
              >
                <RadioGroupItem
                  value={opt.value}
                  id={`size-${opt.value}`}
                  className="mt-0.5"
                />
                <span className="font-medium text-foreground">{opt.label}</span>
              </SelectCard>
            ))}
          </RadioGroup>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-foreground">
              Anything else? <span className="font-normal text-muted-foreground">(optional)</span>
            </h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {addOnOptions.map((opt) => {
                const checked = addOns.has(opt.value);
                return (
                  <label
                    key={opt.value}
                    htmlFor={`addon-${opt.value}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 p-3 transition-colors hover:border-accent/50",
                      checked && "border-accent bg-accent/5",
                    )}
                  >
                    <Checkbox
                      id={`addon-${opt.value}`}
                      checked={checked}
                      onCheckedChange={() => toggleAddOn(opt.value)}
                    />
                    <span className="text-sm text-foreground">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-foreground">Timeline</h3>
            <RadioGroup
              value={rush ? "rush" : "standard"}
              onValueChange={(v) => setRush(v === "rush")}
              className="mt-3 grid gap-3 sm:grid-cols-2"
            >
              <SelectCard
                id="timeline-standard"
                selected={!rush}
                onClick={() => setRush(false)}
              >
                <RadioGroupItem value="standard" id="timeline-standard" />
                <span className="font-medium text-foreground">Standard</span>
              </SelectCard>
              <SelectCard
                id="timeline-rush"
                selected={rush}
                onClick={() => setRush(true)}
              >
                <RadioGroupItem value="rush" id="timeline-rush" />
                <span className="font-medium text-foreground">Rush (10-day)</span>
              </SelectCard>
            </RadioGroup>
          </div>

          <Button
            className="mt-8 w-full"
            size="lg"
            disabled={!canContinueScope()}
            onClick={() => setScreen("contact")}
          >
            Continue
          </Button>
        </div>
      )}

      {screen === "scope" && need === "platform" && (
        <div className="animate-in fade-in slide-in-from-bottom-3">
          <StepHeading eyebrow="Scope it out" title="What kind of platform?" />
          <RadioGroup
            value={platformType ?? undefined}
            onValueChange={(v) => setPlatformType(v as PlatformType)}
            className="grid gap-3"
          >
            {platformOptions.map((opt) => (
              <SelectCard
                key={opt.value}
                id={`platform-${opt.value}`}
                selected={platformType === opt.value}
                onClick={() => setPlatformType(opt.value)}
              >
                <RadioGroupItem value={opt.value} id={`platform-${opt.value}`} />
                <span className="font-medium text-foreground">{opt.label}</span>
              </SelectCard>
            ))}
          </RadioGroup>

          <Button
            className="mt-8 w-full"
            size="lg"
            disabled={!canContinueScope()}
            onClick={() => setScreen("contact")}
          >
            Continue
          </Button>
        </div>
      )}

      {screen === "scope" && need === "marketing" && (
        <div className="animate-in fade-in slide-in-from-bottom-3">
          <StepHeading
            eyebrow="Scope it out"
            title="Which do you need?"
          />
          <RadioGroup
            value={marketingChoice ?? undefined}
            onValueChange={(v) => setMarketingChoice(v as MarketingChoice)}
            className="grid gap-3"
          >
            {marketingOptions.map((opt) => (
              <SelectCard
                key={opt.value}
                id={`marketing-${opt.value}`}
                selected={marketingChoice === opt.value}
                onClick={() => setMarketingChoice(opt.value)}
              >
                <RadioGroupItem value={opt.value} id={`marketing-${opt.value}`} />
                <span className="font-medium text-foreground">{opt.label}</span>
              </SelectCard>
            ))}
          </RadioGroup>

          <Button
            className="mt-8 w-full"
            size="lg"
            disabled={!canContinueScope()}
            onClick={() => setScreen("contact")}
          >
            Continue
          </Button>
        </div>
      )}

      {/* STEP 3: Contact */}
      {screen === "contact" && (
        <div className="animate-in fade-in slide-in-from-bottom-3">
          <StepHeading
            eyebrow="Almost there"
            title="Where should we send your estimate?"
          />
          <form onSubmit={handleContactSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="quote-name">Name</Label>
              <Input
                id="quote-name"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="quote-business">Business name (optional)</Label>
              <Input
                id="quote-business"
                placeholder="Your business"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="quote-email">Email</Label>
              <Input
                id="quote-email"
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="quote-phone">WhatsApp / Phone (optional)</Label>
              <Input
                id="quote-phone"
                type="tel"
                placeholder="+91 98899 88408"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="quote-source">How did you find us? (optional)</Label>
              <Input
                id="quote-source"
                placeholder="Google, referral, social..."
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="mt-1.5"
              />
            </div>

            {contactError && (
              <p className="sm:col-span-2 text-sm text-destructive">{contactError}</p>
            )}

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting your estimate...
                  </>
                ) : (
                  "Get My Estimate"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 4: Result */}
      {screen === "result" && (
        <div className="animate-in fade-in slide-in-from-bottom-3 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
            <CheckCircle2 className="h-7 w-7 text-accent" />
          </div>

          {need === "website" && range && (
            <>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Estimated starting range
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {formatINR(range.low)} – {formatINR(range.high)}
              </p>
              <p className="mx-auto mt-5 max-w-md text-muted-foreground">
                This is a ballpark to set expectations — your exact quote depends
                on scope. Book a free call and we&apos;ll tailor it.
              </p>

              <Collapsible className="mx-auto mt-8 max-w-md text-left">
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between rounded-lg border border-border/60 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/50"
                  >
                    What shapes your quote?
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {size && <Badge variant="outline">{sizeLabels[size]}</Badge>}
                    {Array.from(addOns).map((key) => (
                      <Badge key={key} variant="outline">
                        {addOnLabels[key]}
                      </Badge>
                    ))}
                    <Badge variant="outline">
                      {rush ? "Rush (10-day)" : "Standard timeline"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    These are the categories that factor into your quote — final
                    pricing is confirmed on a free call.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </>
          )}

          {need === "platform" && (
            <>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Custom platform
              </p>
              <p className="mx-auto mt-2 max-w-md text-2xl font-bold tracking-tight text-foreground">
                Custom platforms start around ₹1,00,000+ and are scoped individually.
              </p>
              <p className="mx-auto mt-5 max-w-md text-muted-foreground">
                Every platform is different — book a free call and we&apos;ll scope
                exactly what you need.
              </p>
            </>
          )}

          {need === "marketing" && (
            <>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Marketing & growth
              </p>
              <p className="mx-auto mt-2 max-w-md text-2xl font-bold tracking-tight text-foreground">
                SEO & Google Business management from ₹20,000/mo · Google Ads
                management from ₹10,000/mo (or 20% of ad spend).
              </p>
              <p className="mx-auto mt-5 max-w-md text-muted-foreground">
                Book a free call and we&apos;ll recommend the right mix for your
                budget and goals.
              </p>
            </>
          )}

          {need === "unsure" && (
            <>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Let&apos;s talk
              </p>
              <p className="mx-auto mt-2 max-w-md text-2xl font-bold tracking-tight text-foreground">
                No problem — let&apos;s figure it out together.
              </p>
              <p className="mx-auto mt-5 max-w-md text-muted-foreground">
                Book a free call and we&apos;ll help you work out the right starting
                point for your business.
              </p>
            </>
          )}

          <div className="mt-10 flex justify-center">
            <SmartCtaButton
              phoneNumber="+919889988408"
              email="contact@kinstel.com"
              emailSubject="Quote Builder Follow-up"
              emailBody={`Hello, I just used the Quote Builder tool and would like to talk about ${
                need === "website"
                  ? "a new website"
                  : need === "platform"
                    ? "a web platform"
                    : need === "marketing"
                      ? "marketing & growth"
                      : "my project"
              }.`}
              size="lg"
              className="shadow-lg shadow-accent/20"
            >
              Book a Free Call
            </SmartCtaButton>
          </div>
        </div>
      )}
    </Card>
  );
}
