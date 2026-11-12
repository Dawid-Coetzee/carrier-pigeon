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
import { CommunityMediaType, CommunityPreviewImages } from "../types/index";
import CommunityCreateStageTwo from "./community-create-stage-two";
import { convertToPixelCrop, PercentCrop, PixelCrop } from 'react-image-crop'
import { getAspectCenterCrop } from "@/lib/cropper";
import Cropper from "@/components/ui/cropper";
import useStage from "@/hooks/use-stage";

export default function CommunityCreateDialog() {
    // moving to stage
    const { 
        stage, 
        handleBack, 
        handleNext, 
        moveTo 
    } = useStage<CommunityCreateStage>({ initialState: CommunityCreateStage.One });

    // form
    const form = useForm<z.infer<typeof communityFormSchema>>({
        resolver: zodResolver(communityFormSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            description: ""
        },
    })

    const onSubmit = (data: z.infer<typeof communityFormSchema>) => {
        console.log(data);
    };
    
    // stage 1
    const { name, description } = form.watch();
    const isNameInvalid = name.length < MIN_NAME_LENGTH;
    const isDescription = description.length < MIN_DESCRIPTION_LENGTH;
    const isPreviewVisibleStage1 = stage === CommunityCreateStage.One;

    // cropper
    const [image, setImage] = useState<CommunityImage | null>(null);
    const [previewImages, setPreviewImages] = useState<CommunityPreviewImages>({});
    const [percentCrop, setPercentCrop] = useState<PercentCrop>();
    const isCropping = 
        (stage === CommunityCreateStage.BannerStage ||
        stage === CommunityCreateStage.AvatarStage) && 
        !!image;
    const resetCropping = (event?: MouseEvent<HTMLButtonElement>) => {
        if (isCropping) {
            event?.preventDefault();
            moveTo(CommunityCreateStage.Two);
            setImage(null);
        }
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
    const imageRef = useRef<HTMLImageElement>(null);

    

    // stage 2
    const { banner, avatar } = form.watch();
    const isPreviewVisibleStage2 = stage === CommunityCreateStage.Two;

    const handleFileError = (error: Error, type: CommunityMediaType) => {
        resetField(type)
        form.setError(type, {message: error.message});
    };

    const handleFileDelete = (type: CommunityMediaType) => {
        resetField(type)
    };

    const handleFile = async (file: File, type: CommunityMediaType) => {
        setImage({file, type})
        if (type === "banner") moveTo(CommunityCreateStage.BannerStage);
        if (type === "avatar") moveTo(CommunityCreateStage.AvatarStage);
    };

    const resetField = (type: CommunityMediaType) => {
        form.resetField(type);

        setPreviewImages(prev => ({...prev, [type]: undefined}));
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
            {(isPreviewVisibleStage1 || isPreviewVisibleStage2) && (
            <CommunityPreview 
                name={name} 
                description={description} 
                banner={previewImages.banner}
                avatar={previewImages.avatar}
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
                    const canvasElement = document.createElement("canvas");
                    if ( !imageElement || !percentCrop || !image ) {
                        throw new Error("Not enough information, missing image, imageElement or percentCrop")
                    }
                    const context = canvasElement.getContext("2d");
                    
                    if (!context) {
                        throw new Error("canvas context is not available!")
                    }
                    // 2.2 get the image width and height
                    const { naturalWidth, naturalHeight } = imageElement;
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

                    canvasElement.toBlob((blob) => {
                        if (!blob) {
                            throw new Error("Conversion error: missing blob");
                        }
                        // 3.1 get the cropped image url from blob
                        // 3.2 get the cropped image file from blob 
                        const croppedImageURL = URL.createObjectURL(blob);
                        const croppedImageFile = new File([blob], image.file.name, { 
                            type: image.file.type, 
                        })
                        // 3.3 set the file to the form to send request to our backend to process in future
                        form.setValue(image.type, croppedImageFile);
                        // 3.4 set the image url state so that we can render on preview card
                        setPreviewImages(prev => ({...prev, [image.type]: croppedImageURL}))
                        
                        resetCropping();
                    })
                    
                }} // TODO: add functionality
                onNext={handleNext}
                onBack={handleBack}
                onClose={resetCropping}
            />
        </DialogContent>
    </Dialog>
    
    )
}
