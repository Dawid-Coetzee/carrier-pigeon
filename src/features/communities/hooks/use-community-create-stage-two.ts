import { UseFormReturn, useWatch } from "react-hook-form";
import { COMMUNITY_IMAGE_ASPECTS } from "../constants";
import { CommunityCreateStage, CommunityMediaType } from "../types";
import z from "zod";
import { communityFormSchema } from "../schema";
import useCropper from "@/src/hooks/use-cropper";
import { MouseEvent } from "react";

type Options = {
    form: UseFormReturn<z.infer<typeof communityFormSchema>>;
    stage: CommunityCreateStage;
    moveTo: (stage: CommunityCreateStage) => void;
}

export default function useCommunityCreateStageTwo ({ form, stage, moveTo }: Options) {
    const avatarCropper = useCropper({ 
        aspect: COMMUNITY_IMAGE_ASPECTS["avatar"],
        onCropComplete: (file) => {
            form.setValue("avatar", file);
            moveTo(CommunityCreateStage.Two);
            avatarCropper.reset();
        }
    });
    
    const bannerCropper = useCropper({ 
        aspect: COMMUNITY_IMAGE_ASPECTS["banner"], 
        onCropComplete: (file) => {
            form.setValue("banner", file);
            moveTo(CommunityCreateStage.Two)
            bannerCropper.reset();
        }
    });

    const [banner, avatar] = useWatch({
        control: form.control,
        name: ["banner", "avatar"],
    });
    const isStageTwo = stage === CommunityCreateStage.Two;
    const croppers = [
        bannerCropper, 
        avatarCropper
    ];
    const activeCropper = croppers.find((cropper) => cropper.originalImage);
    const isCropping = 
        (stage === CommunityCreateStage.BannerStage || 
        stage === CommunityCreateStage.AvatarStage) &&
        !!activeCropper;

    const handleFileError = (error: Error, type: CommunityMediaType) => {
        resetField(type)
        form.setError(type, {message: error.message});
    };

    const handleFileDelete = (type: CommunityMediaType) => {
        resetField(type)
    };

    const handleFile = async (file: File, type: CommunityMediaType) => {
        
        if (type === "banner") {
            moveTo(CommunityCreateStage.BannerStage);
            bannerCropper.addOriginalImage(file);
        };
        if (type === "avatar") {
            moveTo(CommunityCreateStage.AvatarStage)
            avatarCropper.addOriginalImage(file);
        };
    };

    const resetField = (type: CommunityMediaType) => {
        form.resetField(type);

        if ( type === "banner" ) {
            bannerCropper.removeCroppedImage();
        }
        
        if ( type === "avatar" ) {
            avatarCropper.removeCroppedImage();
        }
    }

    const resetMedia = () => {
        bannerCropper.removeCroppedImage();
        avatarCropper.removeCroppedImage();
    }

    const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
        if (isCropping) {
            event?.preventDefault();
            moveTo(CommunityCreateStage.Two);
            activeCropper.reset();
        }
    }

    return {
        avatar,
        activeCropper,
        banner,
        isCropping,
        isStageTwo, 
        croppedAvatar: avatarCropper.croppedImage, 
        croppedBanner: bannerCropper.croppedImage,
        handleClose,
        handleFile,
        handleFileDelete,
        handleFileError,
        resetMedia
    };
}