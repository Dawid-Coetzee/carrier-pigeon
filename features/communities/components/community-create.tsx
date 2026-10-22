import Plus from "@/components/icons/plus";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export default function CommunityCreate() {
    return (
    <SidebarMenuButton>
        <span className="size-8 flex items-center justify-center">
            <Plus className="size-5" />
        </span>
        <span>Create Community</span>
    </SidebarMenuButton>
    )
}
