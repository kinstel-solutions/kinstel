import { event } from "@/lib/gtag";
import React from "react";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

type WhatsAppWidgetProps = {
  phoneNumber: string;
  message?: string;
};

export const getWhatsAppUrl = (phoneNumber: string, message?: string) => {
  const encodedMessage = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export function WhatsAppWidget({ phoneNumber, message }: WhatsAppWidgetProps) {
  const whatsappUrl = getWhatsAppUrl(phoneNumber, message);

  const handleTrackedClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    event({
      action: "whatsapp_contact",
      category: "cta",
      label: "whatsapp_click",
    });
    // if (onClick) onClick(e);
  };

  return (
    <a
      href={whatsappUrl}
      onClick={handleTrackedClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-110">
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
