import { 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { CommunityCreateStage } from "../types";

type Props = {
    title: string;
    description: string;
}



export function CommunityCreateDialogHeader({ 
    title, 
    description 
}: Props) {
    return (
        <DialogHeader className="text-left gap-8">
            <DialogTitle className="text-2xl font-bold tracking-tight pt-8 text-center">
                {title}
            </DialogTitle>
            <DialogDescription className="text-description-text font-medium">
                {description}
            </DialogDescription>
        </DialogHeader>
    );
}
