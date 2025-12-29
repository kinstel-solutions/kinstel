"use client"

import { Button, ButtonProps } from "@/components/ui/button"

export function ScrollToFormButton({ children, onClick, ...props }: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
