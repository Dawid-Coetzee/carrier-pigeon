import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <Label 
      className={cn(
        "group",
        "bg-primary-button-hover hover:bg-primary-button-normal",
        "font-sans text-text1 font-semibold", 
        "h-14 px-4 border rounded-[20px]",
        "flex items-center", 
        "focus-within:outline-2"
      )}>
      <div className={cn("focus-within:translate-y-2")}>
        <span 
          className={cn(
            "absolute",
            "font-[inherit] text-text2 text-base group-focus-within:text-sm",
            "group-focus-within:-translate-y-4",
            "duration-180"
        )}>Label</span>
        <input
          type={type}
          data-slot="input"
          className={cn("font-[inherit] outline-none", className)}
          {...props}
        />
      </div>
    </Label>
  )
}

export { Input };
