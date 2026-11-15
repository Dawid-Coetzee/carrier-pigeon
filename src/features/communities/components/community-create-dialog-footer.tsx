import Button from "@/src/components/ui/button";
import { DialogClose, DialogFooter } from "@/src/components/ui/dialog";
import Link from "next/link";
import { MouseEvent } from "react";

type Props = {
    name: string;
    isCancelable: boolean;
    isSaveable: boolean;
    isNextDisabled: boolean;
    isStageFour: boolean;
    onNext: () => void;
    onSave?: () => void;
    onBack: () => void;
    onClose: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function CommunityCreateDialogFooter({
    name,
    isCancelable,
    isSaveable,
    isNextDisabled, 
    isStageFour,
    onNext, 
    onSave,
    onBack, 
    onClose,
}: Props) {
    return (
        <DialogFooter className="flex-row justify-end">
            {(isCancelable && !isStageFour) && (
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

            {(!isCancelable && !isStageFour) && (
            <Button
                variant="secondary"
                size="lg"
                onClick={onBack}
            >
                Back
            </Button>
        )}
            {(isSaveable && !isStageFour) && <Button
                variant="primary"
                size="lg"
                onClick={onSave}
            >
                Save
            </Button>}
            {(!isSaveable && !isStageFour) && <Button
                variant="primary"
                size="lg"
                disabled={ isNextDisabled }
                onClick={onNext}
            >
                Next
            </Button>}
            {isStageFour && <Button
                variant="bordered"
                size="lg"
            >
                <Link href={`/p/${name}`}>Go to Community Page</Link>
            </Button>}
        </DialogFooter>
    );
}
