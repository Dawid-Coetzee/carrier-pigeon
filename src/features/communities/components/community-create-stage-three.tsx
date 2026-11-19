import { Field } from "@/src/components/ui/field";
import { Control, Controller } from "react-hook-form";
import { communityFormSchema } from "../schema";
import z from "zod";
import { cn } from "@/src/lib/utils";
import Button from "@/src/components/ui/button";
import Checkmark from "@/src/components/icons/checkmark";

const buttons = [
    {
        name: "Anime & Cosplay",
        icon: "🎭",
    },
    {
        name: "Art",
        icon: "🎨",
    },
    {
        name: "Business & Finance",
        icon: "💰",
    },
    {
        name: "Collectibles & Other Hobbies",
        icon: "🧸",
    },
    {
        name: "Education & Career",
        icon: "🎓",
    },
    {
        name: "Fashion & Beauty",
        icon: "💄",
    },
    {
        name: "Food & Drinks",
        icon: "🍽️",
    },
    {
        name: "Games",
        icon: "🎮",
    },
    {
        name: "Health",
        icon: "🏥",
    },
    {
        name: "Home & Garden",
        icon: "🏡",
    },
    {
        name: "Humanities & Law",
        icon: "⚖️",
    },
    {
        name: "Identity & Relationships",
        icon: "🫂",
    },
    {
        name: "Internet Culture",
        icon: "🌐",
    },
    {
        name: "Movies & TV",
        icon: "🎬",
    },
    {
        name: "Music",
        icon: "🎵",
    },
    {
        name: "Nature & Outdoors",
        icon: "🌿",
    },
    {
        name: "News & Politics",
        icon: "📰",
    },
    {
        name: "Places & Travel",
        icon: "✈️",
    },
    {
        name: "Pop Culture",
        icon: "🌟",
    },
    {
        name: "Q&As & Stories",
        icon: "💬",
    },
    {
        name: "Reading & Writing",
        icon: "📚",
    },
    {
        name: "Sciences",
        icon: "🔬",
    },
    {
        name: "Spooky",
        icon: "👻",
    },
    {
        name: "Sports",
        icon: "🏆",
    },
    {
        name: "Technology",
        icon: "💻",
    },
    {
        name: "Vehicles",
        icon: "🚗",
    },
    {
        name: "Wellness",
        icon: "🧘",
    },
];

type Props = {
    formControl: Control<z.infer<typeof communityFormSchema>>;
}



export default function CommunityCreateStageThree({ formControl }: Props) {
    return (
        <Controller
            name="category"
            control={formControl}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <div className="flex flex-wrap justify-center items-center gap-1">
                        {buttons.map(({ name, icon }) => {
                        const isSelected = field.value === name;
                            
                        return (
                            <Button 
                                key={name}
                                type="button"
                                variant={!isSelected ? "secondary" : "selected"}
                                size="sm"
                                className={cn("px-2.5 text-xs")}
                                aria-pressed={isSelected}
                                onClick={() => field.onChange(name)}
                            >
                                {isSelected ? <Checkmark className="size-5 aria-hidden"/> : null}
                                <span aria-hidden="true">{icon}</span>
                                {name}
                            </Button>
                        )})}
                    </div>
                </Field>
            )}
        />
    );
}
