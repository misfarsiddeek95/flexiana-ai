import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { PERMISSIONS } from "@/lib/permissions";
import { revalidatePath } from "next/cache";

export async function GET() {
    try {
        await requireAuth(PERMISSIONS.BLOGS.VIEW);

        const blogs = await prisma.blog.findMany({
            orderBy: { publishDate: "desc" },
        });
        return NextResponse.json(blogs);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === "Unauthorized") {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            if (error.message === "Forbidden") {
                return NextResponse.json(
                    { error: "Forbidden: Insufficient permissions" },
                    { status: 403 }
                );
            }
        }
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await requireAuth(PERMISSIONS.BLOGS.CREATE);

        const body = await request.json();

        // Sanitize payload
        const payload = {
            ...body,
            publishDate: new Date(body.publishDate),
            imageUrl: body.imageUrl || "",
            imageAlt: body.imageAlt || "",
            readTime: body.readTime || "5 min read", // Default if missing
        };

        // If this blog is set to show in home, unset others
        if (payload.showInHome) {
            await prisma.blog.updateMany({
                where: { showInHome: true },
                data: { showInHome: false },
            });
        }

        const blog = await prisma.blog.create({
            data: payload,
        });

        revalidatePath("/blog");
        if (payload.showInHome) {
            revalidatePath("/");
        }

        return NextResponse.json(blog);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === "Unauthorized") {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            if (error.message === "Forbidden") {
                return NextResponse.json(
                    { error: "Forbidden: Insufficient permissions" },
                    { status: 403 }
                );
            }
            console.error("Error creating blog:", error);
            return NextResponse.json({ error: `Failed to create blog: ${error.message}` }, { status: 500 });
        }
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}
