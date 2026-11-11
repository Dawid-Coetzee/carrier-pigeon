"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import * as z from "zod"
import Plus from "@/components/icons/plus";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import CommunityPreview from "./community-preview";
import { FieldGroup } from "@/components/ui/field";
import { COMMUNITY_CREATE_DIALOG_HEADER_TEXT, MIN_DESCRIPTION_LENGTH, MIN_NAME_LENGTH } from "../constants";
import { communityFormSchema } from "../schema";
import AppSidebarMenuButton from "@/components/layouts/app-sidebar-menu-button";
import { CommunityCreateDialogHeader } from "./community-create-dialog-header";
import { CommunityCreateDialogFooter } from "./community-create-dialog-footer";
import CommunityCreateStageOne from "./community-create-stage-one";
import { useState, MouseEvent } from "react";
import { CommunityCreateStage, CommunityImage, ReadAs } from "../types";
import { CommunityMediaType } from "../types/index";
import CommunityCreateStageTwo from "./community-create-stage-two";
import { readFileAsync } from "@/lib/read-file";
import ReactCrop, { type Crop } from 'react-image-crop'
import Image from "next/image";


export default function CommunityCreateDialog() {
    const [stage, setStage] = useState<CommunityCreateStage>(
        CommunityCreateStage.One
    );
    const [image, setImage] = useState<CommunityImage | null>(null);
    const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);
    const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);
    const [crop, setCrop] = useState<Crop>()

    const form = useForm<z.infer<typeof communityFormSchema>>({
        resolver: zodResolver(communityFormSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            description: ""
        },
    })
    const { control } = form;
    const name = useWatch({ control, name: "name", defaultValue: "" });
    const description = useWatch({
        control,
        name: "description",
        defaultValue: "",
    });
    const banner = useWatch({ control, name: "banner" });
    const avatar = useWatch({ control, name: "avatar" });

    const isNameInvalid = name.length < MIN_NAME_LENGTH;
    const isDescription = description.length < MIN_DESCRIPTION_LENGTH
    const isCropping = 
        (stage === CommunityCreateStage.BannerStage ||
        stage === CommunityCreateStage.AvatarStage) && 
        !!image;
    const isPreviewVisible = (stage === CommunityCreateStage.One || 
            stage === CommunityCreateStage.Two);

    const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
        if (isCropping) {
            event.preventDefault();
            setStage(CommunityCreateStage.Two);
            setImage(null);
        }
    }

    const handleNext = () => {
        //handle state of the stage
        setStage((prev) => prev + 1);

    };

    const handleBack = () => {
        //handle state of the stage
        setStage((prev) => prev - 1);
    };

    const handleFileError = (error: Error, type: CommunityMediaType) => {
        resetField(type)
        form.setError(type, {message: error.message});
    };

    const handleFileDelete = (type: CommunityMediaType) => {
        resetField(type)
    };

    const handleFile = async (file: File, type: CommunityMediaType) => {
        setImage({file, type})
        if (type === "banner") setStage(CommunityCreateStage.BannerStage);
        if (type === "avatar") setStage(CommunityCreateStage.AvatarStage);
    };

    const resetField = (type: CommunityMediaType) => {
        form.resetField(type);
        if (type === "avatar") setAvatarImage(undefined);
        if (type === "banner") setBannerImage(undefined);
    }

    const onSubmit = (data: z.infer<typeof communityFormSchema>) => {
        console.log(data);
    };

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
            {isPreviewVisible && (
            <CommunityPreview 
                name={name} 
                description={description} 
                banner={bannerImage}
                avatar={avatarImage}
                withImages={stage == CommunityCreateStage.Two}
            />
            )}

            {isCropping && (
                <div className="w-full min-h-cropping-container-height bg-text1 p-2 items-center justify-center">
                    <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                        <Image 
                            src={""} 
                            alt="" 
                            width={1000} 
                            height={1000} 
                        />
                    </ReactCrop>
                </div>
            )}

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
                isNextDisabled={isNameInvalid || isDescription}
                onSave={() => {}} // TODO: add functionality
                onNext={handleNext}
                onBack={handleBack}
                onClose={handleClose}
            />
        </DialogContent>
    </Dialog>
    
    )
}
