import type { ReactNode } from "react";
import { 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/src/components/ui/dialog";

type Props = {
    title: string;
    description: ReactNode;
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
