import { UseFormReturn } from "react-hook-form";
import { MIN_DESCRIPTION_LENGTH, MIN_NAME_LENGTH } from "../constants";
import { CommunityCreateStage } from "../types";
import z from "zod";
import { communityFormSchema } from "../schema";

type Options = {
    form: UseFormReturn<z.infer<typeof communityFormSchema>>;
    stage: CommunityCreateStage;
}

export default function useCommunityCreateStageOne ({ form, stage}: Options) {
    const { name, description } = form.watch();
    const isNameInvalid = name.length < MIN_NAME_LENGTH;
    const isDescriptionInvalid = description.length < MIN_DESCRIPTION_LENGTH;
    const isPreviewVisibleStageOne = stage === CommunityCreateStage.One;

    return { 
        name, 
        description, 
        isStageOneInvalid: isPreviewVisibleStageOne && (isNameInvalid || isDescriptionInvalid), 
        isPreviewVisibleStageOne 
    };
}