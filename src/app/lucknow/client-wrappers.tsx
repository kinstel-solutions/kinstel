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


