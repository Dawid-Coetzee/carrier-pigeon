import Button from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

type Props = {
    isNextDisabled: boolean;
}

export function CommunityCreateDialogFooter({ isNextDisabled }: Props) {
    return (
        <DialogFooter className="flex-row justify-end">
            <Button
                variant="destructive"
                size="lg"
            >
                Cancel
            </Button>
            <Button
                variant="primary"
                size="lg"
                disabled={ isNextDisabled }
            >
                Next
            </Button>
        </DialogFooter>
    );
}
