"use client";

import Link, { LinkProps } from "next/link";
import { event } from "@/lib/gtag";

interface TrackedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  trackingAction: string;
  trackingCategory?: string;
  trackingLabel?: string;
  onClick?: () => void;
}

export function TrackedLink({
  children,
  trackingAction,
  trackingCategory = "engagement",
  trackingLabel,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={() => {
        event({
          action: trackingAction,
          category: trackingCategory,
          label: trackingLabel,
        });
        if (onClick) onClick();
      }}>
      {children}
    </Link>
  );
}
