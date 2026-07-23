"use client";

import React, { useState, useEffect } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageCircle, Phone, Clock } from "lucide-react";
import { event } from "@/lib/gtag";
import Link from "next/link";

interface TimeBasedCallButtonProps extends Omit<ButtonProps, "onClick"> {
  phoneNumber: string;
  whatsappNumber: string;
  formId?: string; // ID to scroll to for "Request Callback"
}

export function TimeBasedCallButton({
  phoneNumber,
  whatsappNumber,
  formId = "claim-offer",
  children,
  ...props
}: TimeBasedCallButtonProps) {
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBusinessHours, setIsBusinessHours] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if current time is between 12:00 PM and 9:00 PM (12 to 21)
    const currentHour = new Date().getHours();
    if (currentHour >= 12 && currentHour < 21) {
      setIsBusinessHours(true);
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    event({
      action: "contact",
      category: "cta",
      label: "time_based_call_click",
    });

    if (isBusinessHours) {
      event({
        action: "click_to_call",
        category: "contact",
      });
      window.location.href = `tel:${phoneNumber}`;
    } else {
      setIsModalOpen(true);
    }
  };

  const handleWhatsappClick = () => {
    event({
      action: "contact",
      category: "cta",
      label: "modal_whatsapp_click",
    });
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
    setIsModalOpen(false);
  };

  const handleCallbackClick = () => {
    event({
      action: "contact",
      category: "cta",
      label: "modal_callback_click",
    });
    setIsModalOpen(false);
    // Smooth scroll to form
    const element = document.getElementById(formId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isClient) {
    return (
      <Button disabled {...props}>
        {children}
      </Button>
    );
  }

  return (
    <>
      <Button onClick={handleClick} {...props}>
        {children}
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-card border-accent/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Clock className="w-5 h-5 text-accent" />
              Our lines are currently closed.
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground pt-2">
              Our direct calling hours are from <strong>12:00 PM to 9:00 PM IST</strong>. 
              Please choose how you'd like to reach us, and we'll get back to you promptly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button 
              onClick={handleCallbackClick} 
              variant="default" 
              className="w-full h-14 text-lg bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Phone className="w-5 h-5 mr-2" />
              Request a Callback
            </Button>
            <Button 
              onClick={handleWhatsappClick} 
              variant="outline" 
              className="w-full h-14 text-lg border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
