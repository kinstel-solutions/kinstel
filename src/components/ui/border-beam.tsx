"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  active?: boolean;
  radius?: string | number;
  beamClassName?: string;
}

/**
 * BorderBeam Component
 * Injects a rotating animated beam around its children.
 * 
 * @param children - The component to be encircled
 * @param size - Thickness of the beam in pixels (default: 2)
 * @param duration - Speed of the animation in seconds (default: 3)
 * @param colorFrom - Base color of the beam (default: Gold #F59E0B)
 * @param colorTo - Tip color of the beam (default: White)
 * @param active - Whether the animation is visible (default: true)
 * @param radius - Override for corner radius (default: matches theme radius)
 */
export function BorderBeam({
  children,
  className,
  size = 2,
  duration = 3,
  colorFrom = "#F59E0B",
  colorTo = "#FFFFFF",
  active = true,
  radius,
  beamClassName,
  ...props
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        !radius && "rounded-md",
        className
      )}
      style={{ 
        padding: `${size}px`,
        borderRadius: radius 
      } as React.CSSProperties}
      {...props}
    >
      {/* The Animated Beam Layer */}
      <div
        className={cn(
          "absolute inset-[-1000%] animate-border-beam transition-opacity duration-300 pointer-events-none",
          active ? "opacity-100" : "opacity-0",
          beamClassName
        )}
        style={{
          background: `conic-gradient(from 0deg, transparent 65%, ${colorFrom} 85%, ${colorTo} 100%)`,
          animationDuration: `${duration}s`,
        }}
      />

      {/* The Blocking Layer (Shield) */}
      <div
        className={cn(
          "absolute bg-background z-0 pointer-events-none",
          !radius && "rounded-[calc(var(--radius)-2px)]"
        )}
        style={{
          inset: `${size}px`,
          borderRadius: radius ? `calc(${typeof radius === 'number' ? radius + 'px' : radius} - ${size}px)` : undefined,
        }}
      />

      {/* The Content Container */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
