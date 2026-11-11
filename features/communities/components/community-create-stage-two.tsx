import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Control, Controller } from "react-hook-form";
import { communityFormSchema } from "../schema";
import z from "zod";
import { Dropzone, DropzoneButton } from "@/components/ui/dropzone";
import Button from "@/components/ui/button";
import Trash from "@/components/icons/trash";
import { cn } from "@/lib/utils";
import { COMMUNITY_MEDIA_TYPES } from "../constants";
import { CommunityMediaType } from "../types";


type Props = {
    formControl: Control<z.infer<typeof communityFormSchema>>;
    banner?: File;
    avatar?: File;
    onFileError: (error: Error, type: CommunityMediaType) => void;
    onFileDelete: (type: CommunityMediaType) => void;
    onFileChange: (file: File, type: CommunityMediaType) => void;
    
}

export default function CommunityCreateStageTwo({ 
    formControl, 
    banner, 
    avatar,
    onFileError, 
    onFileDelete,
    onFileChange
    
}: Props) {
    return COMMUNITY_MEDIA_TYPES.map(type => (
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
                                        onFileChange(files[0], type);
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
