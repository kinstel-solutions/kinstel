import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface KBulletGlyphProps {
  className?: string;
  size?: number;
}

export function KBulletGlyph({ className, size = 18 }: KBulletGlyphProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-accent/10 p-0.5 border border-accent/20 shadow-sm",
        className
      )}
    >
      <Image
        src="/K-Logo.svg"
        alt=""
        width={size}
        height={size}
        className="object-contain"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </span>
  );
}
