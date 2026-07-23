// src/lib/quote-pricing.ts
//
// À-la-carte pricing map used to compute a soft "starting from" range for the
// Quote Builder tool. These numbers are honest and used for the real
// calculation, but the UI must NEVER render this map or any line item to the
// client — only the computed {low, high} range. This keeps pricing simple
// upfront while leaving room to tailor the real quote on a call.

export type WebsiteSize = "landing" | "small" | "standard" | "large";

export type AddOnKey =
  | "logo"
  | "blog"
  | "form"
  | "ecommerce"
  | "animations"
  | "video"
  | "seo"
  | "hosting";

export const sizeBase: Record<WebsiteSize, number> = {
  landing: 8000,
  small: 18000,
  standard: 30000,
  large: 45000,
};

export const sizeLabels: Record<WebsiteSize, string> = {
  landing: "Landing page",
  small: "Small (3–5 pages)",
  standard: "Standard (6–10 pages)",
  large: "Large (10+ pages)",
};

export const addOnPrices: Record<AddOnKey, number> = {
  logo: 8000,
  blog: 6000,
  form: 8000,
  ecommerce: 15000,
  animations: 3000,
  video: 5000,
  seo: 5500,
  hosting: 4000,
};

export const addOnLabels: Record<AddOnKey, string> = {
  logo: "Logo & branding",
  blog: "Blog",
  form: "Booking / enquiry form",
  ecommerce: "E-commerce",
  animations: "Custom animations",
  video: "Video",
  seo: "SEO setup",
  hosting: "Hosting",
};

export const RUSH_MULTIPLIER = 1.25;

function roundToNearest(value: number, nearest: number) {
  return Math.round(value / nearest) * nearest;
}

export interface QuoteRange {
  low: number;
  high: number;
}

/**
 * Computes a soft "starting from" range for a website build. The full
 * itemized breakdown is intentionally never surfaced to the client — only
 * the resulting low/high range should be rendered in the UI.
 */
export function estimateRange(
  size: WebsiteSize,
  selectedAddOns: AddOnKey[],
  rush: boolean,
): QuoteRange {
  let subtotal =
    sizeBase[size] +
    selectedAddOns.reduce((sum, key) => sum + (addOnPrices[key] ?? 0), 0);

  if (rush) {
    subtotal *= RUSH_MULTIPLIER;
  }

  const low = roundToNearest(subtotal, 1000);
  const high = roundToNearest(subtotal * 1.3, 1000);

  return { low, high };
}

export function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}
