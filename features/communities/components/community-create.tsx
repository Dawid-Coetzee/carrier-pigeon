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
            <CommunityPreview banner="data:image/jpeg;base64,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" avatar="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F03%2F27%2F02%2F0327029d34ca02ed45c3415ece040785.jpg&f=1&nofb=1&ipt=ea72082979b9bc56a4a339c8f62d41f1c6dfc52890d92066fccbb7fc0019b314&ipo=images" withImages/>
            <CommunityPreview banner="" avatar="" withImages={false}/>
                
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
