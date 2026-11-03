"use client";

import { Favorite } from "@/components/icons/favorite";
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
        className="hover:bg-sidebar-button-active" 
        variant="plain" 
        size="sm" 
        isIcon
        onClick={handleClick}
    >
        <Favorite className={_isFavorite ? "text-primary-button-active": "text-text1"}/>
    </Button>
    )
}
