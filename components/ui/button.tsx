import { ComponentProps } from 'react';
import { cva, VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils';

export const buttonVariants = cva(cn(
    "flex items-center justify-center gap-2",
    "cursor-pointer rounded-full text-button-text text-text1 font-semibold border", 
    "data-[shape='circle']:px-0",
    "disabled:bg-button-disabled-background disabled:text-button-disabled-foreground disabled:cursor-not-allowed disabled:border-button-disabled-foreground"
), {
    variants: {
        variant: {
            primary: "bg-primary-button-normal hover:bg-primary-button-hover active:bg-primary-button-active active:text-white",
            bordered: "bg-bordered-button-normal hover:bg-bordered-button-hover active:bg-bordered-button-active border-2 border-border-muted hover:border-text1 active:border-text1",
            secondary: "bg-secondary-button-normal hover:bg-secondary-button-hover active:bg-secondary-button-active",
            destructive: "bg-destructive-button-normal hover:bg-destructive-button-hover active:bg-destructive-button-active",
            selected: "bg-primary-button-active text-white",
            plain: "bg-transparent hover:bg-primary-button-normal active:bg-primary-button-active border-0",
    },
        size: {
            sm: cn("h-8 px-3 text-xs", "data-[shape='circle']:size-8"),
            md: cn("h-10 px-4", "data-[shape='circle']:size-10"),
            lg: cn("h-12 px-3.5", "data-[shape='circle']:size-12")
    }
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    }
});

type ButtonProps = ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        isIcon?: boolean;
    };

export default function Button({ 
    isIcon = false, 
    variant, 
    className,
    size, 
    ...buttonProps 
}: ButtonProps) {
    return (
    <button 
        className={cn(buttonVariants({ variant, size}), className)}
        data-shape={isIcon ? "circle": "pill"}
        {...buttonProps} 
    />
    );
}
