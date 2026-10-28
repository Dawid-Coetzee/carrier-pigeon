import Image from "next/image"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DefaultCommunityAvatar from "@/components/icons/default-community-avatar";

type Props = {
    withImages: boolean;
    banner: string;
    avatar: string;
}

export default function communityPreview({ withImages, banner, avatar }: Props) {
    return (
        <Card className="pt-0 pb-4 border-2 shadow-[1px_2px_4px_2px_#777] rounded-md gap-2">
            {withImages && (
                <div className="relative h-10 w-full overflow-hidden bg-(--primary-button-active)">
                    {banner && (
                        <Image 
                            src={banner} 
                            alt="Community Banner" 
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
            )}

            <CardHeader className="px-4 pt-4 gap-4 flex">
                {withImages && (
                    <Avatar className="size-12 overflow-hidden border">
                        <AvatarImage src={avatar} alt="Community Avatar"/>
                        <AvatarFallback>
                            <DefaultCommunityAvatar size={9}/>
                        </AvatarFallback>
                    </Avatar>
                )}
                
                <div>
                    <CardTitle className="text-black font-semibold text-xl mb-1">p/communityname</CardTitle>
                    <p className="text-md">1 member · 1 online</p>
                </div>
            </CardHeader>
            <CardContent className="px-4">
                <p className="text-lg">Your community description</p>
            </CardContent>
        </Card>
    );
}
