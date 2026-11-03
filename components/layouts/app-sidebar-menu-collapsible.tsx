import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenuButton
} from "@/components/ui/sidebar";
import ChevronDown from "../icons/chevron";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    title: string;
}

export default function AppSidebarMenuCollapsible({ title, children }: Props) {
    return (
    <Collapsible className="group/collapsible">
        <SidebarGroup>
            <SidebarMenuButton className="justify-between cursor-pointer" asChild>
                <CollapsibleTrigger>
                    <span className="text-sidebar-collapsible uppercase font-medium text-text1 tracking-widest">
                        {title}
                    </span>
                    <span className="h-8 flex items-center">
                        <ChevronDown className="group-data-[state='open']/collapsible:rotate-180  transition-all ease-in-out duration-400"/>
                    </span>
                </CollapsibleTrigger>
            </SidebarMenuButton>
            <CollapsibleContent className="data-[state='open']:animate-collapsible-down data-[state='closed']:animate-collapsible-up overflow-hidden">
                <SidebarGroupContent>
                    {children}
                </SidebarGroupContent>
            </CollapsibleContent>
        </SidebarGroup>
    </Collapsible>
    )
}
