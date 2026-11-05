"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { ComponentProps, useId } from "react";
import ExclamationTriangle from "@/components/icons/error"

type Props = {
  label?: string;
  prefix?: string;
} & ComponentProps<"input">;

function Input({ className, prefix, type, label, required, ...props }: Props) {
  const labelId = useId();

  return (
    <Label 
      className={cn(
        "group",
        "bg-page-button-active hover:bg-input-hover",
        "font-sans text-text1 font-semibold", 
        "h-14 px-4 border rounded-input-rounding",
        "flex items-center gap-2", 
        "focus-within:outline-2 cursor-text",
        "has-[input[aria-invalid=true]]:outline has-[input[aria-invalid=true]]:outline-destructive",
        className
      )}>
      <div className={cn(
        "w-full relative flex items-center", 
        label && "focus-within:translate-y-2 group-has-[input:not(:placeholder-shown)]:translate-y-2",
      )}>
        {label && (<span 
          id={labelId}
          className={cn(
            "absolute",
            "text-text2 text-base group-focus-within:text-sm",
            "group-has-[input:not(:placeholder-shown)]:-translate-y-4 group-has-[input:not(:placeholder-shown)]:text-sm",
            "group-focus-within:-translate-y-4",
            "duration-180"
        )}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </span>
        )}

        {prefix && <span className="hidden group-has-[input:not(:placeholder-shown)]:inline">{prefix}</span>}

        <input
          type={type}
          data-slot="input"
          data-testid="test-input"
          placeholder=""
          required={required}
          className={cn(
            "outline-none w-full")}
          aria-labelledby={label && labelId}
          {...props}
        />
      </div>

      <ExclamationTriangle 
        className={cn(
          "hidden",
          "group-has-[input[aria-invalid=true]]:text-destructive", 
          "group-has-[input[aria-invalid=true]]:block"
        )}
      />
    </Label>
  )
}

export { Input };
