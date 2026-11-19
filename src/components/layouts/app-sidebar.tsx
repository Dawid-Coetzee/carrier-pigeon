import { Home, Popular, Explore, All } from "@/src/components/icons/sidebar-icons";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarSeparator
} from "@/src/components/ui/sidebar";
import AppSidebarMenuLink from "./app-sidebar-menu-link";
import AppSidebarMenuCollapsible from "./app-sidebar-menu-collapsible";
import { Settings } from "../icons/settings";
import CommunityNavItems from "@/src/features/communities/components/community-nav-items";
import CommunityCreateDialog from "@/src/features/communities/components/community-create-dialog";
import { getAuthSession } from "@/src/lib/auth";

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

export async  function AppSidebar() {
    const session = await getAuthSession();
    return (
    <Sidebar>
        <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
            <SidebarMenu>
                {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <AppSidebarMenuLink {...item}/>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

        {session?.user ? <SidebarSeparator /> : ""}

        {session?.user ? <AppSidebarMenuCollapsible title="Communities">
            <SidebarMenu>
                <SidebarMenuItem>
                    <CommunityCreateDialog />
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                    <AppSidebarMenuLink 
                        title="Manage Communities" 
                        url="/communities"
                        icon={<Settings />}
                        selected={<Settings className="text-primary-button-active" />}
                    />
                </SidebarMenuItem>

                <CommunityNavItems />
            </SidebarMenu>
        </AppSidebarMenuCollapsible> : ""}

        </SidebarContent>
    </Sidebar>
    );
}