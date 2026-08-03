"use client";

import * as React from "react";
import jsPDF from "jspdf";
import { ToWords } from "to-words";
import { Plus, Trash2, Save, Download, Users } from "lucide-react";

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
// Storage keys — everything lives in localStorage on this device only.
// ---------------------------------------------------------------------------
const STORAGE_KEYS = {
  business: "studio.invoice.business",
  clients: "studio.invoice.clients",
  draft: "studio.invoice.draft",
} as const;

const GOLD = "#D4AF37";
const GOLD_RGB: [number, number, number] = [212, 175, 55];
const DARK_RGB: [number, number, number] = [26, 26, 26];
const GRAY_RGB: [number, number, number] = [110, 110, 110];

interface LineItem {
  id: string;
  description: string;
  detail: string;
  amount: string;
}

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

interface InvoiceDraft {
  invoiceNo: string;
  invoiceDate: string;
  dueDate: string;
  projectId: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  lineItems: LineItem[];
  notes: string;
}

// Non-sensitive Kinstel Solutions defaults only. Bank/UPI details are never
// hardcoded — the user enters and saves those locally in the browser.
const DEFAULT_BUSINESS: BusinessDetails = {
  businessName: "Kinstel Solutions",
  address: "H. No. 33, Shivlok Colony, Vigyan Khand, Gomti Nagar, Nijampur Malhaur, Lucknow (U.P.) 226010",
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

const DEFAULT_TERMS =
  "1. Source code and project files are handed over to the client only after the invoice amount is cleared in full.\n" +
  "2. Hosting charges (if applicable) cover server/infrastructure costs only; content updates, feature changes, and bug fixes beyond the original scope are billed separately or covered under an active AMC (Annual Maintenance Contract).\n" +
  "3. Payment is due by the date mentioned above. Please quote the Invoice No. with your payment.";

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function emptyLineItem(): LineItem {
  return { id: makeId(), description: "", detail: "", amount: "" };
}

function defaultDraft(): InvoiceDraft {
  return {
    invoiceNo: "",
    invoiceDate: todayIso(),
    dueDate: "",
    projectId: "",
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    lineItems: [emptyLineItem()],
    notes: DEFAULT_TERMS,
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

export function InvoiceGenerator() {
  const { toast } = useToast();
  const [hydrated, setHydrated] = React.useState(false);

  const [business, setBusiness] = React.useState<BusinessDetails>(
    DEFAULT_BUSINESS,
  );
  const [clients, setClients] = React.useState<SavedClient[]>([]);
  const [draft, setDraft] = React.useState<InvoiceDraft>(defaultDraft());
  const [selectedClientId, setSelectedClientId] = React.useState<string>("");

  // Hydrate from localStorage on mount (client-only).
  React.useEffect(() => {
    setBusiness(loadJson(STORAGE_KEYS.business, DEFAULT_BUSINESS));
    setClients(loadJsonArray<SavedClient>(STORAGE_KEYS.clients));
    setDraft(loadJson(STORAGE_KEYS.draft, defaultDraft()));
    setHydrated(true);
  }, []);

  // Persist draft as the user types.
  React.useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(draft));
  }, [draft, hydrated]);

  const grandTotal = React.useMemo(() => {
    return draft.lineItems.reduce((sum, item) => {
      const value = parseFloat(item.amount);
      return sum + (Number.isFinite(value) ? value : 0);
    }, 0);
  }, [draft.lineItems]);

  const amountInWords = React.useMemo(() => {
    if (grandTotal <= 0) return "";
    try {
      const toWords = new ToWords({ localeCode: "en-IN" });
      return toWords.convert(Math.round(grandTotal * 100) / 100, {
        currency: true,
      });
    } catch {
      return "";
    }
  }, [grandTotal]);

  function updateDraft<K extends keyof InvoiceDraft>(
    key: K,
    value: InvoiceDraft[K],
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function updateLineItem(id: string, patch: Partial<LineItem>) {
    setDraft((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }));
  }

  function addLineItem() {
    setDraft((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, emptyLineItem()],
    }));
  }

  function removeLineItem(id: string) {
    setDraft((prev) => ({
      ...prev,
      lineItems:
        prev.lineItems.length > 1
          ? prev.lineItems.filter((item) => item.id !== id)
          : prev.lineItems,
    }));
  }

  function saveBusinessDetails() {
    window.localStorage.setItem(STORAGE_KEYS.business, JSON.stringify(business));
    toast({ title: "Business details saved to this device." });
  }

  function saveClient() {
    if (!draft.clientName.trim()) {
      toast({
        title: "Enter a client name before saving.",
        variant: "destructive",
      });
      return;
    }
    const newClient: SavedClient = {
      id: selectedClientId || makeId(),
      name: draft.clientName.trim(),
      address: draft.clientAddress.trim(),
      phone: draft.clientPhone.trim(),
    };
    setClients((prev) => {
      const withoutExisting = prev.filter((c) => c.id !== newClient.id);
      const next = [...withoutExisting, newClient];
      window.localStorage.setItem(STORAGE_KEYS.clients, JSON.stringify(next));
      return next;
    });
    setSelectedClientId(newClient.id);
    toast({ title: `Saved "${newClient.name}" to this device.` });
  }

  function loadClient(id: string) {
    setSelectedClientId(id);
    const client = clients.find((c) => c.id === id);
    if (!client) return;
    setDraft((prev) => ({
      ...prev,
      clientName: client.name,
      clientAddress: client.address,
      clientPhone: client.phone,
    }));
  }

  function generatePdf() {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    function ensureSpace(needed: number) {
      if (y + needed > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    }

    // Header — wordmark + INVOICE title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(...DARK_RGB);
    doc.text("KINSTEL", margin, y + 7);
    const kinstelWidth = doc.getTextWidth("KINSTEL ");
    doc.setTextColor(...GOLD_RGB);
    doc.text("SOLUTIONS", margin + kinstelWidth, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(...GRAY_RGB);
    doc.text("INVOICE", pageWidth - margin, y + 7, { align: "right" });

    y += 12;
    doc.setDrawColor(...GOLD_RGB);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Meta table — Billed By / Billed To (left) and invoice meta (right)
    const colWidth = contentWidth / 2 - 4;
    const leftX = margin;
    const rightX = margin + contentWidth / 2 + 4;
    const metaTop = y;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...GOLD_RGB);
    doc.text("BILLED BY", leftX, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...DARK_RGB);
    const billedByLines = [
      business.businessName || "Kinstel Solutions",
      ...doc.splitTextToSize(business.address || "", colWidth),
      business.email ? `Email: ${business.email}` : "",
      business.pan ? `PAN: ${business.pan}` : "",
    ].filter(Boolean);
    billedByLines.forEach((line) => {
      doc.text(line, leftX, y);
      y += 5;
    });

    let yRight = metaTop;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...GOLD_RGB);
    doc.text("INVOICE DETAILS", rightX, yRight);
    yRight += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...DARK_RGB);
    const metaRows: [string, string][] = [
      ["Invoice No.", draft.invoiceNo || "—"],
      ["Invoice Date", formatDateDisplay(draft.invoiceDate)],
      ["Due Date", formatDateDisplay(draft.dueDate)],
      ["Project ID", draft.projectId || "—"],
    ];
    metaRows.forEach(([label, value]) => {
      doc.setFont("helvetica", "normal");
      doc.text(`${label}:`, rightX, yRight);
      doc.setFont("helvetica", "bold");
      doc.text(value, rightX + 28, yRight);
      yRight += 5.5;
    });

    y = Math.max(y, yRight) + 4;

    // Billed To
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...GOLD_RGB);
    doc.text("BILLED TO", leftX, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...DARK_RGB);
    const billedToLines = [
      draft.clientName || "—",
      ...doc.splitTextToSize(draft.clientAddress || "", colWidth),
      draft.clientPhone ? `Phone: ${draft.clientPhone}` : "",
    ].filter(Boolean);
    billedToLines.forEach((line) => {
      doc.text(line, leftX, y);
      y += 5;
    });

    y += 6;

    // Line items table
    const descColWidth = contentWidth * 0.72;
    const amountColWidth = contentWidth * 0.28;
    const rowPadding = 3;

    function drawTableHeader() {
      doc.setFillColor(...GOLD_RGB);
      doc.rect(margin, y, contentWidth, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(...DARK_RGB);
      doc.text("SERVICE DESCRIPTION", margin + 3, y + 5.5);
      doc.text("AMOUNT (₹)", margin + contentWidth - 3, y + 5.5, {
        align: "right",
      });
      y += 8;
    }

    ensureSpace(20);
    drawTableHeader();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    draft.lineItems.forEach((item, index) => {
      if (!item.description.trim() && !item.amount.trim()) return;

      const descLines = doc.splitTextToSize(
        item.description || "—",
        descColWidth - 6,
      );
      const detailLines = item.detail
        ? doc.splitTextToSize(item.detail, descColWidth - 6)
        : [];
      const lineHeight = 5;
      const rowHeight =
        (descLines.length + detailLines.length) * lineHeight + rowPadding * 2;

      ensureSpace(rowHeight + 2);

      if (index % 2 === 1) {
        doc.setFillColor(247, 245, 238);
        doc.rect(margin, y, contentWidth, rowHeight, "F");
      }

      let rowY = y + rowPadding + 3.5;
      doc.setTextColor(...DARK_RGB);
      doc.setFont("helvetica", "normal");
      descLines.forEach((line: string) => {
        doc.text(line, margin + 3, rowY);
        rowY += lineHeight;
      });
      if (detailLines.length) {
        doc.setFontSize(8.5);
        doc.setTextColor(...GRAY_RGB);
        detailLines.forEach((line: string) => {
          doc.text(line, margin + 3, rowY);
          rowY += lineHeight;
        });
        doc.setFontSize(10);
        doc.setTextColor(...DARK_RGB);
      }

      const amountValue = parseFloat(item.amount);
      doc.text(
        Number.isFinite(amountValue) ? formatInr(amountValue) : "—",
        margin + contentWidth - 3,
        y + rowPadding + 3.5,
        { align: "right" },
      );

      y += rowHeight;
      doc.setDrawColor(230, 226, 214);
      doc.setLineWidth(0.2);
      doc.line(margin, y, margin + contentWidth, y);
    });

    y += 2;

    // Grand total
    ensureSpace(14);
    doc.setDrawColor(...GOLD_RGB);
    doc.setLineWidth(0.6);
    doc.line(margin, y, margin + contentWidth, y);
    y += 7;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...DARK_RGB);
    doc.text("GRAND TOTAL", margin, y);
    doc.text(`₹ ${formatInr(grandTotal)}`, margin + contentWidth - 3, y, {
      align: "right",
    });
    y += 8;

    if (amountInWords) {
      ensureSpace(12);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(...GRAY_RGB);
      const wordsLines = doc.splitTextToSize(
        `Amount in words: ${amountInWords}`,
        contentWidth,
      );
      wordsLines.forEach((line: string) => {
        doc.text(line, margin, y);
        y += 4.5;
      });
    }

    y += 6;

    // Payment methods
    ensureSpace(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...GOLD_RGB);
    doc.text("PAYMENT METHODS", margin, y);
    y += 6;

    const payColWidth = contentWidth / 2 - 4;
    const payLeftX = margin;
    const payRightX = margin + contentWidth / 2 + 4;
    const payTop = y;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...DARK_RGB);
    doc.text("Online", payLeftX, y);
    let payLeftY = y + 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const onlineLines = [
      business.payLink ? business.payLink : "—",
      `Enter Invoice No: ${draft.invoiceNo || "—"}`,
    ];
    onlineLines.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, payColWidth);
      wrapped.forEach((wLine: string) => {
        doc.text(wLine, payLeftX, payLeftY);
        payLeftY += 5;
      });
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Bank Transfer", payRightX, payTop);
    let payRightY = payTop + 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const bankLines = [
      business.bankAccountName
        ? `Account Name: ${business.bankAccountName}`
        : "",
      business.bankName ? `Bank: ${business.bankName}` : "",
      business.bankAccountNumber
        ? `Account No: ${business.bankAccountNumber}`
        : "",
      business.bankIfsc ? `IFSC: ${business.bankIfsc}` : "",
      business.upiId ? `UPI ID: ${business.upiId}` : "",
    ].filter(Boolean);
    if (bankLines.length === 0) {
      bankLines.push("— add bank/UPI details in Business Details —");
    }
    bankLines.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, payColWidth);
      wrapped.forEach((wLine: string) => {
        doc.text(wLine, payRightX, payRightY);
        payRightY += 5;
      });
    });

    y = Math.max(payLeftY, payRightY) + 6;

    // Terms
    if (draft.notes.trim()) {
      ensureSpace(16);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(...GOLD_RGB);
      doc.text("TERMS & CONDITIONS", margin, y);
      y += 5.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...DARK_RGB);
      const termsLines = doc.splitTextToSize(draft.notes, contentWidth);
      termsLines.forEach((line: string) => {
        ensureSpace(5);
        doc.text(line, margin, y);
        y += 4.5;
      });
      y += 6;
    }

    // Signature
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

    // Footer
    const footerY = pageHeight - margin + 5;
    doc.setDrawColor(...GOLD_RGB);
    doc.setLineWidth(0.4);
    doc.line(margin, footerY - 6, pageWidth - margin, footerY - 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...GRAY_RGB);
    const footerLine1 = business.registrations || "";
    const footerLine2 = business.email
      ? `${business.email}${business.payLink ? " · " + business.payLink : ""}`
      : "";
    doc.text(footerLine1, pageWidth / 2, footerY - 2, { align: "center" });
    doc.text(footerLine2, pageWidth / 2, footerY + 2, { align: "center" });

    const filename = `Kinstel-Invoice-${draft.invoiceNo || "draft"}.pdf`;
    doc.save(filename);
    toast({ title: "Invoice PDF downloaded." });
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
        {/* Invoice meta */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
            <CardDescription>
              Basic identifiers for this invoice.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="invoiceNo">Invoice No.</Label>
              <Input
                id="invoiceNo"
                value={draft.invoiceNo}
                onChange={(e) => updateDraft("invoiceNo", e.target.value)}
                placeholder="KS-2026-014"
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
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={draft.invoiceDate}
                onChange={(e) => updateDraft("invoiceDate", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={draft.dueDate}
                onChange={(e) => updateDraft("dueDate", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Billed To */}
        <Card>
          <CardHeader>
            <CardTitle>Billed To</CardTitle>
            <CardDescription>
              Load a saved client or enter details manually.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <div className="space-y-1.5">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={draft.clientName}
                onChange={(e) => updateDraft("clientName", e.target.value)}
                placeholder="Client / Company Name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="clientAddress">Address</Label>
              <Textarea
                id="clientAddress"
                value={draft.clientAddress}
                onChange={(e) => updateDraft("clientAddress", e.target.value)}
                placeholder="Billing address"
                rows={2}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="clientPhone">Phone</Label>
              <Input
                id="clientPhone"
                value={draft.clientPhone}
                onChange={(e) => updateDraft("clientPhone", e.target.value)}
                placeholder="+91 …"
              />
            </div>
            <Button variant="outline" size="sm" onClick={saveClient}>
              <Save className="h-4 w-4" />
              Save this client
            </Button>
          </CardContent>
        </Card>

        {/* Line items */}
        <Card>
          <CardHeader>
            <CardTitle>Line Items</CardTitle>
            <CardDescription>
              Add each billable service as a row.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {draft.lineItems.map((item, index) => (
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
                    onClick={() => removeLineItem(item.id)}
                    disabled={draft.lineItems.length === 1}
                    aria-label="Remove line item">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1.5">
                  <Label>Service Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) =>
                      updateLineItem(item.id, { description: e.target.value })
                    }
                    placeholder="e.g. Website Development — Phase 1"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Detail (optional)</Label>
                  <Input
                    value={item.detail}
                    onChange={(e) =>
                      updateLineItem(item.id, { detail: e.target.value })
                    }
                    placeholder="e.g. 5 pages, responsive design"
                  />
                </div>
                <div className="space-y-1.5 max-w-[200px]">
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    inputMode="decimal"
                    value={item.amount}
                    onChange={(e) =>
                      updateLineItem(item.id, { amount: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addLineItem}>
              <Plus className="h-4 w-4" />
              Add line item
            </Button>

            <div className="flex items-center justify-between border-t border-border/60 pt-4">
              <span className="text-lg font-semibold">Grand Total</span>
              <span
                className="text-lg font-bold"
                style={{ color: GOLD }}>
                ₹ {formatInr(grandTotal)}
              </span>
            </div>
            {amountInWords && (
              <p className="text-sm italic text-muted-foreground">
                {amountInWords}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Notes / Terms */}
        <Card>
          <CardHeader>
            <CardTitle>Notes / Terms</CardTitle>
            <CardDescription>
              Shown at the bottom of the invoice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={draft.notes}
              onChange={(e) => updateDraft("notes", e.target.value)}
              rows={5}
            />
          </CardContent>
        </Card>

        <Button size="lg" onClick={generatePdf} className="w-full sm:w-auto">
          <Download className="h-4 w-4" />
          Generate &amp; Download PDF
        </Button>
      </div>

      {/* Sidebar: business details + mini preview */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Business Details</CardTitle>
            <CardDescription>
              Saved locally on this device. Never leaves your browser.
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
              <Label htmlFor="bizPan">PAN</Label>
              <Input
                id="bizPan"
                value={business.pan}
                onChange={(e) =>
                  setBusiness((b) => ({ ...b, pan: e.target.value }))
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
              <Label htmlFor="bizPayLink">Pay Link</Label>
              <Input
                id="bizPayLink"
                value={business.payLink}
                onChange={(e) =>
                  setBusiness((b) => ({ ...b, payLink: e.target.value }))
                }
              />
            </div>

            <div className="border-t border-border/60 pt-4 space-y-4">
              <p className="text-sm font-semibold">
                Bank / UPI (kept local, not committed to source)
              </p>
              <div className="space-y-1.5">
                <Label htmlFor="bankAccountName">Account Name</Label>
                <Input
                  id="bankAccountName"
                  value={business.bankAccountName}
                  onChange={(e) =>
                    setBusiness((b) => ({
                      ...b,
                      bankAccountName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={business.bankName}
                  onChange={(e) =>
                    setBusiness((b) => ({ ...b, bankName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bankAccountNumber">Account Number</Label>
                <Input
                  id="bankAccountNumber"
                  value={business.bankAccountNumber}
                  onChange={(e) =>
                    setBusiness((b) => ({
                      ...b,
                      bankAccountNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bankIfsc">IFSC</Label>
                <Input
                  id="bankIfsc"
                  value={business.bankIfsc}
                  onChange={(e) =>
                    setBusiness((b) => ({ ...b, bankIfsc: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  value={business.upiId}
                  onChange={(e) =>
                    setBusiness((b) => ({ ...b, upiId: e.target.value }))
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
            </div>

            <Button size="sm" onClick={saveBusinessDetails} className="w-full">
              <Save className="h-4 w-4" />
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
                No saved clients yet. Fill in Billed To and click{" "}
                <em>Save this client</em>.
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
