import { readFileSync } from "fs";
import { join } from "path";
import { posts } from "@/lib/blog";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/webp";
export const alt = "Kinstel Solutions Blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image() {
  const filePath = join(process.cwd(), "public", "social-assets", "home-og-image.webp");
  const buffer = readFileSync(filePath);
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
