import { 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { CommunityCreateStage } from "../types";

type Props = {
    stage: CommunityCreateStage;
}

const COMMUNITY_CREATE_DIALOG_HEADER_TEXT = {
    [CommunityCreateStage.One]: {
        title: "Enlighten us concerning your community",
        description: "A name and description would greatly enlighten people as to the nature of your community."
    },
    [CommunityCreateStage.Two]: {
        title: "Adorn your community",
        description: "A touch of visual splendour shall draw new members’ notice and help shape the character of your community. You may amend it at any time."
    }
}

export function CommunityCreateDialogHeader({ stage }: Props) {
    return (
        <DialogHeader className="text-left gap-8">
            <DialogTitle className="text-2xl font-bold tracking-tight pt-8 text-center">
                {COMMUNITY_CREATE_DIALOG_HEADER_TEXT[stage].title}
            </DialogTitle>
            <DialogDescription className="text-description-text font-medium">
                {COMMUNITY_CREATE_DIALOG_HEADER_TEXT[stage].description}
            </DialogDescription>
        </DialogHeader>
    );
}
