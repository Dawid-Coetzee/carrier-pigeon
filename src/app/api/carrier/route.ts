import { z } from "zod";
import { communityFormSchema } from "@/src/features/communities/schema";
import { db } from "@/src/lib/db";
import { getAuthSession } from "@/src/lib/auth";
import { supabaseAdmin } from "@/src/lib/supabase-admin";

const bucket = "carrier-images";

export async function POST(req: Request) {
    const uploadedPaths: string[] = [];

    try {
        const session = await getAuthSession();

        if (!session?.user?.id) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();

        const { name, description, category, banner, avatar } = 
            communityFormSchema.parse({
                name: formData.get("name"),
                description: formData.get("description"),
                category: formData.get("category"),
                banner: formData.get("banner") ?? undefined,
                avatar: formData.get("avatar") ?? undefined,
            });
        
        const existingCarrier = await db.carrier.findUnique({
            where: { name },
        });

        if (existingCarrier) {
            return Response.json(
                { error: "Carrier already exists" },
                { status: 409 },
            );
        }

        const folder = crypto.randomUUID();

        async function uploadImage(file: File | undefined, imageType: string) {
            if (!file || file.size === 0) {
                return null;
            }
            
            const path = `carriers/${folder}/${imageType}`

            const { data, error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(path, file, {
                contentType: file.type,
                upsert: false,
            });

            if (error) {
                throw error;
            }

            uploadedPaths.push(data.path)

            const { data: publicUrlData } = supabaseAdmin.storage
                .from(bucket)
                .getPublicUrl(data.path)

            return publicUrlData.publicUrl
        }

        const bannerUrl = await uploadImage(banner, "banner");
        const avatarUrl = await uploadImage(avatar, "avatar");

        const carrier = await db.carrier.create({
            data: {
                name,
                description,
                category,
                banner: bannerUrl,
                avatar: avatarUrl,
                creatorId: session.user.id,
            }
        });

        await db.subscription.create({
            data: {
                userId: session.user.id,
                carrierId: carrier.id
            },
        })

        return Response.json({ carrier }, { status: 201 })
    } catch (error) {
        if (uploadedPaths.length > 0) {
            const { error: cleanupError } = await supabaseAdmin.storage
                .from(bucket)
                .remove(uploadedPaths);

            if (cleanupError) {
                console.error("Could not clean up uploaded carrier images:", cleanupError)
            }
        }

        if (error instanceof z.ZodError) {
            return Response.json({ error: "Invalid form data" }, { status: 400 });
        }

        console.error("Could not create carrier:", error);

        return Response.json(
            { error: "Could not create carrier" },
            { status: 500 },
        );
    }
}