"use client";

import React from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { event } from "@/lib/gtag";

interface SmartCtaButtonProps extends Omit<ButtonProps, "onClick"> {
  arrow?: boolean;
  phoneNumber?: string;
  email?: string;
  emailSubject?: string;
  emailBody?: string;
  mode?: "enabled" | "disabled";
  quoteHref?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function SmartCtaButton({
  arrow = true,
  phoneNumber,
  email = "contact@kinstel.com",
  emailSubject = "Website Inquiry",
  emailBody = "Hello, I was on your website and would like to learn more about your services.",
  mode = "disabled",
  quoteHref = "/quote",
  children,
  onClick,
  ...props
}: SmartCtaButtonProps) {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const isSmartActive = mode === "enabled";

  const href = isSmartActive
    ? (isMobile && phoneNumber
        ? `tel:${phoneNumber}`
        : `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`)
    : quoteHref;

  const handleTrackedClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    event({
      action: "contact",
      category: "cta",
      label: isSmartActive ? (isMobile && phoneNumber ? "phone_click" : "email_click") : "quote_cta_click",
    });
    if (onClick) onClick(e);
  };

  if (!isClient) {
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

  const isExternal = href.startsWith("tel:") || href.startsWith("mailto:");

  if (isExternal) {
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

  return (
    <Button
      asChild
      {...props}>
      <Link
        href={href}
        onClick={handleTrackedClick}>
        {children}
        {arrow && (
          <ArrowUpRight className="ml-1 h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </Link>
    </Button>
  );
}
