import { ImageResponse } from "next/og";
import { posts } from "@/lib/blog";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "Kinstel Blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  const title = post?.title ?? "Kinstel Blog";
  const tag = post?.tags?.[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#102A43",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 45%), radial-gradient(circle at 80% 80%, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0) 50%)",
          padding: "80px",
          position: "relative",
        }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "16px",
            height: "100%",
            backgroundColor: "#D4AF37",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: 600,
            color: "#D4AF37",
            fontFamily: "sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
          Blog{tag ? ` · ${tag}` : ""}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: title.length > 60 ? "56px" : "68px",
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "sans-serif",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            maxWidth: "980px",
          }}>
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "48px",
            fontSize: "30px",
            fontWeight: 700,
            color: "#D4AF37",
            fontFamily: "sans-serif",
            letterSpacing: "0.04em",
          }}>
          KINSTEL SOLUTIONS
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
