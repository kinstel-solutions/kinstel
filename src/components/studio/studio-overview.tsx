"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatINR } from "@/lib/quote-pricing";

// ---------------------------------------------------------------------------
// Reads existing localStorage keys owned by the Retainer and Lead trackers.
// This component never writes to those keys — read-only rollup.
// ---------------------------------------------------------------------------
const RETAINERS_KEY = "studio.retainers";
const LEADS_KEY = "studio.leads";

type RetainerStatus = "Active" | "Paused" | "Cancelled";

interface Retainer {
  id: string;
  client: string;
  service: string;
  amount: number;
  billingDay: number;
  status: RetainerStatus;
  notes?: string;
  startedAt: string;
}

type LeadStage = "New" | "Contacted" | "Quoted" | "Won" | "Lost";

interface Lead {
  id: string;
  name: string;
  business?: string;
  source: string;
  value?: number;
  notes?: string;
  stage: LeadStage;
  createdAt: string;
}

const OPEN_LEAD_STAGES: LeadStage[] = ["New", "Contacted", "Quoted"];

function loadFromStorage<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function clampBillingDay(day: number): number {
  if (!Number.isFinite(day)) return 1;
  return Math.min(31, Math.max(1, Math.round(day)));
}

/**
 * Days from `today` until the next occurrence of `billingDay` (a day-of-month,
 * 1-31), wrapping into next month when the day has already passed this month.
 * Months shorter than `billingDay` are treated as billing on the month's last
 * day. Mirrors the logic in retainer-tracker.tsx.
 */
function daysUntilNextBillingDay(billingDay: number, today: Date): number {
  const day = clampBillingDay(billingDay);
  const lastDayThisMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  const thisMonthBillingDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    Math.min(day, lastDayThisMonth),
  );
  thisMonthBillingDate.setHours(0, 0, 0, 0);
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  let target = thisMonthBillingDate;
  if (target.getTime() < todayStart.getTime()) {
    const lastDayNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0,
    ).getDate();
    target = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      Math.min(day, lastDayNextMonth),
    );
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((target.getTime() - todayStart.getTime()) / msPerDay);
}

interface StatTile {
  label: string;
  value: string;
  hint: string;
}

export function StudioOverview() {
  const [hydrated, setHydrated] = React.useState(false);
  const [retainers, setRetainers] = React.useState<Retainer[]>([]);
  const [leads, setLeads] = React.useState<Lead[]>([]);

  // Hydrate from localStorage on mount (client-only, read-only).
  React.useEffect(() => {
    setRetainers(loadFromStorage<Retainer>(RETAINERS_KEY));
    setLeads(loadFromStorage<Lead>(LEADS_KEY));
    setHydrated(true);
  }, []);

  const stats = React.useMemo(() => {
    const today = new Date();
    const activeRetainers = retainers.filter((r) => r.status === "Active");
    const mrr = activeRetainers.reduce((sum, r) => sum + (r.amount || 0), 0);
    const upcomingRenewals = activeRetainers.filter(
      (r) => daysUntilNextBillingDay(r.billingDay, today) <= 7,
    ).length;

    const openLeads = leads.filter((l) => OPEN_LEAD_STAGES.includes(l.stage));
    const openPipelineValue = openLeads.reduce(
      (sum, l) => sum + (l.value ?? 0),
      0,
    );
    const wonValue = leads
      .filter((l) => l.stage === "Won")
      .reduce((sum, l) => sum + (l.value ?? 0), 0);

    return {
      mrr,
      activeCount: activeRetainers.length,
      upcomingRenewals,
      openLeadsCount: openLeads.length,
      openPipelineValue,
      wonValue,
    };
  }, [retainers, leads]);

  const tiles: StatTile[] = hydrated
    ? [
        {
          label: "MRR (Active)",
          value: formatINR(stats.mrr),
          hint: `${stats.activeCount} active retainer${stats.activeCount === 1 ? "" : "s"}`,
        },
        {
          label: "Active Retainers",
          value: String(stats.activeCount),
          hint: "Currently billing",
        },
        {
          label: "Upcoming Renewals (7d)",
          value: String(stats.upcomingRenewals),
          hint: "Active retainers billing soon",
        },
        {
          label: "Open Leads",
          value: String(stats.openLeadsCount),
          hint: "New, Contacted & Quoted",
        },
        {
          label: "Open Pipeline Value",
          value: formatINR(stats.openPipelineValue),
          hint: "Sum of open-stage lead value",
        },
        {
          label: "Won Value",
          value: formatINR(stats.wonValue),
          hint: "Closed-won lead value",
        },
      ]
    : [
        { label: "MRR (Active)", value: "—", hint: "Loading…" },
        { label: "Active Retainers", value: "—", hint: "Loading…" },
        { label: "Upcoming Renewals (7d)", value: "—", hint: "Loading…" },
        { label: "Open Leads", value: "—", hint: "Loading…" },
        { label: "Open Pipeline Value", value: "—", hint: "Loading…" },
        { label: "Won Value", value: "—", hint: "Loading…" },
      ];

  return (
    <div className="mb-8 space-y-3">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <Card key={tile.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{tile.label}</p>
              <p className="text-2xl font-bold text-accent">{tile.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tile.hint}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Data lives on this device only — nothing is sent to a server.
      </p>
    </div>
  );
}
