"use client";

import * as React from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
} from "lucide-react";

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

// ---------------------------------------------------------------------------
// Storage — everything lives in localStorage on this device only.
// ---------------------------------------------------------------------------
const STORAGE_KEY = "studio.leads";

export const LEAD_SOURCES = [
  "Google Ads",
  "Organic",
  "Referral",
  "DesignRush",
  "WhatsApp",
  "Other",
] as const;

export const LEAD_STAGES = [
  "New",
  "Contacted",
  "Quoted",
  "Won",
  "Lost",
] as const;

type LeadSource = (typeof LEAD_SOURCES)[number];
type LeadStage = (typeof LEAD_STAGES)[number];

interface Lead {
  id: string;
  name: string;
  business?: string;
  source: LeadSource;
  value?: number;
  notes?: string;
  stage: LeadStage;
  createdAt: string;
}

interface LeadFormState {
  name: string;
  business: string;
  source: LeadSource;
  value: string;
  notes: string;
}

function emptyForm(): LeadFormState {
  return {
    name: "",
    business: "",
    source: "Google Ads",
    value: "",
    notes: "",
  };
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function loadLeads(): Lead[] {
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

function saveLeads(leads: Lead[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

function formatDateDisplay(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function stageIndex(stage: LeadStage): number {
  return LEAD_STAGES.indexOf(stage);
}

export function LeadTracker() {
  const { toast } = useToast();
  const [hydrated, setHydrated] = React.useState(false);
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [addForm, setAddForm] = React.useState<LeadFormState>(emptyForm());
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<LeadFormState>(emptyForm());

  // Hydrate from localStorage on mount (client-only).
  React.useEffect(() => {
    setLeads(loadLeads());
    setHydrated(true);
  }, []);

  // Persist on every change.
  React.useEffect(() => {
    if (!hydrated) return;
    saveLeads(leads);
  }, [leads, hydrated]);

  const stats = React.useMemo(() => {
    const total = leads.length;
    const openStages: LeadStage[] = ["New", "Contacted", "Quoted"];
    const openPipeline = leads
      .filter((l) => openStages.includes(l.stage))
      .reduce((sum, l) => sum + (l.value ?? 0), 0);
    const wonValue = leads
      .filter((l) => l.stage === "Won")
      .reduce((sum, l) => sum + (l.value ?? 0), 0);
    return { total, openPipeline, wonValue };
  }, [leads]);

  function addLead(e: React.FormEvent) {
    e.preventDefault();
    if (!addForm.name.trim()) {
      toast({ title: "Enter a name before adding a lead.", variant: "destructive" });
      return;
    }
    const parsedValue = parseFloat(addForm.value);
    const newLead: Lead = {
      id: makeId(),
      name: addForm.name.trim(),
      business: addForm.business.trim() || undefined,
      source: addForm.source,
      value: Number.isFinite(parsedValue) ? parsedValue : undefined,
      notes: addForm.notes.trim() || undefined,
      stage: "New",
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
    setAddForm(emptyForm());
    setShowAddForm(false);
    toast({ title: `Added "${newLead.name}" to New.` });
  }

  function startEdit(lead: Lead) {
    setEditingId(lead.id);
    setEditForm({
      name: lead.name,
      business: lead.business ?? "",
      source: lead.source,
      value: lead.value !== undefined ? String(lead.value) : "",
      notes: lead.notes ?? "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyForm());
  }

  function saveEdit(id: string) {
    if (!editForm.name.trim()) {
      toast({ title: "Name cannot be empty.", variant: "destructive" });
      return;
    }
    const parsedValue = parseFloat(editForm.value);
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              name: editForm.name.trim(),
              business: editForm.business.trim() || undefined,
              source: editForm.source,
              value: Number.isFinite(parsedValue) ? parsedValue : undefined,
              notes: editForm.notes.trim() || undefined,
            }
          : l,
      ),
    );
    setEditingId(null);
    setEditForm(emptyForm());
    toast({ title: "Lead updated." });
  }

  function deleteLead(id: string, name: string) {
    if (!window.confirm(`Delete lead "${name}"? This cannot be undone.`)) {
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (editingId === id) cancelEdit();
    toast({ title: `Deleted "${name}".` });
  }

  function moveStage(id: string, direction: -1 | 1) {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const nextIndex = stageIndex(l.stage) + direction;
        if (nextIndex < 0 || nextIndex >= LEAD_STAGES.length) return l;
        return { ...l, stage: LEAD_STAGES[nextIndex] };
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
            <p className="text-sm text-muted-foreground">Total Leads</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Open Pipeline Value
            </p>
            <p className="text-2xl font-bold text-accent">
              {formatINR(stats.openPipeline)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Won Value</p>
            <p className="text-2xl font-bold text-accent">
              {formatINR(stats.wonValue)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add lead */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-lg">Add Lead</CardTitle>
            <CardDescription>
              New leads are added to the New column.
            </CardDescription>
          </div>
          {!showAddForm && (
            <Button size="sm" onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4" />
              Add Lead
            </Button>
          )}
        </CardHeader>
        {showAddForm && (
          <CardContent>
            <form onSubmit={addLead} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="leadName">Name *</Label>
                <Input
                  id="leadName"
                  value={addForm.name}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Contact name"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="leadBusiness">Business</Label>
                <Input
                  id="leadBusiness"
                  value={addForm.business}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, business: e.target.value }))
                  }
                  placeholder="Company / business name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="leadSource">Source</Label>
                <Select
                  value={addForm.source}
                  onValueChange={(v) =>
                    setAddForm((f) => ({ ...f, source: v as LeadSource }))
                  }>
                  <SelectTrigger id="leadSource">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEAD_SOURCES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="leadValue">Value (₹)</Label>
                <Input
                  id="leadValue"
                  type="number"
                  inputMode="decimal"
                  value={addForm.value}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, value: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="leadNotes">Notes</Label>
                <Textarea
                  id="leadNotes"
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
                  Add Lead
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

      {/* Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {LEAD_STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage);
          const stageValue = stageLeads.reduce(
            (sum, l) => sum + (l.value ?? 0),
            0,
          );
          return (
            <div
              key={stage}
              className="flex w-[280px] flex-shrink-0 flex-col rounded-lg border border-border/60 bg-card/50">
              <div className="flex items-center justify-between border-b border-border/60 px-3 py-2.5">
                <span className="font-semibold">{stage}</span>
                <span className="text-xs text-muted-foreground">
                  {stageLeads.length} · {formatINR(stageValue)}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-3">
                {stageLeads.length === 0 && (
                  <p className="text-center text-xs text-muted-foreground py-6">
                    No leads
                  </p>
                )}
                {stageLeads.map((lead) => {
                  const isEditing = editingId === lead.id;
                  const idx = stageIndex(lead.stage);
                  return (
                    <Card key={lead.id} className="p-3">
                      {isEditing ? (
                        <div className="space-y-2">
                          <Input
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm((f) => ({
                                ...f,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Name"
                          />
                          <Input
                            value={editForm.business}
                            onChange={(e) =>
                              setEditForm((f) => ({
                                ...f,
                                business: e.target.value,
                              }))
                            }
                            placeholder="Business"
                          />
                          <Select
                            value={editForm.source}
                            onValueChange={(v) =>
                              setEditForm((f) => ({
                                ...f,
                                source: v as LeadSource,
                              }))
                            }>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {LEAD_SOURCES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            inputMode="decimal"
                            value={editForm.value}
                            onChange={(e) =>
                              setEditForm((f) => ({
                                ...f,
                                value: e.target.value,
                              }))
                            }
                            placeholder="Value (₹)"
                          />
                          <Textarea
                            value={editForm.notes}
                            onChange={(e) =>
                              setEditForm((f) => ({
                                ...f,
                                notes: e.target.value,
                              }))
                            }
                            rows={2}
                            placeholder="Notes"
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => saveEdit(lead.id)}>
                              <Check className="h-4 w-4" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={cancelEdit}>
                              <X className="h-4 w-4" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate font-semibold leading-tight">
                                {lead.name}
                              </p>
                              {lead.business && (
                                <p className="truncate text-xs text-muted-foreground">
                                  {lead.business}
                                </p>
                              )}
                            </div>
                            <Badge variant="outline" className="shrink-0 text-[10px]">
                              {lead.source}
                            </Badge>
                          </div>
                          {lead.value !== undefined && (
                            <p className="text-sm font-semibold text-accent">
                              {formatINR(lead.value)}
                            </p>
                          )}
                          {lead.notes && (
                            <p className="line-clamp-2 text-xs text-muted-foreground">
                              {lead.notes}
                            </p>
                          )}
                          <p className="text-[11px] text-muted-foreground">
                            {formatDateDisplay(lead.createdAt)}
                          </p>
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7"
                                disabled={idx === 0}
                                onClick={() => moveStage(lead.id, -1)}
                                aria-label="Move to previous stage">
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7"
                                disabled={idx === LEAD_STAGES.length - 1}
                                onClick={() => moveStage(lead.id, 1)}
                                aria-label="Move to next stage">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7"
                                onClick={() => startEdit(lead)}
                                aria-label="Edit lead">
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7"
                                onClick={() => deleteLead(lead.id, lead.name)}
                                aria-label="Delete lead">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
