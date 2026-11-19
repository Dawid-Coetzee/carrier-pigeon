import { communityFormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

export default function UseCommunityCreateForm() {
    const form = useForm<z.infer<typeof communityFormSchema>>({
        resolver: zodResolver(communityFormSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            description: "",
            category: "Anime & Cosplay"
        },
    })
    
    const onSubmit = (data: z.infer<typeof communityFormSchema>) => {
        console.log(data);
    };

    return { form, onSubmit  }
}
