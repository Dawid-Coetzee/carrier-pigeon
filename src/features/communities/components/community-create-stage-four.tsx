import Checkmark from "@/src/components/icons/checkmark";
import Button from "@/src/components/ui/button";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import Link from "next/link";

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
                <Link href={`/mod/${name}/rules`}>Rules</Link>
            </Button>
            <Button
                variant="bordered"
                size="md"
            >
                <Checkmark className="text-destructive"/>
                <Link href={`/mod/${name}/guide`}>Welcome guide</Link>
            </Button>
        </div>
    );
}
