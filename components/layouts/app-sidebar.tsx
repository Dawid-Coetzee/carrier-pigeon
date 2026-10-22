import { Home, Popular, Explore, All } from "@/components/icons/sidebar-icons";
import { ColouredHome, ColouredPopular, ColouredExplore, ColouredAll } from "@/components/icons/sidebar-icons-selected"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarSeparator
} from "@/components/ui/sidebar";
import AppSidebarMenuButton from "./app-sidebar-menu-button";

// Menu items.
const items = [
    {
    title: "Home",
    url: "/",
    icon: <Home />,
    selected: <ColouredHome />
    },
    {
    title: "Popular",
    url: "/popular",
    icon: <Popular />,
    selected: <ColouredPopular />
    },
    {
    title: "Explore",
    url: "/explore",
    icon: <Explore />,
    selected: <ColouredExplore />
    },
    {
    title: "All",
    url: "/all",
    icon: <All />,
    selected: <ColouredAll />
    }
];

export function AppSidebar() {
    return (
    <Sidebar>
        <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
            <SidebarMenu>
                {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <AppSidebarMenuButton {...item}/>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />
        <SidebarSeparator />
        <SidebarSeparator />
        <SidebarSeparator />
        </SidebarContent>
    </Sidebar>
    );
}