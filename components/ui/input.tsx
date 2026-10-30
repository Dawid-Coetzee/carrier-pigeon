"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { ComponentProps, useId } from "react";

type Props = {
  label?: string
} & ComponentProps<"input">;

function Input({ className, type, label, ...props }: Props) {
  const labelId = useId();

  return (
    <Label 
      className={cn(
        "group",
        "bg-primary-button-hover hover:bg-primary-button-normal",
        "font-sans text-text1 font-semibold", 
        "h-14 px-4 border rounded-[20px]",
        "flex items-center", 
        "focus-within:outline-2 cursor-text", 
        className
      )}>
      <div className={cn("w-full relative", label && "focus-within:translate-y-2")}>
        {label && (<span 
          id={labelId}
          className={cn(
            "absolute",
            "font-[inherit] text-text2 text-base group-focus-within:text-sm",
            "group-focus-within:-translate-y-4",
            "duration-180"
        )}>
          {label}
        </span>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn(
            "font-[inherit] outline-none w-full opacity-0",
            "group-focus-within:opacity-100 transition-opacity",)}
          aria-labelledby={label && labelId}
          {...props}
        />
      </div>
    </Label>
  )
}

export { Input };
