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
import { CommunityCreateStage } from "../types";
import CommunityCreateStageTwo, { CommunityMediaType } from "./community-create-stage-two";

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

    enum ReadAs {
        ReadAsText = "readAsText",
        ReadAsArrayBuffer = "readAsArrayBuffer",
        ReadAsDataURL = "readAsDataURL"
    }

    const readFileAsync = (
        file: File, 
        readAs: ReadAs
    ): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const target = event.target;
                if (target) {
                    const result = target.result;

                    resolve(result);
                } else {
                    reject(new Error("Invalid target"))
                }
            }

            reader.onerror = () => {
                reject(new Error("Something has gone wrong while reading the file"))
            }

            reader[readAs](file);
        });
        
    }

    const handleFile = async (file: File, type: CommunityMediaType) => {
        try {
            // file must be url in order to be rendered as a image
            const result = await readFileAsync(file, ReadAs.ReadAsDataURL);

            // set the value in state => bannerImage or avatarImage
            if (typeof result === "string") {
                if (type === "banner") setBannerImage(result);
                if (type === "avatar") setAvatarImage(result);
            }
        } catch (error) {
            // if error happens while doing it set the error to the specific form field
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
