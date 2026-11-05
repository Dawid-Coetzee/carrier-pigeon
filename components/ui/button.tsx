import { ComponentProps } from 'react';
import { cva, VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils';

const buttonVariants = cva(cn(
    "flex items-center justify-center cursor-pointer rounded-full text-button-text text-text1 font-semibold", 
    "data-[shape='circle']:px-0 disabled:bg-button-disabled-background disabled:text-button-disabled-foreground disabled:cursor-not-allowed disabled:border-button-disabled-foreground"
), {
    variants: {
        variant: {
            primary: "bg-primary-button-normal hover:bg-primary-button-hover active:bg-primary-button-active border-1",
            secondary: "bg-secondary-button-normal hover:bg-primary-button-active active:bg-secondary-button-active border-1",
            plain: "bg-transparent hover:bg-primary-button-normal active:bg-primary-button-active",
    },
        size: {
            sm: cn("h-8 px-3", "data-[shape='circle']:size-8"),
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
