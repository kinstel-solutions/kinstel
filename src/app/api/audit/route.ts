import { NextRequest, NextResponse } from "next/server";

// This route calls out to Google's PageSpeed Insights API, which can take
// 10-20s to respond. Give it room to run on platforms that support it.
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const FETCH_TIMEOUT_MS = 45000;

type CategoryKey = "performance" | "seo" | "accessibility" | "best-practices";

interface AuditReport {
  url: string;
  scores: {
    performance: number | null;
    seo: number | null;
    accessibility: number | null;
    bestPractices: number | null;
  };
  vitals: {
    lcp: string | null;
    cls: string | null;
    tbt: string | null;
    fcp: string | null;
  };
  opportunities: { title: string; description: string }[];
  fetchedAt: string;
}

/**
 * Normalizes user-entered input into a well-formed, plausible website URL.
 * Prepends https:// when no protocol is present and rejects obviously
 * invalid input (no dot / not a real-looking hostname).
 */
function normalizeUrl(input: string): string | null {
  if (!input || typeof input !== "string") return null;
  let value = input.trim();
  if (!value) return null;

  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value}`;
  }

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return null;
  }

  const hostname = parsed.hostname.toLowerCase();
  const isLocalhost = hostname === "localhost";
  const looksLikeDomain = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(
    hostname,
  );

  if (!isLocalhost && !looksLikeDomain) {
    return null;
  }

  return parsed.toString();
}

function categoryScore(categories: any, key: CategoryKey): number | null {
  const score = categories?.[key]?.score;
  if (typeof score !== "number") return null;
  return Math.round(score * 100);
}

function auditDisplayValue(audits: any, id: string): string | null {
  const audit = audits?.[id];
  if (!audit) return null;
  return audit.displayValue ?? null;
}

/**
 * Collects the top failing/opportunity audits across all Lighthouse
 * categories, ranked by how much they weigh into their category score.
 */
function getTopOpportunities(lighthouseResult: any, limit = 5) {
  const categories = lighthouseResult?.categories ?? {};
  const audits = lighthouseResult?.audits ?? {};

  const refs: { id: string; weight: number }[] = [];
  for (const category of Object.values(categories) as any[]) {
    for (const ref of category?.auditRefs ?? []) {
      if (ref?.weight > 0 && ref?.id) {
        refs.push({ id: ref.id, weight: ref.weight });
      }
    }
  }

  const seen = new Set<string>();
  const candidates = refs
    .filter((ref) => {
      if (seen.has(ref.id)) return false;
      const audit = audits[ref.id];
      if (!audit || typeof audit.score !== "number") return false;
      if (audit.score >= 0.9) return false;
      seen.add(ref.id);
      return true;
    })
    .map((ref) => {
      const audit = audits[ref.id];
      const description = String(audit.description ?? "")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // strip markdown links
        .split(". ")[0]
        .trim();
      return {
        id: ref.id,
        weight: ref.weight,
        score: audit.score as number,
        title: audit.title as string,
        description: description || String(audit.title ?? ""),
      };
    });

  candidates.sort((a, b) => a.score - b.score || b.weight - a.weight);

  return candidates.slice(0, limit).map(({ title, description }) => ({
    title,
    description,
  }));
}

export async function POST(request: NextRequest) {
  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Expected JSON with a `url` field." },
      { status: 400 },
    );
  }

  const normalizedUrl = normalizeUrl(body?.url ?? "");
  if (!normalizedUrl) {
    return NextResponse.json(
      { error: "Please enter a valid website URL (e.g. example.com)." },
      { status: 400 },
    );
  }

  const apiKey = process.env.PAGESPEED_API_KEY;

  const params = new URLSearchParams();
  params.set("url", normalizedUrl);
  params.append("category", "performance");
  params.append("category", "seo");
  params.append("category", "accessibility");
  params.append("category", "best-practices");
  params.set("strategy", "mobile");
  if (apiKey) {
    params.set("key", apiKey);
  }

  const requestUrl = `${PSI_ENDPOINT}?${params.toString()}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const psiResponse = await fetch(requestUrl, {
      signal: controller.signal,
      // Avoid Next.js caching a live audit result.
      cache: "no-store",
    });

    const data = await psiResponse.json().catch(() => null);

    if (!psiResponse.ok || !data) {
      const message =
        data?.error?.message ||
        "We couldn't run the audit right now. Google's PageSpeed service may be rate-limiting unauthenticated requests — please try again shortly.";
      return NextResponse.json({ error: message }, { status: psiResponse.status || 502 });
    }

    const lighthouseResult = data.lighthouseResult;
    if (!lighthouseResult) {
      return NextResponse.json(
        {
          error:
            "Google's PageSpeed service didn't return a usable report for this URL. Make sure the site is publicly accessible and try again.",
        },
        { status: 502 },
      );
    }

    const categories = lighthouseResult.categories;
    const audits = lighthouseResult.audits;

    const report: AuditReport = {
      url: normalizedUrl,
      scores: {
        performance: categoryScore(categories, "performance"),
        seo: categoryScore(categories, "seo"),
        accessibility: categoryScore(categories, "accessibility"),
        bestPractices: categoryScore(categories, "best-practices"),
      },
      vitals: {
        lcp: auditDisplayValue(audits, "largest-contentful-paint"),
        cls: auditDisplayValue(audits, "cumulative-layout-shift"),
        tbt: auditDisplayValue(audits, "total-blocking-time"),
        fcp: auditDisplayValue(audits, "first-contentful-paint"),
      },
      opportunities: getTopOpportunities(lighthouseResult, 5),
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(report, { status: 200 });
  } catch (error: any) {
    if (error?.name === "AbortError") {
      return NextResponse.json(
        {
          error:
            "The audit took too long to complete. Google's PageSpeed service can be slow for some sites — please try again.",
        },
        { status: 504 },
      );
    }
    console.error("Website audit error:", error);
    return NextResponse.json(
      { error: "Something went wrong while running the audit. Please try again." },
      { status: 500 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
