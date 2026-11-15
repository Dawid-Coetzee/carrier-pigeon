import z from "zod";
import { MIN_NAME_LENGTH } from "../constants";

export const communityFormSchema = z.object({
    name: z
    .string()
    .min(MIN_NAME_LENGTH, `Please lengthen this text to ${MIN_NAME_LENGTH} characters or more.`),
    description: z
    .string(),
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
})