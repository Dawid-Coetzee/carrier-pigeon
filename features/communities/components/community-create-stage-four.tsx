import Checkmark from "@/components/icons/checkmark";
import Button from "@/components/ui/button";
import { useEffect } from "react";
import confetti from "canvas-confetti";

type Props = {
    name: string;
}

export default function CommunityCreateStageFour({ name }: Props) {
    useEffect(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            disableForReducedMotion: true
        });
    }, []);

    return (
        <div className="flex justify-center items-center gap-2">
            <Button
                variant="bordered"
                size="md"
            >
                <Checkmark className="text-destructive"/>
                <a href={`/mod/${name}/rules`}>Rules</a>
            </Button>
            <Button
                variant="bordered"
                size="md"
            >
                <Checkmark className="text-destructive"/>
                <a href={`/mod/${name}/guide`}>Welcome guide</a>
            </Button>
        </div>
    );
}
