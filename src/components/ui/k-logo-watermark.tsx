import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface KLogoWatermarkProps {
  className?: string;
  opacity?: number;
  side?: "left" | "right";
  flipX?: boolean;
}

export function KLogoWatermark({
  className,
  opacity = 0.035,
  side = "right",
  flipX,
}: KLogoWatermarkProps) {
  const shouldFlip = flipX !== undefined ? flipX : side === "right";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none overflow-hidden transition-opacity duration-700",
        className
      )}
      style={{ opacity }}
    >
      <Image
        src="/K-Logo.svg"
        alt=""
        width={700}
        height={700}
        priority={false}
        className={cn(
          "w-[380px] sm:w-[500px] md:w-[650px] h-auto object-contain transition-transform duration-500",
          shouldFlip && "-scale-x-100"
        )}
      />
    </div>
  );
}
