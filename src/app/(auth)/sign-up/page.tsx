import { buttonVariants } from "@/src/components/ui/button";
import SignUp from "@/src/components/ui/sign-up";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { FC } from "react";

const page: FC = () => {
    return (
        <div 
            className="absolute inset-0 flex justify-center items-center"
        >
            <div 
                className={cn(
                    "h-full max-w-2xl mx-auto",
                    "flex flex-col items-center justify-center gap-20"
                )}
            >
                <Link 
                    href="/"
                    className={cn(
                        buttonVariants({variant: "plain"}),
                        "self-start -mt-20"
                    )}
                >
                    Home
                </Link>
                <SignUp />
            </div>
        </div>
    );
}

export default page