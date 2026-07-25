"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/quote-pricing";

// ---------------------------------------------------------------------------
// Storage — everything lives in localStorage on this device only.
// ---------------------------------------------------------------------------
const STORAGE_KEY = "studio.retainers";

export const RETAINER_SERVICES = [
  "Google Ads Management",
  "SEO & GBP",
  "AMC / Maintenance",
  "Hosting",
  "Other",
] as const;

export const RETAINER_STATUSES = ["Active", "Paused", "Cancelled"] as const;

type RetainerService = (typeof RETAINER_SERVICES)[number];
type RetainerStatus = (typeof RETAINER_STATUSES)[number];

interface Retainer {
  id: string;
  client: string;
  service: RetainerService;
  amount: number;
  billingDay: number;
  status: RetainerStatus;
  notes?: string;
  startedAt: string;
}

interface RetainerFormState {
  client: string;
  service: RetainerService;
  amount: string;
  billingDay: string;
  status: RetainerStatus;
  notes: string;
}

function emptyForm(): RetainerFormState {
  return {
    client: "",
    service: "Google Ads Management",
    amount: "",
    billingDay: "1",
    status: "Active",
    notes: "",
  };
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function loadRetainers(): Retainer[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRetainers(retainers: Retainer[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(retainers));
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

function clampBillingDay(day: number): number {
  if (!Number.isFinite(day)) return 1;
  return Math.min(31, Math.max(1, Math.round(day)));
}

/**
 * Days from `today` until the next occurrence of `billingDay` (a day-of-month,
 * 1-31), wrapping into next month when the day has already passed this month.
 * Months shorter than `billingDay` are treated as billing on the month's last day.
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

function statusBadgeClass(status: RetainerStatus): string {
  switch (status) {
    case "Active":
      return "border-transparent bg-green-500/15 text-green-500";
    case "Paused":
      return "border-transparent bg-amber-500/15 text-amber-500";
    case "Cancelled":
      return "border-transparent bg-muted text-muted-foreground";
  }
}

function statusOrder(status: RetainerStatus): number {
  return RETAINER_STATUSES.indexOf(status);
}

export function RetainerTracker() {
  const { toast } = useToast();
  const [hydrated, setHydrated] = React.useState(false);
  const [retainers, setRetainers] = React.useState<Retainer[]>([]);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [addForm, setAddForm] = React.useState<RetainerFormState>(
    emptyForm(),
  );
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<RetainerFormState>(
    emptyForm(),
  );

  // Hydrate from localStorage on mount (client-only).
  React.useEffect(() => {
    setRetainers(loadRetainers());
    setHydrated(true);
  }, []);

  // Persist on every change.
  React.useEffect(() => {
    if (!hydrated) return;
    saveRetainers(retainers);
  }, [retainers, hydrated]);

  const stats = React.useMemo(() => {
    const today = new Date();
    const activeRetainers = retainers.filter((r) => r.status === "Active");
    const mrr = activeRetainers.reduce((sum, r) => sum + (r.amount || 0), 0);
    const upcomingRenewals = activeRetainers.filter(
      (r) => daysUntilNextBillingDay(r.billingDay, today) <= 7,
    ).length;
    return { mrr, activeCount: activeRetainers.length, upcomingRenewals };
  }, [retainers]);

  const sortedRetainers = React.useMemo(() => {
    return [...retainers].sort((a, b) => {
      const orderDiff = statusOrder(a.status) - statusOrder(b.status);
      if (orderDiff !== 0) return orderDiff;
      return a.client.localeCompare(b.client);
    });
  }, [retainers]);

  function addRetainer(e: React.FormEvent) {
    e.preventDefault();
    if (!addForm.client.trim()) {
      toast({
        title: "Enter a client name before adding a retainer.",
        variant: "destructive",
      });
      return;
    }
    const parsedAmount = parseFloat(addForm.amount);
    const parsedDay = clampBillingDay(parseInt(addForm.billingDay, 10));
    const newRetainer: Retainer = {
      id: makeId(),
      client: addForm.client.trim(),
      service: addForm.service,
      amount: Number.isFinite(parsedAmount) ? parsedAmount : 0,
      billingDay: parsedDay,
      status: addForm.status,
      notes: addForm.notes.trim() || undefined,
      startedAt: new Date().toISOString(),
    };
    setRetainers((prev) => [newRetainer, ...prev]);
    setAddForm(emptyForm());
    setShowAddForm(false);
    toast({ title: `Added retainer for "${newRetainer.client}".` });
  }

  function startEdit(retainer: Retainer) {
    setEditingId(retainer.id);
    setEditForm({
      client: retainer.client,
      service: retainer.service,
      amount: String(retainer.amount),
      billingDay: String(retainer.billingDay),
      status: retainer.status,
      notes: retainer.notes ?? "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyForm());
  }

  function saveEdit(id: string) {
    if (!editForm.client.trim()) {
      toast({ title: "Client cannot be empty.", variant: "destructive" });
      return;
    }
    const parsedAmount = parseFloat(editForm.amount);
    const parsedDay = clampBillingDay(parseInt(editForm.billingDay, 10));
    setRetainers((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              client: editForm.client.trim(),
              service: editForm.service,
              amount: Number.isFinite(parsedAmount) ? parsedAmount : 0,
              billingDay: parsedDay,
              status: editForm.status,
              notes: editForm.notes.trim() || undefined,
            }
          : r,
      ),
    );
    setEditingId(null);
    setEditForm(emptyForm());
    toast({ title: "Retainer updated." });
  }

  function deleteRetainer(id: string, client: string) {
    if (
      !window.confirm(
        `Delete retainer for "${client}"? This cannot be undone.`,
      )
    ) {
      return;
    }
    setRetainers((prev) => prev.filter((r) => r.id !== id));
    if (editingId === id) cancelEdit();
    toast({ title: `Deleted retainer for "${client}".` });
  }

  function cycleStatus(id: string) {
    setRetainers((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const nextIndex =
          (statusOrder(r.status) + 1) % RETAINER_STATUSES.length;
        return { ...r, status: RETAINER_STATUSES[nextIndex] };
      }),
    );
  }

  if (!hydrated) {
    return (
      <div className="text-center text-muted-foreground py-12">Loading…</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">MRR (Active)</p>
            <p className="text-2xl font-bold text-accent">
              {formatINR(stats.mrr)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active Retainers</p>
            <p className="text-2xl font-bold">{stats.activeCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Upcoming Renewals (7d)
            </p>
            <p className="text-2xl font-bold">{stats.upcomingRenewals}</p>
          </CardContent>
        </Card>
      </div>

      {/* Add retainer */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-lg">Add Retainer</CardTitle>
            <CardDescription>
              Track a recurring client engagement and its billing cycle.
            </CardDescription>
          </div>
          {!showAddForm && (
            <Button size="sm" onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4" />
              Add Retainer
            </Button>
          )}
        </CardHeader>
        {showAddForm && (
          <CardContent>
            <form
              onSubmit={addRetainer}
              className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="retainerClient">Client *</Label>
                <Input
                  id="retainerClient"
                  value={addForm.client}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, client: e.target.value }))
                  }
                  placeholder="Client / business name"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="retainerService">Service</Label>
                <Select
                  value={addForm.service}
                  onValueChange={(v) =>
                    setAddForm((f) => ({
                      ...f,
                      service: v as RetainerService,
                    }))
                  }>
                  <SelectTrigger id="retainerService">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RETAINER_SERVICES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="retainerAmount">Amount (₹/mo)</Label>
                <Input
                  id="retainerAmount"
                  type="number"
                  inputMode="decimal"
                  value={addForm.amount}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="retainerBillingDay">Billing Day (1-31)</Label>
                <Input
                  id="retainerBillingDay"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={31}
                  value={addForm.billingDay}
                  onChange={(e) =>
                    setAddForm((f) => ({
                      ...f,
                      billingDay: e.target.value,
                    }))
                  }
                  placeholder="1"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="retainerStatus">Status</Label>
                <Select
                  value={addForm.status}
                  onValueChange={(v) =>
                    setAddForm((f) => ({ ...f, status: v as RetainerStatus }))
                  }>
                  <SelectTrigger id="retainerStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RETAINER_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="retainerNotes">Notes</Label>
                <Textarea
                  id="retainerNotes"
                  value={addForm.notes}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  rows={2}
                  placeholder="Any context worth remembering"
                />
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit">
                  <Plus className="h-4 w-4" />
                  Add Retainer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setAddForm(emptyForm());
                  }}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {/* List */}
      <div className="space-y-3">
        {sortedRetainers.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No retainers yet. Add your first one above.
            </CardContent>
          </Card>
        )}
        {sortedRetainers.map((retainer) => {
          const isEditing = editingId === retainer.id;
          return (
            <Card key={retainer.id} className="p-4">
              {isEditing ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    value={editForm.client}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, client: e.target.value }))
                    }
                    placeholder="Client"
                  />
                  <Select
                    value={editForm.service}
                    onValueChange={(v) =>
                      setEditForm((f) => ({
                        ...f,
                        service: v as RetainerService,
                      }))
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RETAINER_SERVICES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    inputMode="decimal"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, amount: e.target.value }))
                    }
                    placeholder="Amount (₹/mo)"
                  />
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={31}
                    value={editForm.billingDay}
                    onChange={(e) =>
                      setEditForm((f) => ({
                        ...f,
                        billingDay: e.target.value,
                      }))
                    }
                    placeholder="Billing day (1-31)"
                  />
                  <Select
                    value={editForm.status}
                    onValueChange={(v) =>
                      setEditForm((f) => ({
                        ...f,
                        status: v as RetainerStatus,
                      }))
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RETAINER_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea
                    value={editForm.notes}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, notes: e.target.value }))
                    }
                    rows={2}
                    placeholder="Notes"
                    className="sm:col-span-2"
                  />
                  <div className="flex gap-2 sm:col-span-2">
                    <Button size="sm" onClick={() => saveEdit(retainer.id)}>
                      <Check className="h-4 w-4" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold leading-tight">
                        {retainer.client}
                      </p>
                      <Badge variant="outline" className="text-[10px]">
                        {retainer.service}
                      </Badge>
                      <Badge
                        className={cn(
                          "text-[10px]",
                          statusBadgeClass(retainer.status),
                        )}>
                        {retainer.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-accent">
                        {formatINR(retainer.amount)}/mo
                      </span>{" "}
                      · Bills on the {ordinal(retainer.billingDay)}
                    </p>
                    {retainer.notes && (
                      <p className="text-xs text-muted-foreground">
                        {retainer.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => cycleStatus(retainer.id)}>
                      Mark{" "}
                      {
                        RETAINER_STATUSES[
                          (statusOrder(retainer.status) + 1) %
                            RETAINER_STATUSES.length
                        ]
                      }
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => startEdit(retainer)}
                      aria-label="Edit retainer">
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() =>
                        deleteRetainer(retainer.id, retainer.client)
                      }
                      aria-label="Delete retainer">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
