import { Field, FieldCount, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Control, Controller } from "react-hook-form";
import { MAX_NAME_LENGTH, TEXTAREA_ROWS } from "../constants";
import { Textarea } from "@/components/ui/textarea";
import { communityFormSchema } from "../schema";
import z from "zod";
import { cn } from "@/lib/utils";


type Props = {
    formControl: Control<z.infer<typeof communityFormSchema>>;
    name: string;
    description: string;
}

export default function CommunityCreateStageOne({ formControl, name, description }: Props) {
    return (
        <>
            <Controller
                    name="name"
                    control={formControl}
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
                    control={formControl}
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
        </>
    );
}
