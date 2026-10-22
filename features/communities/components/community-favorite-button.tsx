"use client";

import { ColouredFavorite, Favorite } from "@/components/icons/favorite";
import Button from "@/components/ui/button";
import { useState, type MouseEvent } from "react";

type Props = {
    isFavorite?: boolean;
}

export default function CommunityFavoriteButton({ isFavorite = false }: Props) {
    const [ _isFavorite, setIsFavorite ] = useState<boolean>(isFavorite);
    
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();

            setIsFavorite((prev) => !prev)

            // server action
        }

    return (
    <Button 
        className="hover:bg-[#c9a876]" 
        variant="plain" 
        size="sm" 
        isIcon
        onClick={handleClick}
    >
        {_isFavorite ? <ColouredFavorite /> : <Favorite />}
    </Button>
    )
}
