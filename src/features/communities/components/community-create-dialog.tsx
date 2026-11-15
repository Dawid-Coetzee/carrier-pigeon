"use client";

import Plus from "@/src/components/icons/plus";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/src/components/ui/dialog"
import CommunityPreview from "./community-preview";
import { FieldGroup } from "@/src/components/ui/field";
import { COMMUNITY_CREATE_DIALOG_HEADER_TEXT } from "../constants";
import AppSidebarMenuButton from "@/src/components/layouts/app-sidebar-menu-button";
import { CommunityCreateDialogHeader } from "./community-create-dialog-header";
import { CommunityCreateDialogFooter } from "./community-create-dialog-footer";
import CommunityCreateStageOne from "./community-create-stage-one";
import { CommunityCreateStage } from "../types";
import CommunityCreateStageTwo from "./community-create-stage-two";
import Cropper from "@/src/components/ui/cropper";
import useStage from "@/src/hooks/use-stage";
import UseCommunityCreateForm from "../hooks/use-community-create-form";
import useCommunityCreateStageOne from "../hooks/use-community-create-stage-one";
import useCommunityCreateStageTwo from "../hooks/use-community-create-stage-two";
import CommunityCreateStageThree from "./community-create-stage-three";
import CommunityCreateStageFour from "./community-create-stage-four";

export default function CommunityCreateDialog() {
    const { 
        stage,
        handleBack, 
        handleNext,
        moveTo 
    } = useStage<CommunityCreateStage>({ initialState: CommunityCreateStage.One });

    const { form, onSubmit } = UseCommunityCreateForm();
    
    const {
        name, 
        description, 
        isStageOneInvalid,
        isStageOne 
    } = useCommunityCreateStageOne({ form, stage });

    const { 
        avatar,
        activeCropper,
        banner,
        isCropping,
        isStageTwo, 
        croppedAvatar, 
        croppedBanner,
        handleClose,
        handleFile,
        handleFileDelete,
        handleFileError,
        resetMedia
    } = useCommunityCreateStageTwo({
        form,
        stage,
        moveTo
    })

    const isStageFour = stage === CommunityCreateStage.Four;

    return (
    <Dialog
        onOpenChange={(open) => {
            if (!open && isStageFour) {
                form.reset();
                resetMedia();
                moveTo(CommunityCreateStage.One);
            }
        }}
    >
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
            {(isStageOne || isStageTwo || isStageFour) && (
            <CommunityPreview 
                name={name} 
                description={description} 
                banner={croppedBanner}
                avatar={croppedAvatar}
                withImages={stage == CommunityCreateStage.Two || stage === CommunityCreateStage.Four}
            />
            )}

            {!!activeCropper && <Cropper {...activeCropper.props}/>}

            {/* Form */}
            {!isCropping && <form id="create-community" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    {stage === CommunityCreateStage.One && (
                    <CommunityCreateStageOne 
                        formControl={form.control} 
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

                    {stage === CommunityCreateStage.Three && (
                        <CommunityCreateStageThree
                            formControl={form.control}
                        />
                    )}

                    {isStageFour && (
                        <CommunityCreateStageFour 
                            name={name}
                        />
                    )}                    
                </FieldGroup>
            </form>}
                
            {/* Footer */}
            <CommunityCreateDialogFooter
                name={name}
                isCancelable={stage === CommunityCreateStage.One || isCropping}
                isSaveable={isCropping}
                isNextDisabled={isStageOneInvalid}
                isStageFour={isStageFour}
                onSave={activeCropper?.cropImage}
                onNext={handleNext}
                onBack={handleBack}
                onClose={handleClose}
            />
        </DialogContent>
    </Dialog>
    )
}
