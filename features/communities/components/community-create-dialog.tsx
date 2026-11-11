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
import { MIN_DESCRIPTION_LENGTH, MIN_NAME_LENGTH } from "../constants";
import { communityFormSchema } from "../schema";
import AppSidebarMenuButton from "@/components/layouts/app-sidebar-menu-button";
import { CommunityCreateDialogHeader } from "./community-create-dialog-header";
import { CommunityCreateDialogFooter } from "./community-create-dialog-footer";
import CommunityCreateStageOne from "./community-create-stage-one";
import { useState } from "react";
import { CommunityCreateStage, ReadAs } from "../types";
import { CommunityMediaType } from "../types/index";
import CommunityCreateStageTwo from "./community-create-stage-two";
import { readFileAsync } from "@/lib/read-file";

export default function CommunityCreateDialog() {
    const [stage, setStage] = useState<CommunityCreateStage>(
        CommunityCreateStage.One
    );
    const [bannerImage, setBannerImage] = useState<string>("");
    const [avatarImage, setAvatarImage] = useState<string>("");

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

    const handleNext = () => {
        //handle state of the stage
        setStage((prev) => prev + 1);

    };

    const handleBack = () => {
        //handle state of the stage
        setStage((prev) => prev - 1);
    };

    const handleFileError = (error: Error, type: CommunityMediaType) => {
        form.resetField(type);
        form.setError(type, {message: error.message});
    };

    const handleFileDelete = (type: CommunityMediaType) => {
        form.resetField(type);
    };

    const handleFile = async (file: File, type: CommunityMediaType) => {
        try {
            const result = await readFileAsync(file, ReadAs.ReadAsDataURL);

            if (typeof result === "string") {
                if (type === "banner") setBannerImage(result);
                if (type === "avatar") setAvatarImage(result);
            }
        } catch (error) {
            if (error instanceof Error) {
                form.setError(type, {message: error.message})
            }
        }
    };

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
            <CommunityCreateDialogHeader stage={stage} />

            {/* Preview Card */}
            {(stage === CommunityCreateStage.One || 
            stage === CommunityCreateStage.Two) && (
            <CommunityPreview 
                name={name} 
                description={description} 
                banner={bannerImage}
                avatar={avatarImage}
                withImages={stage == CommunityCreateStage.Two}
            />
            )}

            {/* Form */}
            <form id="create-community" onSubmit={form.handleSubmit(onSubmit)}>
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
            </form>
                
            {/* Footer */}
            <CommunityCreateDialogFooter 
                stage={stage}
                isNextDisabled={isNameInvalid || isDescription} 
                onNextClick={handleNext}
                onBackClick={handleBack}
            />
        </DialogContent>
    </Dialog>
    
    )
}
