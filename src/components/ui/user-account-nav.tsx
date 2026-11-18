"use client";

import { User } from "next-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/src/components/ui/avatar"
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/src/lib/utils";
import { signOut } from "next-auth/react";

interface Props {
    user: Pick<User, "name" | "image" | "email">
}

export default function UserAccountNav({ user }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage
                        src={user.image ?? undefined}
                        alt={`${user.name}'s Avatar`}
                        referrerPolicy="no-referrer"
                    />
                    <AvatarFallback>
                        <span className="sr-only">{`${user.name}'s Avatar`}</span>
                        {user.name?.charAt(0) ?? user.email?.charAt(0) ?? "?"}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-sidebar-button-active border w-70" align="end">
                <div className="flex items-center justify-center gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && (
                            <p className="font-medium">
                                {user.name}
                            </p>
                        )}
                        {user.email && (
                            <p className="w-50 truncate text-sm text-text2s">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />

                {/* Also make button for dark mode */}

                <DropdownMenuItem
                    asChild
                    className={cn(
                        buttonVariants({ size: "md", variant: "secondary" }),
                        "w-95/100 rounded-md focus:bg-secondary-button-hover focus:text-text1 mx-auto"
                    )}
                >
                    <Link href="/settings">Settings</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className={cn(
                        buttonVariants({ size: "md", variant: "destructive" }),
                        "w-95/100 rounded-md focus:bg-destructive-button-hover focus:text-text1 mx-auto"
                    )}
                    onSelect={(event) => {
                        event.preventDefault();
                        signOut({
                            callbackUrl: `${window.location.origin}/sign-in`,
                        })
                    }}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
