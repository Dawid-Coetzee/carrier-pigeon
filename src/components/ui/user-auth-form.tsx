"use client";

import { ComponentProps, FC, useState } from "react";
import Button from "./button";
import { cn } from "@/src/lib/utils";
import { signIn } from "next-auth/react"
import Google from "../icons/google";
import { toast } from "sonner";


interface Props extends ComponentProps<"div">{}

const UserAuthForm: FC<Props> = ({className, ...props}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginWithGoogle = async () => {
        setIsLoading(true);

        try {
            
            await signIn("google");
        } catch (error) {
            // toast notification
            toast.error("a Error occurred while logging in.", {
                description: "an Error occurred while logging into Google."
            })

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div 
            className={cn(
                "flex justify-center",
                className
            )}
            {...props}
        >
            <Button 
                size="md" 
                className="w-80 text-lg"
                variant={"login"}
                onClick={loginWithGoogle}
                isLoading={isLoading}
            >
                {isLoading ? null : <Google className="size-5 mr-1" />}
                Google
            </Button>
        </div>
    );
}

export default UserAuthForm;