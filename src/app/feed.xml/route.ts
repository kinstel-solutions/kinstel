import { posts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

/** Escape special XML characters in dynamic strings. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Convert an ISO date string (e.g. "2026-07-24") to an RFC-822 UTC string. */
function toRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Derived from the newest post's date so it doesn't depend on request time.
const lastBuildDate = toRfc822(
  sortedPosts[0]?.date ?? new Date().toISOString()
);

export function GET() {
  const items = sortedPosts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml("Kinstel Blog")}</title>
    <link>${escapeXml(`${siteConfig.url}/blog`)}</link>
    <description>${escapeXml(
      "Straight-talking articles on web design, development, and marketing from Kinstel Solutions."
    )}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
