"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
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
import { Field, FieldError, FieldGroup, FieldCount } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const MAX_NAME_LENGTH = 21;
const MIN_NAME_LENGTH = 3;
const TEXTAREA_ROWS = 8;
const MIN_DESCRIPTION_LENGTH = 1;

const formSchema = z.object({
    name: z
    .string()
    .min(MIN_NAME_LENGTH, `Please lengthen this text to ${MIN_NAME_LENGTH} characters or more.`),
    description: z
    .string()
})

export default function CommunityCreate() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
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
            <CommunityPreview name={name} description={description} banner="" avatar="" withImages={false}/>
            <form id="create-community" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                    name="name"
                    control={form.control}
                    render={({ field: { onChange, ...restFields }, fieldState }) => (
                        <Field className="gap-1" data-invalid={fieldState.invalid}>
                            <Input
                                {...restFields}
                                id="community-name"
                                prefix="p/"
                                label="Community name"
                                required
                                onChange={(event) => {
                                    const valueLength = restFields.value.length;

                                    if (valueLength < MAX_NAME_LENGTH) {
                                        onChange(event);
                                    }
                                }
                                }
                                aria-invalid={fieldState.invalid}
                            />
                            <div 
                            className={cn(
                                "flex flex-row-reverse gap-2 justify-between",
                                "px-4"
                            )}>
                                <FieldCount 
                                    className={fieldState.invalid ? "text-destructive" : "text-muted-foreground"} 
                                    length={restFields.value.length} 
                                    max={MAX_NAME_LENGTH} 
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </div>
                        </Field>
                    )}
                    />

                    <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="gap-1" data-invalid={fieldState.invalid}>
                            <Textarea
                                {...field}
                                id="community-name"
                                label="Description"
                                rows={TEXTAREA_ROWS}
                                required
                                aria-invalid={fieldState.invalid}
                            />
                            <div 
                            className={cn(
                                "flex flex-row-reverse gap-2 justify-between",
                                "px-4"
                            )}>
                                <FieldCount 
                                    className={fieldState.invalid ? "text-destructive" : "text-muted-foreground"} 
                                    length={field.value.length} 
                                />
                            </div>
                        </Field>
                        
                    )}
                    />
                </FieldGroup>
            </form>
                
            <DialogFooter className="flex-row justify-end">
                <Button
                    variant="destructive"
                    size="lg"
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                    disabled={isNameInvalid || isDescription }
                >
                    Next
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    
    )
}
