"use client";

import dynamic from "next/dynamic";


export const ParticlesDynamic = dynamic(
  () => import("@/components/ui/particles").then((mod) => mod.Particles),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background/50 -z-10" />,
  },
);

export const ScrollVelocityContainerDynamic = dynamic(
  () =>
    import("@/components/ui/scroll-based-velocity").then(
      (mod) => mod.ScrollVelocityContainer,
    ),
  { ssr: false },
);

export const ScrollVelocityRowDynamic = dynamic(
  () =>
    import("@/components/ui/scroll-based-velocity").then(
      (mod) => mod.ScrollVelocityRow,
    ),
  { ssr: false },
);

export const InquiryFormDynamic = dynamic(
  () =>
    import("@/components/sections/inquiry-form").then((mod) => mod.InquiryForm),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full animate-pulse bg-card/50 border border-border/50 rounded-xl" />
    ),
  },
);


