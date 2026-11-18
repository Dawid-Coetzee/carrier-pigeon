import { cn } from "@/src/lib/utils";
import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import UserAuthForm from "./user-auth-form";

const SignIn = () => {
    return (
        <div
            className={cn(
                "container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-100 md:w-full bg-primary-button-normal border-2 rounded-input-rounding p-5",
            )}
        >
            <div
                className="flex flex-col space-y-2 text-center" 
            >
                <Image 
                    src={logo} 
                    alt={"Carrier Pigeon Logo"} 
                    width={48} 
                    height={48}
                    priority
                    className="mx-auto"
                />
                <h1 className="text-2xl font-semibold tracking-tight">Welcome, Most Esteemed Friend!</h1>
                <p className="text-md max-w-2xl mx-auto text-text1">
                    By proceeding, you do most graciously consent to abide by our User Agreement, and you do thereby acknowledge that you have read and understood our Privacy Policy.
                </p>

                {/* Sign in form */}
                <UserAuthForm  />

                <p className="px-8 text-center text-lg text-text1">
                    Already a Pigeon?{" "}
                    <Link 
                        href="/sign-in"
                        className="text-destructive-button-normal hover:text-destructive"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignIn;