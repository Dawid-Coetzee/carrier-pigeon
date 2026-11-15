"use client";

import { SidebarMenuButton } from "../ui/sidebar";
import { ComponentProps, ReactNode } from "react";



type Props = {
    title: string;
    icon: ReactNode;
} & ComponentProps<typeof SidebarMenuButton>;


export default function AppSidebarMenuButton({ icon, title, ...props }: Props) {
    return (
    <SidebarMenuButton className="cursor-pointer" {...props}>
        <span className="size-8 flex items-center justify-center">
            {icon}
        </span>
        <span>{title}</span>
    </SidebarMenuButton>
    )
}
