"use client"

import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button, type ButtonProps } from '@/components/ui/button';

interface SmartCtaButtonProps extends ButtonProps {
  phoneNumber: string;
  email: string;
  emailSubject?: string;
  emailBody?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function SmartCtaButton({
  phoneNumber,
  email,
  emailSubject = 'Website Inquiry',
  emailBody = 'Hello, I was on your website and would like to learn more about your services.',
  children,
  onClick,
  ...props
}: SmartCtaButtonProps) {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const href = isMobile
    ? `tel:${phoneNumber}`
    : `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  
  if (!isClient) {
    // Render a placeholder or disabled button on the server to avoid hydration mismatch
    return (
      <Button {...props} disabled>
        {children}
      </Button>
    );
  }

  return (
    <Button asChild {...props}>
      <a href={href} onClick={onClick}>{children}</a>
    </Button>
  );
}
