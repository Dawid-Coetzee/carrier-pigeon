import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Control, Controller } from "react-hook-form";
import { communityFormSchema } from "../schema";
import z from "zod";
import { Dropzone, DropzoneButton } from "@/components/ui/dropzone";
import Button from "@/components/ui/button";
import Trash from "@/components/icons/trash";
import { cn } from "@/lib/utils";


type Props = {
    formControl: Control<z.infer<typeof communityFormSchema>>;
    banner?: File;
    onFileError: (error: Error, type: CommunityMediaType) => void;
    onFileDelete: (type: CommunityMediaType) => void;
    avatar?: File;
}

const COMMUNITY_CREATE_MEDIA_TYPES = ["banner", "avatar"] as const;
export type CommunityMediaType = typeof COMMUNITY_CREATE_MEDIA_TYPES[number];

export default function CommunityCreateStageTwo({ 
    formControl, 
    banner, 
    onFileError, 
    onFileDelete,
    avatar
}: Props) {
    return COMMUNITY_CREATE_MEDIA_TYPES.map(type => (
            <Controller
                key={type}
                name={type}
                control={formControl}
                render={({ field: { onChange, ...restFields }, fieldState }) => (
                    <Field className="gap-0.5" data-invalid={fieldState.invalid}>
                        <div 
                            className={cn(
                                "py-2 px-4 text-sm rounded-sm", 
                                "flex items-center justify-between", 
                                "text-text1 hover:bg-primary-button-normal border"
                            )}>
                            <FieldLabel className="capitalize">{type}</FieldLabel>
                                <Dropzone 
                                    multiple={false}
                                    accept={{ "image/*": [] }}
                                    src={
                                        type === "banner" && banner 
                                            ? [banner] 
                                            : type === "avatar" && avatar 
                                            ? [avatar] 
                                            : []
                                        }
                                    onDrop={(files: File[]) => {
                                        onChange(files[0])
                                    }}
                                    onError={(error) => {onFileError(error, type)}}
                                    {...restFields}
                                >
                                    <DropzoneButton />
                                </Dropzone>
                        </div>

                        {((type === "banner" && banner) || (type === "avatar" && avatar)) && (
                        <div
                            className={cn(
                                "px-4 text-sm rounded-sm", 
                                "flex items-center justify-between", 
                                "text-text2 border border-text2"
                            )}
                        >
                            <p>{type ==="banner" ? banner?.name : avatar?.name }</p>
                            <Button
                                variant="plain" 
                                size="sm" 
                                isIcon
                                onClick={() => {onFileDelete(type)}}
                            >
                                <Trash className="size-4" />
                            </Button>
                        </div>)}

                        {fieldState.invalid && (
                            <FieldError className="px-4" errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
    ));
}
