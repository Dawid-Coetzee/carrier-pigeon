import { cn } from "@/lib/utils";
import Button, { buttonVariants } from "./button";
import { VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

type Props = VariantProps<typeof buttonVariants> & ComponentProps<"span">;

export const Chip = ({ 
    variant = "secondary",
    children
}: Props) => {
    return (
        <Button 
            variant={variant} 
            size="sm" 
            className={cn("h-8, px-2.5")}
        >
            <span>{children}</span>
        </Button>
    );
}
