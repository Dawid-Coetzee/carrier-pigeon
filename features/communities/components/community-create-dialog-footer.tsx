import Button from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { MouseEvent } from "react";

type Props = {
    isCancelable: boolean;
    isSaveable: boolean;
    isNextDisabled: boolean;
    onNextClick: () => void;
    onSaveClick: () => void;
    onBackClick: () => void;
    onCloseClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function CommunityCreateDialogFooter({ 
    isCancelable,
    isSaveable,
    isNextDisabled, 
    onNextClick, 
    onSaveClick,
    onBackClick, 
    onCloseClick,
}: Props) {
    return (
        <DialogFooter className="flex-row justify-end">
            {isCancelable && (
                <DialogClose asChild>
                    <Button
                        variant="destructive"
                        size="lg"
                        onClick={onCloseClick}
                    >
                        Cancel
                    </Button>
                </DialogClose>
        )}

            {!isCancelable && (
            <Button
                variant="secondary"
                size="lg"
                onClick={onBackClick}
            >
                Back
            </Button>
        )}
            {isSaveable && <Button
                variant="primary"
                size="lg"
                onClick={onSaveClick}
            >
                Save
            </Button>}
            {!isSaveable && <Button
                variant="primary"
                size="lg"
                disabled={ isNextDisabled }
                onClick={onNextClick}
            >
                Next
            </Button>}
        </DialogFooter>
    );
}
