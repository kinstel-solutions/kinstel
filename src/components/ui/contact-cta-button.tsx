"use client";

import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { event } from "@/lib/gtag";

interface ContactCtaButtonProps extends Omit<ButtonProps, "onClick"> {
  arrow?: boolean;
  email?: string;
  subject?: string;
  body?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function ContactCtaButton({
  arrow = true,
  email = "contact@kinstel.com",
  subject = "Website Consultation Request",
  body = "Hi Kinstel Team,\n\nI would like to discuss my project and claim the free consultation.\n\nThanks!",
  children,
  onClick,
  ...props
}: ContactCtaButtonProps) {
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleTrackedClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    event({
      action: "contact",
      category: "cta",
      label: "email_cta_click",
    });
    if (onClick) onClick(e);
  };

  return (
    <Button
      asChild
      {...props}>
      <a
        href={href}
        onClick={handleTrackedClick}>
        {children}
        {arrow && (
          <ArrowUpRight className="ml-1 h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </a>
    </Button>
  );
}
