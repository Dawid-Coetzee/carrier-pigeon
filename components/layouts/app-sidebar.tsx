import { Home, Popular, Explore, All } from "@/components/icons/sidebar-icons";

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
import AppSidebarMenuCollapsible from "./app-sidebar-menu-collapsible";
import { Settings } from "../icons/settings";
import CommunityNavItems from "@/features/communities/components/community-nav-items";
import CommunityCreate from "@/features/communities/components/community-create";

// Menu items.
const items = [
    {
    title: "Home",
    url: "/",
    icon: <Home />,
    selected: <Home className="text-primary-button-active"/>
    },
    {
    title: "Popular",
    url: "/popular",
    icon: <Popular />,
    selected: <Popular className="text-primary-button-active"/>
    },
    {
    title: "Explore",
    url: "/explore",
    icon: <Explore />,
    selected: <Explore className="text-primary-button-active"/>
    },
    {
    title: "All",
    url: "/all",
    icon: <All />,
    selected: <All className="text-primary-button-active"/>
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
                
                <SidebarMenuItem>
                    <AppSidebarMenuButton 
                        title="Manage Communities" 
                        url="/communities"
                        icon={<Settings />}
                        selected={<Settings className="text-primary-button-active" />}
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