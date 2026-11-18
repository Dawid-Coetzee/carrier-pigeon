import DefaultCommunityAvatar from "@/src/components/icons/default-community-avatar"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { SidebarMenuButton, SidebarMenuItem } from "@/src/components/ui/sidebar"
import Link from "next/link"
import CommunityFavoriteButton from "./community-favorite-button"

const MOCK_COMMUNITIES = [ 
    {
        id: 0,
        title: "c/carrier", 
        url: "c/carrier", 
        avatar: "", 
        isFavorite: true, 
        color: "red"
    }   
]
export default function CommunityNavItems() {
    return MOCK_COMMUNITIES.map(({ id, title, url, avatar, color, isFavorite}) => (
        <SidebarMenuItem key={id}>
            <SidebarMenuButton className="justify-between" asChild>
                <Link href={url}>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage 
                                src={avatar} 
                                alt={`${title} community's avatar`}
                            />
                            <AvatarFallback >
                                <DefaultCommunityAvatar style={{ color }}/>
                            </AvatarFallback>
                        </Avatar>
                        <span>{title}</span>
                    </div>
                
                    <CommunityFavoriteButton isFavorite={isFavorite}/>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    ))
}