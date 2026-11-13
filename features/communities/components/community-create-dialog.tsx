"use client";

import Plus from "@/components/icons/plus";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import CommunityPreview from "./community-preview";
import { FieldGroup } from "@/components/ui/field";
import { COMMUNITY_CREATE_DIALOG_HEADER_TEXT, COMMUNITY_IMAGE_ASPECTS } from "../constants";
import AppSidebarMenuButton from "@/components/layouts/app-sidebar-menu-button";
import { CommunityCreateDialogHeader } from "./community-create-dialog-header";
import { CommunityCreateDialogFooter } from "./community-create-dialog-footer";
import CommunityCreateStageOne from "./community-create-stage-one";
import { CommunityCreateStage } from "../types";
import { CommunityMediaType } from "../types/index";
import CommunityCreateStageTwo from "./community-create-stage-two";
import Cropper from "@/components/ui/cropper";
import useStage from "@/hooks/use-stage";
import UseCommunityCreateForm from "../hooks/use-community-create-form";
import useCommunityCreateStageOne from "../hooks/use-community-create-stage-one";
import useCropper from "@/hooks/use-cropper";
import { MouseEvent } from "react";

export default function CommunityCreateDialog() {
    // moving to stage
    const { 
        stage, 
        handleBack, 
        handleNext, 
        moveTo 
    } = useStage<CommunityCreateStage>({ initialState: CommunityCreateStage.One });

    // form
    const { form, onSubmit } = UseCommunityCreateForm();
    
    // stage 1
    const {
        name, 
        description, 
        isStageOneInvalid,
        isPreviewVisibleStageOne 
    } = useCommunityCreateStageOne({ form, stage });

    // cropper
    const bannerCropper = useCropper({ 
        aspect: COMMUNITY_IMAGE_ASPECTS["banner"], 
        onCropComplete: (file) => {
            form.setValue("banner", file);
            moveTo(CommunityCreateStage.Two);
            bannerCropper.reset();
        }
    });
    const avatarCropper = useCropper({ 
        aspect: COMMUNITY_IMAGE_ASPECTS["avatar"],
        onCropComplete: (file) => {
            form.setValue("avatar", file);
            moveTo(CommunityCreateStage.Two);
            avatarCropper.reset();
        }
    });

    // stage 2
    const { banner, avatar } = form.watch();
    const isPreviewVisibleStageTwo = stage === CommunityCreateStage.Two;

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

    const croppers = [
        bannerCropper, 
        avatarCropper
    ];
    const activeCropper = croppers.find((cropper) => cropper.originalImage);
    const isCropping = 
        (stage === CommunityCreateStage.BannerStage || 
        stage === CommunityCreateStage.AvatarStage) &&
        !!activeCropper;

    const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
        if (isCropping) {
            event?.preventDefault();
            moveTo(CommunityCreateStage.Two);
            activeCropper.reset();
        }
    }

    return (
    <Dialog>
        <DialogTrigger asChild>
            <AppSidebarMenuButton title="Create Community" icon={<Plus className="size-6"/>}/>
        </DialogTrigger>
        <DialogContent className="border-2 rounded-2xl p-4 gap-8">
            {/* Header */}
            <CommunityCreateDialogHeader 
                title={COMMUNITY_CREATE_DIALOG_HEADER_TEXT[stage].title} 
                description={COMMUNITY_CREATE_DIALOG_HEADER_TEXT[stage].description} 
            />

            {/* Preview Card */}
            {(isPreviewVisibleStageOne || isPreviewVisibleStageTwo) && (
            <CommunityPreview 
                name={name} 
                description={description} 
                banner={bannerCropper.croppedImage}
                avatar={avatarCropper.croppedImage}
                withImages={stage == CommunityCreateStage.Two}
            />
            )}

            {isCropping && <Cropper {...activeCropper.props}/>}

            {/* Form */}
            {!isCropping && <form id="create-community" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    {stage === CommunityCreateStage.One && (
                    <CommunityCreateStageOne 
                        formControl={form.control} 
                        name={name} 
                        description={description} 
                    />
                    )}

                    {stage === CommunityCreateStage.Two && (
                    <CommunityCreateStageTwo 
                        formControl={form.control} 
                        banner={banner}
                        avatar={avatar}
                        onFileError={handleFileError}
                        onFileDelete={handleFileDelete}
                        onFileChange={handleFile}
                    />
                    )}
                </FieldGroup>
            </form>}
                
            {/* Footer */}
            <CommunityCreateDialogFooter 
                isCancelable={stage === CommunityCreateStage.One || isCropping}
                isSaveable={isCropping}
                isNextDisabled={isStageOneInvalid}
                onSave={activeCropper?.cropImage}
                onNext={handleNext}
                onBack={handleBack}
                onClose={handleClose}
            />
        </DialogContent>
    </Dialog>
    )
}
