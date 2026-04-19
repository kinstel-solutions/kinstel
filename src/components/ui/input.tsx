import * as React from "react"
import { cn } from "@/lib/utils"
import { BorderBeam } from "./border-beam"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <BorderBeam active={false} beamClassName="group-focus-within:opacity-100">
        <input
          type={type}
          className={cn(
            "relative z-10 flex h-10 w-full rounded-[calc(var(--radius)-2px)] border border-input bg-background/0 px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </BorderBeam>
    )
  }
)
Input.displayName = "Input"

export { Input }
