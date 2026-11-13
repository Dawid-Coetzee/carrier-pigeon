import Button from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { MouseEvent } from "react";

type Props = {
    isCancelable: boolean;
    isSaveable: boolean;
    isNextDisabled: boolean;
    onNext: () => void;
    onSave?: () => void;
    onBack: () => void;
    onClose: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function CommunityCreateDialogFooter({ 
    isCancelable,
    isSaveable,
    isNextDisabled, 
    onNext, 
    onSave,
    onBack, 
    onClose,
}: Props) {
    return (
        <DialogFooter className="flex-row justify-end">
            {isCancelable && (
                <DialogClose asChild>
                    <Button
                        variant="destructive"
                        size="lg"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </DialogClose>
        )}

            {!isCancelable && (
            <Button
                variant="secondary"
                size="lg"
                onClick={onBack}
            >
                Back
            </Button>
        )}
            {isSaveable && <Button
                variant="primary"
                size="lg"
                onClick={onSave}
            >
                Save
            </Button>}
            {!isSaveable && <Button
                variant="primary"
                size="lg"
                disabled={ isNextDisabled }
                onClick={onNext}
            >
                Next
            </Button>}
        </DialogFooter>
    );
}
