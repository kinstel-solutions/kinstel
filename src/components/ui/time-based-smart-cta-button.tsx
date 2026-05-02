"use client";

import React, { useState, useEffect } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { event } from "@/lib/gtag";

interface TimeBasedSmartCtaButtonProps extends Omit<ButtonProps, "onClick"> {
  arrow?: boolean;
  phoneNumber: string;
  whatsappNumber: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function TimeBasedSmartCtaButton({
  arrow = true,
  phoneNumber,
  whatsappNumber,
  children,
  onClick,
  ...props
}: TimeBasedSmartCtaButtonProps) {
  const [isClient, setIsClient] = useState(false);
  const [isBusinessHours, setIsBusinessHours] = useState(true); // Default to true for SSR

  useEffect(() => {
    setIsClient(true);
    const currentHour = new Date().getHours();
    // 12 PM (12) to 9 PM (21)
    if (currentHour >= 12 && currentHour < 21) {
      setIsBusinessHours(true);
    } else {
      setIsBusinessHours(false);
    }
  }, []);

  const href = isBusinessHours
    ? `tel:${phoneNumber}`
    : `https://wa.me/${whatsappNumber}?text=Hi,%20I'd%20like%20to%20discuss%20my%20project.`;

  const handleTrackedClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    event({
      action: "contact",
      category: "cta",
      label: isBusinessHours ? "time_based_phone_click" : "time_based_whatsapp_click",
    });
    if (onClick) onClick(e);
  };

  if (!isClient) {
    // Render a placeholder or disabled button on the server to avoid hydration mismatch
    return (
      <Button
        {...props}
        disabled>
        {children}
        {arrow && (
          <ArrowUpRight className="ml-1 h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </Button>
    );
  }

  return (
    <Button
      asChild
      {...props}>
      <a
        href={href}
        onClick={handleTrackedClick}
        target={isBusinessHours ? "_self" : "_blank"}
        rel={isBusinessHours ? undefined : "noopener noreferrer"}>
        {children}
        {arrow && (
          <ArrowUpRight className="ml-1 h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </a>
    </Button>
  );
}
