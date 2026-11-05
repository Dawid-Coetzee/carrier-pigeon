"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import Plus from "@/components/icons/plus";
import { SidebarMenuButton } from "@/components/ui/sidebar";
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
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";

const formSchema = z.object({
    title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
    description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

export default function CommunityCreate() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
        console.log(data)
    }
    return (
    <Dialog>
        <DialogTrigger asChild>
            <SidebarMenuButton className="cursor-pointer">
                <span className="size-8 flex items-center justify-center">
                    <Plus className="size-5" />
                </span>
                <span>Create Community</span>
            </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent className="border-2 rounded-2xl p-4 gap-8">
            <DialogHeader className="text-left gap-8">
                <DialogTitle className="text-2xl font-bold tracking-tight pt-8 text-center">Enlighten us concerning your community</DialogTitle>
                <DialogDescription className="text-description-text font-medium">
                    A name and description would greatly enlighten people as to the nature of your community.
                </DialogDescription>
            </DialogHeader>

            {/* Preview Card */}
            <CommunityPreview banner="" avatar="" withImages={false}/>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <Input
                                {...field}
                                id="community-name"
                                label="Community name"
                                required
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                    />
                    
                </FieldGroup>
            </form>
                
            <DialogFooter className="flex-row justify-end">
                <Button
                    variant="secondary"
                    size="lg"
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                >
                    Next
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    
    )
}
