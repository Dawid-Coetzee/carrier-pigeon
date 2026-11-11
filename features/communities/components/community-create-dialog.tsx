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
import { COMMUNITY_CREATE_DIALOG_HEADER_TEXT, COMMUNITY_IMAGE_ASPECTS, MIN_DESCRIPTION_LENGTH, MIN_NAME_LENGTH } from "../constants";
import { communityFormSchema } from "../schema";
import AppSidebarMenuButton from "@/components/layouts/app-sidebar-menu-button";
import { CommunityCreateDialogHeader } from "./community-create-dialog-header";
import { CommunityCreateDialogFooter } from "./community-create-dialog-footer";
import CommunityCreateStageOne from "./community-create-stage-one";
import { useState, MouseEvent, SyntheticEvent, useMemo, useRef } from "react";
import { CommunityCreateStage, CommunityImage } from "../types";
import { CommunityMediaType } from "../types/index";
import CommunityCreateStageTwo from "./community-create-stage-two";
import { convertToPixelCrop, PercentCrop, PixelCrop } from 'react-image-crop'

import { getAspectCenterCrop } from "@/lib/cropper";
import Cropper from "@/components/ui/cropper";


export default function CommunityCreateDialog() {
    const [stage, setStage] = useState<CommunityCreateStage>(
        CommunityCreateStage.One
    );
    const [image, setImage] = useState<CommunityImage | null>(null);
    const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);
    const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);
    const [percentCrop, setPercentCrop] = useState<PercentCrop>();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

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

    const onImageLoad = (event: SyntheticEvent<HTMLImageElement>, type: CommunityMediaType) => {
        const { naturalWidth: width, naturalHeight: height } = event.currentTarget

        const aspectCenterCrop = getAspectCenterCrop(
            COMMUNITY_IMAGE_ASPECTS[type],
            width,
            height
        )

        setPercentCrop(aspectCenterCrop)
    };

    const onCropChange = (_: PixelCrop, percentCrop: PercentCrop) => setPercentCrop(percentCrop);

    const imageURL = useMemo(() => image ? URL.createObjectURL(image.file) : "", [image]);

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
                <Cropper
                    ref={imageRef} 
                    crop={percentCrop}
                    onChange={onCropChange}
                    aspect={COMMUNITY_IMAGE_ASPECTS[image.type]}
                    src={imageURL}
                    alt={`${name}'s ${image.type}`}
                    width={500}
                    height={500}
                    onLoad={(event) => {
                        onImageLoad(event, image.type)
                    }}
                />
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
                onSave={() => {
                    // 1. get the image, canvas, and percent crop size
                    // 2. use canvas to get cropped image using the drawImage method
                    // 2.1 with the canvas get the context
                    const imageElement = imageRef.current;
                    const canvasElement = canvasRef.current;
                    if (!canvasElement || !imageElement || !percentCrop) {
                        throw new Error("Not enough information, missing canvas, image, or percentCrop")
                    }
                    const context = canvasElement.getContext("2d");
                    
                    if (!context) {
                        throw new Error("canvas context is not available!")
                    }
                    // 2.2 get the image width and height
                    const { width, height, naturalWidth, naturalHeight } = imageElement;
                    // 2.3 convert percentage crop object to pixel crop
                    // 2.4 get the values of sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
                    const {
                        x: sx, 
                        y: sy, 
                        width: sWidth, 
                        height: sHeight
                    } = convertToPixelCrop(percentCrop, naturalWidth, naturalHeight)

                    canvasElement.width = sWidth;
                    canvasElement.height = sHeight
                    // 2.5 draw the image
                    context.drawImage(
                        imageElement, 
                        sx, 
                        sy, 
                        sWidth, 
                        sHeight, 
                        0, 
                        0, 
                        sWidth, 
                        sHeight
                    )
                    // 3. convert the canvas to blob
                    // 3.1 get the cropped image url from blob so that we can render on preview card
                    // 3.2 get the cropped image file from blob to send request to our backend to process in future
                }} // TODO: add functionality
                onNext={handleNext}
                onBack={handleBack}
                onClose={handleClose}
            />
        </DialogContent>
    </Dialog>
    
    )
}
