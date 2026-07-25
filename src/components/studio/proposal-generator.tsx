"use client";

import * as React from "react";
import jsPDF from "jspdf";
import { Plus, Trash2, Download, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
// Storage keys — this tool shares the invoice tool's business + clients
// store so the two internal tools stay in sync. Only the proposal draft is
// unique to this tool. Everything lives in localStorage on this device only.
// ---------------------------------------------------------------------------
const STORAGE_KEYS = {
  business: "studio.invoice.business",
  clients: "studio.invoice.clients",
  draft: "studio.proposal.draft",
} as const;

const GOLD = "#D4AF37";
const GOLD_RGB: [number, number, number] = [212, 175, 55];
const DARK_RGB: [number, number, number] = [26, 26, 26];
const GRAY_RGB: [number, number, number] = [110, 110, 110];

interface BusinessDetails {
  businessName: string;
  address: string;
  email: string;
  pan: string;
  registrations: string;
  payLink: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankIfsc: string;
  upiId: string;
  signatureName: string;
}

interface SavedClient {
  id: string;
  name: string;
  address: string;
  phone: string;
}

interface Item {
  id: string;
  text: string;
}

interface ScopeSection {
  id: string;
  heading: string;
  bullets: Item[];
}

interface TimelinePhase {
  id: string;
  name: string;
  deliverable: string;
  timeline: string;
}

interface InvestmentItem {
  id: string;
  description: string;
  amount: string;
}

interface ProposalDraft {
  title: string;
  clientName: string;
  projectName: string;
  projectId: string;
  date: string;
  execSummary: string;
  objectives: Item[];
  scopeSections: ScopeSection[];
  techStack: string;
  timelinePhases: TimelinePhase[];
  investmentItems: InvestmentItem[];
  milestoneNote: string;
  terms: string;
  nextSteps: Item[];
  validity: string;
}

// Non-sensitive Kinstel Solutions defaults only. Bank/UPI details are never
// hardcoded — they are entered and saved locally in the browser (shared with
// the invoice tool).
const DEFAULT_BUSINESS: BusinessDetails = {
  businessName: "Kinstel Solutions",
  address: "33 Shivdham, Shivlok Colony, Malhaur, Lucknow (U.P.) 226010",
  email: "contact@kinstel.com",
  pan: "HLCPS8014Q",
  registrations:
    "Udyam UDYAM-UP-50-0230220 · IEC HLCPS8014Q · D-U-N-S 77-197-4415",
  payLink: "https://www.kinstel.com/pay",
  bankName: "",
  bankAccountName: "",
  bankAccountNumber: "",
  bankIfsc: "",
  upiId: "",
  signatureName: "",
};

const DEFAULT_OBJECTIVES = [
  "Build a modern, fast, and conversion-focused website",
  "Establish a scalable design system for future growth",
  "Improve organic search visibility and technical SEO",
];

const DEFAULT_SCOPE_SECTIONS: { heading: string; bullets: string[] }[] = [
  {
    heading: "Design & UX",
    bullets: [
      "Custom UI design aligned with brand identity",
      "Responsive layouts for mobile, tablet, and desktop",
    ],
  },
  {
    heading: "Development",
    bullets: [
      "Frontend build using the tech stack below",
      "CMS / content wiring for easy updates",
      "Performance optimisation and accessibility pass",
    ],
  },
  {
    heading: "Launch",
    bullets: [
      "QA across browsers and devices",
      "Deployment to production hosting",
      "Post-launch support window",
    ],
  },
];

const DEFAULT_TECH_STACK = "Next.js 16, React 19, TypeScript, Tailwind CSS";

const DEFAULT_TIMELINE: { name: string; deliverable: string; timeline: string }[] =
  [
    {
      name: "Discovery & Planning",
      deliverable: "Sitemap, wireframes, content plan",
      timeline: "Week 1",
    },
    {
      name: "Design",
      deliverable: "UI design for key pages",
      timeline: "Week 2–3",
    },
    {
      name: "Development",
      deliverable: "Fully built, responsive website",
      timeline: "Week 4–6",
    },
    {
      name: "QA & Launch",
      deliverable: "Tested, deployed live site",
      timeline: "Week 7",
    },
  ];

const DEFAULT_TERMS =
  "1. Any changes beyond the agreed scope of work will be quoted and billed separately.\n" +
  "2. Client is responsible for providing content (text, images, videos) required for the project.\n" +
  "3. Intellectual property rights transfer to the client only upon full and final payment.\n" +
  "4. Kinstel Solutions reserves the right to showcase the completed project in its portfolio and marketing materials.\n" +
  "5. Hosting and domain registration, if required, are quoted separately from this proposal.\n" +
  "6. This proposal includes up to 2 rounds of revisions on design/development deliverables.\n" +
  "7. Kinstel Solutions maintains a 24-hour response time for project communications.";

const DEFAULT_NEXT_STEPS = [
  "Review and approve this proposal",
  "Provide 50% advance payment to begin",
  "Share content, assets, and access required for the project",
  "We begin discovery and design",
];

const DEFAULT_VALIDITY = "15 days";

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function makeItems(values: string[]): Item[] {
  return values.map((text) => ({ id: makeId(), text }));
}

function emptyItem(): Item {
  return { id: makeId(), text: "" };
}

function emptyScopeSection(): ScopeSection {
  return { id: makeId(), heading: "", bullets: [emptyItem()] };
}

function emptyTimelinePhase(): TimelinePhase {
  return { id: makeId(), name: "", deliverable: "", timeline: "" };
}

function emptyInvestmentItem(): InvestmentItem {
  return { id: makeId(), description: "", amount: "" };
}

function defaultDraft(): ProposalDraft {
  return {
    title: "Website Development Proposal",
    clientName: "",
    projectName: "",
    projectId: "",
    date: todayIso(),
    execSummary: "",
    objectives: makeItems(DEFAULT_OBJECTIVES),
    scopeSections: DEFAULT_SCOPE_SECTIONS.map((section) => ({
      id: makeId(),
      heading: section.heading,
      bullets: makeItems(section.bullets),
    })),
    techStack: DEFAULT_TECH_STACK,
    timelinePhases: DEFAULT_TIMELINE.map((phase) => ({
      id: makeId(),
      ...phase,
    })),
    investmentItems: [emptyInvestmentItem()],
    milestoneNote: "",
    terms: DEFAULT_TERMS,
    nextSteps: makeItems(DEFAULT_NEXT_STEPS),
    validity: DEFAULT_VALIDITY,
  };
}

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return { ...fallback, ...parsed } as T;
  } catch {
    return fallback;
  }
}

function loadJsonArray<T>(key: string): T[] {
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

function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDateDisplay(iso: string): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ProposalGenerator() {
  const { toast } = useToast();
  const [hydrated, setHydrated] = React.useState(false);

  const [business, setBusiness] = React.useState<BusinessDetails>(
    DEFAULT_BUSINESS,
  );
  const [clients, setClients] = React.useState<SavedClient[]>([]);
  const [draft, setDraft] = React.useState<ProposalDraft>(defaultDraft());
  const [selectedClientId, setSelectedClientId] = React.useState<string>("");

  // Hydrate from localStorage on mount (client-only). Business + clients are
  // read from the invoice tool's shared store.
  React.useEffect(() => {
    setBusiness(loadJson(STORAGE_KEYS.business, DEFAULT_BUSINESS));
    setClients(loadJsonArray<SavedClient>(STORAGE_KEYS.clients));
    setDraft(loadJson(STORAGE_KEYS.draft, defaultDraft()));
    setHydrated(true);
  }, []);

  // Autosave the in-progress proposal.
  React.useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(draft));
  }, [draft, hydrated]);

  const investmentTotal = React.useMemo(() => {
    return draft.investmentItems.reduce((sum, item) => {
      const value = parseFloat(item.amount);
      return sum + (Number.isFinite(value) ? value : 0);
    }, 0);
  }, [draft.investmentItems]);

  function updateDraft<K extends keyof ProposalDraft>(
    key: K,
    value: ProposalDraft[K],
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function loadClient(id: string) {
    setSelectedClientId(id);
    const client = clients.find((c) => c.id === id);
    if (!client) return;
    updateDraft("clientName", client.name);
  }

  // --- Objectives -----------------------------------------------------
  function updateObjective(id: string, text: string) {
    setDraft((prev) => ({
      ...prev,
      objectives: prev.objectives.map((o) =>
        o.id === id ? { ...o, text } : o,
      ),
    }));
  }
  function addObjective() {
    setDraft((prev) => ({
      ...prev,
      objectives: [...prev.objectives, emptyItem()],
    }));
  }
  function removeObjective(id: string) {
    setDraft((prev) => ({
      ...prev,
      objectives:
        prev.objectives.length > 1
          ? prev.objectives.filter((o) => o.id !== id)
          : prev.objectives,
    }));
  }

  // --- Scope of work ----------------------------------------------------
  function updateScopeHeading(sectionId: string, heading: string) {
    setDraft((prev) => ({
      ...prev,
      scopeSections: prev.scopeSections.map((s) =>
        s.id === sectionId ? { ...s, heading } : s,
      ),
    }));
  }
  function addScopeSection() {
    setDraft((prev) => ({
      ...prev,
      scopeSections: [...prev.scopeSections, emptyScopeSection()],
    }));
  }
  function removeScopeSection(sectionId: string) {
    setDraft((prev) => ({
      ...prev,
      scopeSections:
        prev.scopeSections.length > 1
          ? prev.scopeSections.filter((s) => s.id !== sectionId)
          : prev.scopeSections,
    }));
  }
  function updateScopeBullet(sectionId: string, bulletId: string, text: string) {
    setDraft((prev) => ({
      ...prev,
      scopeSections: prev.scopeSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              bullets: s.bullets.map((b) =>
                b.id === bulletId ? { ...b, text } : b,
              ),
            }
          : s,
      ),
    }));
  }
  function addScopeBullet(sectionId: string) {
    setDraft((prev) => ({
      ...prev,
      scopeSections: prev.scopeSections.map((s) =>
        s.id === sectionId
          ? { ...s, bullets: [...s.bullets, emptyItem()] }
          : s,
      ),
    }));
  }
  function removeScopeBullet(sectionId: string, bulletId: string) {
    setDraft((prev) => ({
      ...prev,
      scopeSections: prev.scopeSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              bullets:
                s.bullets.length > 1
                  ? s.bullets.filter((b) => b.id !== bulletId)
                  : s.bullets,
            }
          : s,
      ),
    }));
  }

  // --- Timeline -----------------------------------------------------
  function updateTimelinePhase(id: string, patch: Partial<TimelinePhase>) {
    setDraft((prev) => ({
      ...prev,
      timelinePhases: prev.timelinePhases.map((p) =>
        p.id === id ? { ...p, ...patch } : p,
      ),
    }));
  }
  function addTimelinePhase() {
    setDraft((prev) => ({
      ...prev,
      timelinePhases: [...prev.timelinePhases, emptyTimelinePhase()],
    }));
  }
  function removeTimelinePhase(id: string) {
    setDraft((prev) => ({
      ...prev,
      timelinePhases:
        prev.timelinePhases.length > 1
          ? prev.timelinePhases.filter((p) => p.id !== id)
          : prev.timelinePhases,
    }));
  }

  // --- Investment -----------------------------------------------------
  function updateInvestmentItem(id: string, patch: Partial<InvestmentItem>) {
    setDraft((prev) => ({
      ...prev,
      investmentItems: prev.investmentItems.map((i) =>
        i.id === id ? { ...i, ...patch } : i,
      ),
    }));
  }
  function addInvestmentItem() {
    setDraft((prev) => ({
      ...prev,
      investmentItems: [...prev.investmentItems, emptyInvestmentItem()],
    }));
  }
  function removeInvestmentItem(id: string) {
    setDraft((prev) => ({
      ...prev,
      investmentItems:
        prev.investmentItems.length > 1
          ? prev.investmentItems.filter((i) => i.id !== id)
          : prev.investmentItems,
    }));
  }

  // --- Next steps -----------------------------------------------------
  function updateNextStep(id: string, text: string) {
    setDraft((prev) => ({
      ...prev,
      nextSteps: prev.nextSteps.map((s) => (s.id === id ? { ...s, text } : s)),
    }));
  }
  function addNextStep() {
    setDraft((prev) => ({
      ...prev,
      nextSteps: [...prev.nextSteps, emptyItem()],
    }));
  }
  function removeNextStep(id: string) {
    setDraft((prev) => ({
      ...prev,
      nextSteps:
        prev.nextSteps.length > 1
          ? prev.nextSteps.filter((s) => s.id !== id)
          : prev.nextSteps,
    }));
  }

  // -----------------------------------------------------------------
  // PDF generation
  // -----------------------------------------------------------------
  function generatePdf() {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    // Tracks the y-cursor and starts a fresh page whenever the next block
    // would overflow the page height — this is what makes the proposal a
    // clean, page-break-safe multi-page PDF regardless of content length.
    function ensureSpace(needed: number) {
      if (y + needed > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    }

    function sectionTitle(text: string) {
      ensureSpace(16);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...GOLD_RGB);
      doc.text(text.toUpperCase(), margin, y);
      y += 3;
      doc.setDrawColor(...GOLD_RGB);
      doc.setLineWidth(0.6);
      doc.line(margin, y, margin + 26, y);
      y += 7;
    }

    function paragraph(text: string, size = 10, color = DARK_RGB) {
      if (!text.trim()) return;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, contentWidth);
      lines.forEach((line: string) => {
        ensureSpace(5.5);
        doc.text(line, margin, y);
        y += 5.5;
      });
    }

    function bulletList(items: string[], indent = 4) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...DARK_RGB);
      items.forEach((raw) => {
        const text = raw.trim();
        if (!text) return;
        const lines = doc.splitTextToSize(text, contentWidth - indent - 4);
        ensureSpace(lines.length * 5.2 + 1);
        doc.setTextColor(...GOLD_RGB);
        doc.text("•", margin + indent, y);
        doc.setTextColor(...DARK_RGB);
        lines.forEach((line: string, idx: number) => {
          doc.text(line, margin + indent + 5, y + idx * 5.2);
        });
        y += lines.length * 5.2 + 1;
      });
    }

    function numberedList(items: string[], indent = 4) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      let n = 1;
      items.forEach((raw) => {
        const text = raw.trim();
        if (!text) return;
        const lines = doc.splitTextToSize(text, contentWidth - indent - 8);
        ensureSpace(lines.length * 5.2 + 1);
        doc.setTextColor(...GOLD_RGB);
        doc.setFont("helvetica", "bold");
        doc.text(`${n}.`, margin + indent, y);
        doc.setTextColor(...DARK_RGB);
        doc.setFont("helvetica", "normal");
        lines.forEach((line: string, idx: number) => {
          doc.text(line, margin + indent + 7, y + idx * 5.2);
        });
        y += lines.length * 5.2 + 1;
        n += 1;
      });
    }

    function footer() {
      const footerY = pageHeight - margin + 5;
      doc.setDrawColor(...GOLD_RGB);
      doc.setLineWidth(0.4);
      doc.line(margin, footerY - 6, pageWidth - margin, footerY - 6);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...GRAY_RGB);
      const line1 = business.registrations || "";
      const line2 = business.email
        ? `${business.email}${business.payLink ? " · " + business.payLink : ""}`
        : "";
      doc.text(line1, pageWidth / 2, footerY - 2, { align: "center" });
      doc.text(line2, pageWidth / 2, footerY + 2, { align: "center" });
    }

    // -------------------------------------------------------------
    // Cover page
    // -------------------------------------------------------------
    let cy = 55;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(...DARK_RGB);
    const kinstelWidth = doc.getTextWidth("KINSTEL ");
    const wordmarkWidth = kinstelWidth + doc.getTextWidth("SOLUTIONS");
    const wordmarkX = (pageWidth - wordmarkWidth) / 2;
    doc.text("KINSTEL", wordmarkX, cy);
    doc.setTextColor(...GOLD_RGB);
    doc.text("SOLUTIONS", wordmarkX + kinstelWidth, cy);

    cy += 10;
    doc.setDrawColor(...GOLD_RGB);
    doc.setLineWidth(0.8);
    doc.line(pageWidth / 2 - 20, cy, pageWidth / 2 + 20, cy);

    cy += 30;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...DARK_RGB);
    const titleLines = doc.splitTextToSize(
      draft.title || "Website Development Proposal",
      contentWidth - 20,
    );
    titleLines.forEach((line: string) => {
      doc.text(line, pageWidth / 2, cy, { align: "center" });
      cy += 10;
    });

    cy += 20;
    const coverRows: [string, string][] = [
      ["Prepared For", draft.clientName || "—"],
      ["Project", draft.projectName || "—"],
      ["Project ID", draft.projectId || "—"],
      ["Date", formatDateDisplay(draft.date)],
      ["Proposal Valid For", draft.validity || "—"],
    ];
    doc.setFontSize(11);
    coverRows.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...GOLD_RGB);
      doc.text(`${label}:`, pageWidth / 2 - 45, cy);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...DARK_RGB);
      doc.text(value, pageWidth / 2 - 10, cy);
      cy += 8;
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...GRAY_RGB);
    doc.text(
      business.businessName || "Kinstel Solutions",
      pageWidth / 2,
      pageHeight - margin - 14,
      { align: "center" },
    );
    footer();

    // -------------------------------------------------------------
    // Content pages
    // -------------------------------------------------------------
    doc.addPage();
    y = margin;

    // Executive Summary
    if (draft.execSummary.trim()) {
      sectionTitle("Executive Summary");
      paragraph(draft.execSummary);
      y += 6;
    }

    // Objectives
    const objectives = draft.objectives.map((o) => o.text).filter((t) => t.trim());
    if (objectives.length) {
      sectionTitle("Objectives");
      bulletList(objectives);
      y += 6;
    }

    // Scope of Work
    const scopeSections = draft.scopeSections.filter(
      (s) => s.heading.trim() || s.bullets.some((b) => b.text.trim()),
    );
    if (scopeSections.length) {
      sectionTitle("Scope of Work");
      scopeSections.forEach((section) => {
        if (section.heading.trim()) {
          ensureSpace(9);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(...DARK_RGB);
          doc.text(section.heading, margin, y);
          y += 6;
        }
        bulletList(section.bullets.map((b) => b.text));
        y += 3;
      });
      y += 3;
    }

    // Tech Stack
    if (draft.techStack.trim()) {
      sectionTitle("Tech Stack");
      paragraph(draft.techStack);
      y += 6;
    }

    // Timeline
    const timelinePhases = draft.timelinePhases.filter(
      (p) => p.name.trim() || p.deliverable.trim() || p.timeline.trim(),
    );
    if (timelinePhases.length) {
      sectionTitle("Timeline");
      const colPhase = contentWidth * 0.28;
      const colDeliverable = contentWidth * 0.48;
      const colTimeline = contentWidth * 0.24;

      function timelineHeader() {
        doc.setFillColor(...GOLD_RGB);
        doc.rect(margin, y, contentWidth, 8, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...DARK_RGB);
        doc.text("PHASE", margin + 3, y + 5.5);
        doc.text("DELIVERABLE", margin + colPhase + 3, y + 5.5);
        doc.text("TIMELINE", margin + colPhase + colDeliverable + 3, y + 5.5);
        y += 8;
      }

      ensureSpace(18);
      timelineHeader();

      timelinePhases.forEach((phase, index) => {
        const nameLines = doc.splitTextToSize(phase.name || "—", colPhase - 6);
        const deliverableLines = doc.splitTextToSize(
          phase.deliverable || "—",
          colDeliverable - 6,
        );
        const timelineLines = doc.splitTextToSize(
          phase.timeline || "—",
          colTimeline - 6,
        );
        const rowLines = Math.max(
          nameLines.length,
          deliverableLines.length,
          timelineLines.length,
        );
        const rowHeight = rowLines * 5 + 6;

        ensureSpace(rowHeight + 2);
        if (y === margin) {
          // Fresh page started mid-table — repeat the header row.
          timelineHeader();
        }
        if (index % 2 === 1) {
          doc.setFillColor(247, 245, 238);
          doc.rect(margin, y, contentWidth, rowHeight, "F");
        }

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(...DARK_RGB);
        nameLines.forEach((line: string, i: number) =>
          doc.text(line, margin + 3, y + 5 + i * 5),
        );
        deliverableLines.forEach((line: string, i: number) =>
          doc.text(line, margin + colPhase + 3, y + 5 + i * 5),
        );
        timelineLines.forEach((line: string, i: number) =>
          doc.text(line, margin + colPhase + colDeliverable + 3, y + 5 + i * 5),
        );

        y += rowHeight;
        doc.setDrawColor(230, 226, 214);
        doc.setLineWidth(0.2);
        doc.line(margin, y, margin + contentWidth, y);
      });
      y += 8;
    }

    // Investment
    const investmentItems = draft.investmentItems.filter(
      (i) => i.description.trim() || i.amount.trim(),
    );
    if (investmentItems.length) {
      sectionTitle("Investment Breakdown");
      const descColWidth = contentWidth * 0.72;

      function investmentHeader() {
        doc.setFillColor(...GOLD_RGB);
        doc.rect(margin, y, contentWidth, 8, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(...DARK_RGB);
        doc.text("DESCRIPTION", margin + 3, y + 5.5);
        doc.text("AMOUNT (₹)", margin + contentWidth - 3, y + 5.5, {
          align: "right",
        });
        y += 8;
      }

      ensureSpace(20);
      investmentHeader();

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      investmentItems.forEach((item, index) => {
        const descLines = doc.splitTextToSize(
          item.description || "—",
          descColWidth - 6,
        );
        const rowHeight = descLines.length * 5 + 6;

        ensureSpace(rowHeight + 2);
        if (y === margin) {
          investmentHeader();
        }
        if (index % 2 === 1) {
          doc.setFillColor(247, 245, 238);
          doc.rect(margin, y, contentWidth, rowHeight, "F");
        }

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(...DARK_RGB);
        descLines.forEach((line: string, i: number) =>
          doc.text(line, margin + 3, y + 5 + i * 5),
        );
        const amountValue = parseFloat(item.amount);
        doc.text(
          Number.isFinite(amountValue) ? formatInr(amountValue) : "—",
          margin + contentWidth - 3,
          y + 5,
          { align: "right" },
        );

        y += rowHeight;
        doc.setDrawColor(230, 226, 214);
        doc.setLineWidth(0.2);
        doc.line(margin, y, margin + contentWidth, y);
      });

      ensureSpace(14);
      y += 2;
      doc.setDrawColor(...GOLD_RGB);
      doc.setLineWidth(0.6);
      doc.line(margin, y, margin + contentWidth, y);
      y += 7;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...DARK_RGB);
      doc.text("TOTAL INVESTMENT", margin, y);
      doc.text(`₹ ${formatInr(investmentTotal)}`, margin + contentWidth - 3, y, {
        align: "right",
      });
      y += 8;

      if (draft.milestoneNote.trim()) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.setTextColor(...GRAY_RGB);
        const noteLines = doc.splitTextToSize(draft.milestoneNote, contentWidth);
        noteLines.forEach((line: string) => {
          ensureSpace(5);
          doc.text(line, margin, y);
          y += 4.5;
        });
      }
      y += 6;
    }

    // Terms & Conditions
    if (draft.terms.trim()) {
      sectionTitle("Terms & Conditions");
      const termLines = draft.terms
        .split("\n")
        .map((l) => l.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean);
      numberedList(termLines);
      y += 6;
    }

    // Next Steps
    const nextSteps = draft.nextSteps.map((s) => s.text).filter((t) => t.trim());
    if (nextSteps.length) {
      sectionTitle("Next Steps");
      numberedList(nextSteps);
      y += 6;
    }

    // Signature block
    ensureSpace(24);
    const sigX = pageWidth - margin - 55;
    doc.setDrawColor(...GRAY_RGB);
    doc.setLineWidth(0.3);
    doc.line(sigX, y, pageWidth - margin, y);
    y += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...DARK_RGB);
    doc.text(business.signatureName || "Authorized Signatory", sigX, y);
    y += 4.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GRAY_RGB);
    doc.text("Authorized Signatory, Kinstel Solutions", sigX, y);

    footer();

    // Add the shared footer to every content page (cover + this last page
    // already have one; back-fill any pages in between).
    const pageCount = doc.getNumberOfPages();
    for (let p = 2; p <= pageCount - 1; p += 1) {
      doc.setPage(p);
      footer();
    }

    const filenameSlug =
      draft.projectName.trim() || draft.clientName.trim() || "draft";
    const filename = `Kinstel-Proposal-${filenameSlug.replace(/[^a-z0-9]+/gi, "-")}.pdf`;
    doc.save(filename);
    toast({ title: "Proposal PDF downloaded." });
  }

  if (!hydrated) {
    return (
      <div className="text-center text-muted-foreground py-12">
        Loading…
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-8">
        {/* Cover details */}
        <Card>
          <CardHeader>
            <CardTitle>Cover</CardTitle>
            <CardDescription>
              Shown on the proposal's title page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Proposal Title</Label>
              <Input
                id="title"
                value={draft.title}
                onChange={(e) => updateDraft("title", e.target.value)}
              />
            </div>

            {clients.length > 0 && (
              <div className="space-y-1.5">
                <Label>Load saved client</Label>
                <Select value={selectedClientId} onValueChange={loadClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a saved client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="clientName">Client / Company Name</Label>
                <Input
                  id="clientName"
                  value={draft.clientName}
                  onChange={(e) => updateDraft("clientName", e.target.value)}
                  placeholder="Client / Company Name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={draft.projectName}
                  onChange={(e) => updateDraft("projectName", e.target.value)}
                  placeholder="e.g. Corporate Website Revamp"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="projectId">Project ID</Label>
                <Input
                  id="projectId"
                  value={draft.projectId}
                  onChange={(e) => updateDraft("projectId", e.target.value)}
                  placeholder="PRJ-0042"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={draft.date}
                  onChange={(e) => updateDraft("date", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="validity">Proposal Valid For</Label>
                <Input
                  id="validity"
                  value={draft.validity}
                  onChange={(e) => updateDraft("validity", e.target.value)}
                  placeholder="15 days"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Executive Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
            <CardDescription>
              A short overview of the project and why it matters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={draft.execSummary}
              onChange={(e) => updateDraft("execSummary", e.target.value)}
              rows={5}
              placeholder="Kinstel Solutions proposes to design and develop…"
            />
          </CardContent>
        </Card>

        {/* Objectives */}
        <Card>
          <CardHeader>
            <CardTitle>Objectives</CardTitle>
            <CardDescription>Key goals for this project.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {draft.objectives.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                <Input
                  value={item.text}
                  onChange={(e) => updateObjective(item.id, e.target.value)}
                  placeholder={`Objective ${index + 1}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeObjective(item.id)}
                  disabled={draft.objectives.length === 1}
                  aria-label="Remove objective">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addObjective}>
              <Plus className="h-4 w-4" />
              Add objective
            </Button>
          </CardContent>
        </Card>

        {/* Scope of Work */}
        <Card>
          <CardHeader>
            <CardTitle>Scope of Work</CardTitle>
            <CardDescription>
              Group deliverables into sections with bullet points.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {draft.scopeSections.map((section, sIndex) => (
              <div
                key={section.id}
                className="rounded-lg border border-border/60 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Input
                    value={section.heading}
                    onChange={(e) =>
                      updateScopeHeading(section.id, e.target.value)
                    }
                    placeholder={`Section ${sIndex + 1} heading (e.g. Design & UX)`}
                    className="font-medium"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeScopeSection(section.id)}
                    disabled={draft.scopeSections.length === 1}
                    aria-label="Remove section">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 pl-2">
                  {section.bullets.map((bullet, bIndex) => (
                    <div key={bullet.id} className="flex items-center gap-2">
                      <Input
                        value={bullet.text}
                        onChange={(e) =>
                          updateScopeBullet(
                            section.id,
                            bullet.id,
                            e.target.value,
                          )
                        }
                        placeholder={`Bullet ${bIndex + 1}`}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeScopeBullet(section.id, bullet.id)}
                        disabled={section.bullets.length === 1}
                        aria-label="Remove bullet">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addScopeBullet(section.id)}>
                    <Plus className="h-4 w-4" />
                    Add bullet
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addScopeSection}>
              <Plus className="h-4 w-4" />
              Add section
            </Button>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={draft.techStack}
              onChange={(e) => updateDraft("techStack", e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>Project phases and deliverables.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {draft.timelinePhases.map((phase, index) => (
              <div
                key={phase.id}
                className="rounded-lg border border-border/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Phase {index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTimelinePhase(phase.id)}
                    disabled={draft.timelinePhases.length === 1}
                    aria-label="Remove phase">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1.5">
                  <Label>Phase Name</Label>
                  <Input
                    value={phase.name}
                    onChange={(e) =>
                      updateTimelinePhase(phase.id, { name: e.target.value })
                    }
                    placeholder="e.g. Design"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Deliverable</Label>
                  <Input
                    value={phase.deliverable}
                    onChange={(e) =>
                      updateTimelinePhase(phase.id, {
                        deliverable: e.target.value,
                      })
                    }
                    placeholder="e.g. UI design for key pages"
                  />
                </div>
                <div className="space-y-1.5 max-w-[200px]">
                  <Label>Timeline</Label>
                  <Input
                    value={phase.timeline}
                    onChange={(e) =>
                      updateTimelinePhase(phase.id, {
                        timeline: e.target.value,
                      })
                    }
                    placeholder="e.g. Week 2–3"
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addTimelinePhase}>
              <Plus className="h-4 w-4" />
              Add phase
            </Button>
          </CardContent>
        </Card>

        {/* Investment */}
        <Card>
          <CardHeader>
            <CardTitle>Investment</CardTitle>
            <CardDescription>
              Line items and total for this proposal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {draft.investmentItems.map((item, index) => (
              <div
                key={item.id}
                className="rounded-lg border border-border/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Item {index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeInvestmentItem(item.id)}
                    disabled={draft.investmentItems.length === 1}
                    aria-label="Remove line item">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) =>
                      updateInvestmentItem(item.id, {
                        description: e.target.value,
                      })
                    }
                    placeholder="e.g. Website Development"
                  />
                </div>
                <div className="space-y-1.5 max-w-[200px]">
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    inputMode="decimal"
                    value={item.amount}
                    onChange={(e) =>
                      updateInvestmentItem(item.id, { amount: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addInvestmentItem}>
              <Plus className="h-4 w-4" />
              Add line item
            </Button>

            <div className="flex items-center justify-between border-t border-border/60 pt-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-bold" style={{ color: GOLD }}>
                ₹ {formatInr(investmentTotal)}
              </span>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="milestoneNote">Milestone note (optional)</Label>
              <Input
                id="milestoneNote"
                value={draft.milestoneNote}
                onChange={(e) => updateDraft("milestoneNote", e.target.value)}
                placeholder="e.g. 50% advance, 50% on delivery"
              />
            </div>
          </CardContent>
        </Card>

        {/* Terms & Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Terms &amp; Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={draft.terms}
              onChange={(e) => updateDraft("terms", e.target.value)}
              rows={7}
            />
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {draft.nextSteps.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                <Input
                  value={item.text}
                  onChange={(e) => updateNextStep(item.id, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeNextStep(item.id)}
                  disabled={draft.nextSteps.length === 1}
                  aria-label="Remove step">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addNextStep}>
              <Plus className="h-4 w-4" />
              Add step
            </Button>
          </CardContent>
        </Card>

        <Button size="lg" onClick={generatePdf} className="w-full sm:w-auto">
          <Download className="h-4 w-4" />
          Generate &amp; Download PDF
        </Button>
      </div>

      {/* Sidebar: business (shared) + saved clients (shared) */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Business Details</CardTitle>
            <CardDescription>
              Shared with the Invoice Generator. Saved locally on this device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="bizName">Business Name</Label>
              <Input
                id="bizName"
                value={business.businessName}
                onChange={(e) =>
                  setBusiness((b) => ({ ...b, businessName: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bizAddress">Address</Label>
              <Textarea
                id="bizAddress"
                value={business.address}
                onChange={(e) =>
                  setBusiness((b) => ({ ...b, address: e.target.value }))
                }
                rows={2}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bizEmail">Email</Label>
              <Input
                id="bizEmail"
                value={business.email}
                onChange={(e) =>
                  setBusiness((b) => ({ ...b, email: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bizRegistrations">Registrations</Label>
              <Input
                id="bizRegistrations"
                value={business.registrations}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    registrations: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signatureName">Signature Name</Label>
              <Input
                id="signatureName"
                value={business.signatureName}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    signatureName: e.target.value,
                  }))
                }
                placeholder="e.g. Alex Rathore"
              />
            </div>
            <Button
              size="sm"
              onClick={() => {
                window.localStorage.setItem(
                  STORAGE_KEYS.business,
                  JSON.stringify(business),
                );
                toast({ title: "Business details saved to this device." });
              }}
              className="w-full">
              Save Business Details
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-accent" />
              Saved Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            {clients.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No saved clients yet. Save one from the Invoice Generator to
                load it here.
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {clients.map((client) => (
                  <li
                    key={client.id}
                    className="flex items-center justify-between gap-2 rounded-md border border-border/60 px-3 py-2">
                    <span className="truncate">{client.name}</span>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0"
                      onClick={() => loadClient(client.id)}>
                      Load
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
