"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { ComponentProps, useId } from "react";
import ExclamationTriangle from "@/components/icons/error"

type Props = {
  label?: string
} & ComponentProps<"textarea">;

function Textarea({ className, label, required, rows, ...props }: Props) {
  const labelId = useId();

  return (
    <Label 
      className={cn(
        "group",
        "bg-page-button-active hover:bg-input-hover",
        "font-sans text-text1 font-semibold", 
        "min-h-14 p-4 border rounded-input-rounding",
        "flex items-center gap-2", 
        "focus-within:outline-2 cursor-text",
        "has-[textarea[aria-invalid=true]]:outline has-[textarea[aria-invalid=true]]:outline-destructive",
        className
      )}>
      <div className={cn(
        "w-full relative flex", 
        label && "focus-within:translate-y-2 group-has-[textarea:not(:placeholder-shown)]:translate-y-2"
      )}>
        {label && (<span 
          id={labelId}
          className={cn(
            "absolute",
            "text-text2 text-base",
            "group-has-[textarea:not(:placeholder-shown)]:-translate-y-4 group-has-[textarea:not(:placeholder-shown)]:text-sm",
            "group-focus-within:-translate-y-4 group-focus-within:text-sm",
            "duration-180"
        )}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </span>
        )}
        <textarea
          name="communityDescription"
          data-slot="textarea"
          data-testid="test-textarea"
          placeholder=""
          required={required}
          className={cn(
            "outline-none w-full resize-none",
            !rows && "field-sizing-content")}
          aria-labelledby={label && labelId}
          rows={rows}
          {...props}
        />
      </div>

      <ExclamationTriangle 
        className={cn(
          "hidden",
          "group-has-[textarea[aria-invalid=true]]:text-destructive", 
          "group-has-[textarea[aria-invalid=true]]:block"
        )}
      />
    </Label>
  )
}

export { Textarea };
