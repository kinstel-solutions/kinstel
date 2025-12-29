"use client"

import { Button, ButtonProps } from "@/components/ui/button"
import { event } from "@/lib/gtag"

interface ScrollToFormButtonProps extends ButtonProps {
  trackingAction?: string;
  trackingCategory?: string;
  trackingLabel?: string;
}

export function ScrollToFormButton({ 
  children, 
  onClick, 
  trackingAction,
  trackingCategory,
  trackingLabel,
  ...props 
}: ScrollToFormButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (trackingAction) {
      event({
        action: trackingAction,
        category: trackingCategory || "engagement",
        label: trackingLabel,
      });
    }

    if (onClick) onClick(e)
    
    const formContainer = document.getElementById("inquiry-form")
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: "smooth" })
      
      // Delay focus to allow smooth scroll to initiate/complete visually
      setTimeout(() => {
        const input = formContainer.querySelector('input[name="name"]') as HTMLInputElement
        if (input) {
          // preventScroll: true because we handled the scroll on the container
          input.focus({ preventScroll: true }) 
        }
      }, 600)
    }
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}
