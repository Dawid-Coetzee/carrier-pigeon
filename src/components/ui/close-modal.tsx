"use client";

import XIcon from "@/src/components/icons/XIcon";
import Button from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

export default function CloseModal() {
    const router = useRouter();

    return (
        <Button 
            className="absolute top-4 right-4"
            variant="plain" 
            size="sm" 
            isIcon
            onClick={() => router.back()}
            >
            <XIcon aria-hidden/>
            <span className="sr-only">Close modal</span>
        </Button>
    );
}
