"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import * as z from "zod"
import Plus from "@/components/icons/plus";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Button from "@/components/ui/button";
import CommunityPreview from "./community-preview";
import { Field, FieldError, FieldGroup, FieldCount } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { MAX_NAME_LENGTH, MIN_DESCRIPTION_LENGTH, MIN_NAME_LENGTH, TEXTAREA_ROWS } from "../constants";
import { communityFormSchema } from "../schema";
import AppSidebarMenuButton from "@/components/layouts/app-sidebar-menu-button";
import { CommunityCreateDialogHeader } from "./community-create-dialog-header";
import { CommunityCreateDialogFooter } from "./community-create-dialog-footer";

export default function CommunityCreateDialog() {
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

    const isNameInvalid = name.length < MIN_NAME_LENGTH;
    const isDescription = description.length < MIN_DESCRIPTION_LENGTH

    function onSubmit(data: z.infer<typeof communityFormSchema>) {
        console.log(data)
    }
    return (
    <Dialog>
        <DialogTrigger asChild>
            <AppSidebarMenuButton title="Create Community" icon={<Plus className="size-6"/>}/>
        </DialogTrigger>
        <DialogContent className="border-2 rounded-2xl p-4 gap-8">
            {/* Header */}
            <CommunityCreateDialogHeader />

            {/* Preview Card */}
            <CommunityPreview 
                name={name} 
                description={description} 
                banner="" 
                avatar="" 
                withImages={false}
            />

            {/* Form */}
            <form id="create-community" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <CommunityCreateStageOne formControl={form.control} name={name} description={description} />
                </FieldGroup>
            </form>
                
            <CommunityCreateDialogFooter isNextDisabled={isNameInvalid || isDescription}/>
        </DialogContent>
    </Dialog>
    
    )
}
