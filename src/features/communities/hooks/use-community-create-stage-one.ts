import { UseFormReturn } from "react-hook-form";
import { CommunityCreateStage } from "../types";
import z from "zod";
import { communityFormSchema } from "../schema";

type Options = {
    form: UseFormReturn<z.infer<typeof communityFormSchema>>;
    stage: CommunityCreateStage;
}

export default function useCommunityCreateStageOne ({ form, stage}: Options) {
    const { name, description } = form.watch();
    const isNameInvalid = !communityFormSchema.shape.name.safeParse(name).success;
    const isDescriptionInvalid = !communityFormSchema.shape.description.safeParse(description).success;
    const isStageOne = stage === CommunityCreateStage.One;

    return { 
        name, 
        description, 
        isStageOneInvalid: isStageOne && (isNameInvalid || isDescriptionInvalid), 
        isStageOne 
    };
}