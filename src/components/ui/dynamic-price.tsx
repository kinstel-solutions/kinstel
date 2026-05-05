"use client";

import { useEffect, useState } from "react";

interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number;
  fractionTerm: string;
}

const REGION_MAP: Record<string, CurrencyConfig> = {
  US: { code: "USD", symbol: "$", rate: 0.0165, fractionTerm: "cent" },
  GB: { code: "GBP", symbol: "£", rate: 0.0135, fractionTerm: "penny" },
  AU: { code: "AUD", symbol: "A$", rate: 0.0265, fractionTerm: "cent" },
  CA: { code: "CAD", symbol: "C$", rate: 0.0235, fractionTerm: "cent" },
  IN: { code: "INR", symbol: "₹", rate: 1, fractionTerm: "rupee" },
};

function detectRegion(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes("London") || tz.includes("Belfast")) return "GB";
    if (tz.includes("Australia")) return "AU";
    if (tz.includes("Calcutta") || tz.includes("Kolkata")) return "IN";
    if (
      tz.includes("Toronto") ||
      tz.includes("Vancouver") ||
      tz.includes("Edmonton") ||
      tz.includes("Winnipeg") ||
      tz.includes("Halifax") ||
      tz.includes("St_Johns")
    ) {
      return "CA";
    }
    if (tz.startsWith("America/")) return "US";
  } catch (e) {
    // Fallback if Intl API fails
  }
  return "US";
}

export function useCurrency() {
  const [region, setRegion] = useState<string>("US");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRegion(detectRegion());
    setMounted(true);
  }, []);

  const config = REGION_MAP[region] || REGION_MAP["US"];
  const isDefault = region === "US";
  return { mounted, config, isDefault };
}

export function DynamicPrice({ amount }: { amount: number }) {
  const { mounted, config, isDefault } = useCurrency();

  // SSR / Loading state: Show USD by default to avoid empty space
  if (!mounted) {
    const usdVal = Math.round(amount * REGION_MAP["US"].rate);
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(usdVal);
    
    return <span>{formatted}</span>;
  }

  const convertedAmount = Math.round(amount * config.rate);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: config.code,
    maximumFractionDigits: 0,
  }).format(convertedAmount);

  // Only animate if we actually changed from the default USD
  return <span className={isDefault ? "" : "animate-in fade-in duration-500"}>
    {formatted}
  </span>;
}

export function DynamicTerm({ type }: { type: "currency-fraction" }) {
  const { mounted, config, isDefault } = useCurrency();

  if (!mounted) {
    return <span>cent</span>;
  }

  if (type === "currency-fraction") {
    return <span className={isDefault ? "" : "animate-in fade-in duration-500"}>
      {config.fractionTerm}
    </span>;
  }

  return null;
}
