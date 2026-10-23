import Plus from "@/components/icons/plus";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Button from "@/components/ui/button";
import CommunityPreview from "./community-preview";

export default function CommunityCreate() {
    return (
    <Dialog>
        <DialogTrigger asChild>
            <SidebarMenuButton className="cursor-pointer">
                <span className="size-8 flex items-center justify-center">
                    <Plus className="size-5" />
                </span>
                <span>Create Community</span>
            </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent className="border-2 rounded-2xl p-4 gap-8">
            <DialogHeader className="text-left gap-8">
                <DialogTitle className="text-2xl font-bold tracking-tight pt-8 text-center">Enlighten us concerning your community</DialogTitle>
                <DialogDescription className="text-[1.08rem] font-medium">
                    A name and description would greatly enlighten people as to the nature of your community.
                </DialogDescription>
            </DialogHeader>

            {/* Preview Card */}
            <CommunityPreview />
                
            <DialogFooter className="flex-row justify-end">
                <Button
                    variant="secondary"
                    size="lg"
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                >
                    Next
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    
    )
}
