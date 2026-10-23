import { ComponentProps } from 'react';
import { cva, VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils';

const buttonVariants = cva(cn("flex items-center justify-center cursor-pointer rounded-full text-[1.04rem] font-[600]", "data-[shape='circle']:px-0"), {
    variants: {
        variant: {
            primary: "bg-[#d4c4a8] hover:bg-[#c9a876] active:bg-[#831e20] border-1",
            secondary: "bg-[#a53f42] hover:bg-[#831e20] active:bg-[#ba0110] border-1",
            plain: "bg-transparent hover:bg-[#d4c4a8] active:bg-[#831e20]",
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
