"use client";

import * as React from "react";
import { Download, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// ---------------------------------------------------------------------------
// Backup & restore for Kinstel Studio — reads/writes ONLY these known
// localStorage keys, all client-side. Nothing is sent to a server.
// ---------------------------------------------------------------------------
const BACKUP_KEYS = [
  "studio.invoice.business",
  "studio.invoice.clients",
  "studio.invoice.draft",
  "studio.proposal.draft",
  "studio.leads",
  "studio.retainers",
] as const;

type BackupKey = (typeof BACKUP_KEYS)[number];

const BACKUP_VERSION = 1;

interface BackupFile {
  version: number;
  exportedAt: string;
  data: Partial<Record<BackupKey, unknown>>;
}

function isBackupKey(key: string): key is BackupKey {
  return (BACKUP_KEYS as readonly string[]).includes(key);
}

function formatDateStamp(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

export function StudioBackup() {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = React.useState(false);

  function handleExport() {
    if (typeof window === "undefined") return;

    const data: Partial<Record<BackupKey, unknown>> = {};
    for (const key of BACKUP_KEYS) {
      const raw = window.localStorage.getItem(key);
      if (raw === null) continue;
      try {
        data[key] = JSON.parse(raw);
      } catch {
        // Not valid JSON — keep the raw string as-is.
        data[key] = raw;
      }
    }

    const backup: BackupFile = {
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      data,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kinstel-studio-backup-${formatDateStamp(new Date())}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast({ title: "Studio backup downloaded." });
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Allow re-selecting the same file later.
    e.target.value = "";
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch {
        toast({
          title: "Invalid backup file.",
          description: "That file isn't valid JSON.",
          variant: "destructive",
        });
        return;
      }

      if (
        typeof parsed !== "object" ||
        parsed === null ||
        !("data" in parsed) ||
        typeof (parsed as { data: unknown }).data !== "object" ||
        (parsed as { data: unknown }).data === null
      ) {
        toast({
          title: "Invalid backup file.",
          description: "This doesn't look like a Kinstel Studio backup.",
          variant: "destructive",
        });
        return;
      }

      const data = (parsed as BackupFile).data;
      const keysToRestore = Object.keys(data).filter(isBackupKey);

      if (keysToRestore.length === 0) {
        toast({
          title: "Nothing to restore.",
          description: "No known Studio data found in that file.",
          variant: "destructive",
        });
        return;
      }

      const confirmed = window.confirm(
        "This will overwrite your current Studio data on this device. Continue?",
      );
      if (!confirmed) return;

      for (const key of keysToRestore) {
        const value = data[key];
        const serialized =
          typeof value === "string" ? value : JSON.stringify(value);
        window.localStorage.setItem(key, serialized);
      }

      toast({
        title: "Studio data restored.",
        description: "Reloading to apply the restored data…",
      });
      window.location.reload();
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Data &amp; Backup</CardTitle>
        <CardDescription>
          Export all Studio data (business profile, clients, drafts, leads,
          and retainers) to a JSON file, or restore from a previous export.
          Everything stays on this device.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Export Backup
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleImportClick}
          disabled={isImporting}>
          <Upload className="h-4 w-4" />
          {isImporting ? "Importing…" : "Import Backup"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleFileChange}
        />
      </CardContent>
    </Card>
  );
}
