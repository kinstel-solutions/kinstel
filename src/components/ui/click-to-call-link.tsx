'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { event } from '@/lib/gtag';

type ClickToCallLinkProps = {
  phoneNumber: string;
  children: React.ReactNode;
  className?: string;
};

export function ClickToCallLink({ phoneNumber, children, className }: ClickToCallLinkProps) {
  const handleClick = () => {
    event({ action: 'click_to_call', category: 'contact' });
  };

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={handleClick}
      className={cn('inline-flex items-center gap-2', className)}>
      <Phone className="h-4 w-4" />
      {children}
    </a>
  );
}
