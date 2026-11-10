import { 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";

export function CommunityCreateDialogHeader() {
    return (
        <DialogHeader className="text-left gap-8">
            <DialogTitle className="text-2xl font-bold tracking-tight pt-8 text-center">
                Enlighten us concerning your community
            </DialogTitle>
            <DialogDescription className="text-description-text font-medium">
                A name and description would greatly enlighten people as to the nature of your community.
            </DialogDescription>
        </DialogHeader>
    );
}
