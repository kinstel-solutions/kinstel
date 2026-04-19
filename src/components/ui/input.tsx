import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="group relative overflow-hidden rounded-md p-[2px]">
        {/* The Animated Beam Layer */}
        <div className="absolute inset-[-1000%] animate-border-beam [background:conic-gradient(from_0deg,transparent_65%,#F59E0B_85%,#FFFFFF_100%)] opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        
        {/* The Blocking Layer (Prevents beam visibility through transparent inputs) */}
        <div className="absolute inset-[2px] bg-background rounded-[calc(var(--radius)-2px)] z-0 pointer-events-none" />

        <input
          type={type}
          className={cn(
            "relative z-10 flex h-10 w-full rounded-[calc(var(--radius)-2px)] border border-input bg-background/0 px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
