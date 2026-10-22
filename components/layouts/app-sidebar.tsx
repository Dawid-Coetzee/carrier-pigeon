import { Home, Popular, Explore, All } from "@/components/icons/sidebar-icons";
import { ColouredHome, ColouredPopular, ColouredExplore, ColouredAll } from "@/components/icons/sidebar-icons-selected"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from "@/components/ui/sidebar";
import AppSidebarMenuButton from "./app-sidebar-menu-button";
import AppSidebarMenuCollapsible from "./app-sidebar-menu-collapsible";
import Plus from "../icons/plus";
import { ColouredSettings, Settings } from "../icons/settings";
import CommunityNavItems from "@/features/communities/components/community-nav-items";
import CommunityCreate from "@/features/communities/components/community-create";

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

        <AppSidebarMenuCollapsible title="Communities">
            <SidebarMenu>
                <SidebarMenuItem>
                    <CommunityCreate />
                </SidebarMenuItem>
                <SidebarMenuItem >
                    <AppSidebarMenuButton 
                        title="Manage Communities" 
                        url="/communities"
                        icon={<Settings />}
                        selected={<ColouredSettings />}
                    />
                </SidebarMenuItem>

                <CommunityNavItems />
            </SidebarMenu>
        </AppSidebarMenuCollapsible>

        <SidebarSeparator />
        <SidebarSeparator />
        <SidebarSeparator />
        </SidebarContent>
    </Sidebar>
    );
}