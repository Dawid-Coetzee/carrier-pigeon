"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { ComponentProps, useId } from "react";
import ExclamationTriangle from "@/components/icons/error"

type Props = {
  label?: string
} & ComponentProps<"textarea">;

function Textarea({ className, label, required, ...props }: Props) {
  const labelId = useId();

  return (
    <Label 
      className={cn(
        "group",
        "bg-primary-button-hover hover:bg-primary-button-normal",
        "font-sans text-text1 font-semibold", 
        "h-14 px-4 border rounded-textarea-rounding",
        "flex items-center gap-2", 
        "focus-within:outline-2 cursor-text",
        "has-[textarea[aria-invalid=true]]:outline has-[textarea[aria-invalid=true]]:outline-destructive",
        className
      )}>
      <div className={cn(
        "w-full relative", 
        label && "focus-within:translate-y-2",
        "group-has-[textarea:not(:placeholder-shown)]:translate-y-2"
      )}>
        {label && (<span 
          id={labelId}
          className={cn(
            "absolute",
            "font-[inherit] text-text2 text-base group-focus-within:text-sm",
            "group-has-[textarea:not(:placeholder-shown)]:-translate-y-4 group-has-[textarea:not(:placeholder-shown)]:text-sm",
            "group-focus-within:-translate-y-4",
            "duration-180"
        )}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </span>
        )}
        <textarea
          data-slot="textarea"
          data-testid="test-textarea"
          placeholder=""
          required={required}
          className={cn(
            "font-[inherit] outline-none w-full")}
          aria-labelledby={label && labelId}
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
