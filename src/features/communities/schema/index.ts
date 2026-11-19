import z from "zod";
import { MAX_NAME_LENGTH, MIN_DESCRIPTION_LENGTH, MIN_NAME_LENGTH } from "../constants";

export const communityFormSchema = z.object({
    name: z
    .string()
    .min(MIN_NAME_LENGTH, `Community names should be between 3-21 characters.`)
    .max(MAX_NAME_LENGTH, `Community names should be between 3-21 characters.`)
    .regex(/^[A-Za-z0-9_]+$/, "Community names can only contain letters, numbers or underscores."),
    description: z
    .string()
    .min(MIN_DESCRIPTION_LENGTH, "Communities should have a description.")
    ,
    banner: z
        .file({error: "Invalid value"})
        .mime([
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/svg+xml"
        ], { error: "Invalid MIME type" })
        .optional(),
    avatar: z
        .file({error: "Invalid value"})
        .mime([
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/svg+xml"
        ], { error: "Invalid MIME type" })
        .optional(),
    category: z.string().min(1),
})