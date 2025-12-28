"use client";

import dynamic from "next/dynamic";

export const DynamicIslandDemo = dynamic(
  () => import("@/components/ui/d-island").then((mod) => mod.DynamicIslandDemo),
  { ssr: false }
);

export const StripeBgGuides = dynamic(
  () => import("@/components/ui/stripe-bg-guids").then((mod) => mod.StripeBgGuides),
  { ssr: false }
);
