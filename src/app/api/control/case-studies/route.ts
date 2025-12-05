import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { PERMISSIONS } from "@/lib/permissions";
import { revalidatePath } from "next/cache";

export async function GET() {
    try {
        await requireAuth(PERMISSIONS.CASE_STUDIES.VIEW);

        const caseStudies = await prisma.caseStudy.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(caseStudies);
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error.message === "Forbidden") {
            return NextResponse.json(
                { error: "Forbidden: Insufficient permissions" },
                { status: 403 }
            );
        }
        return NextResponse.json(
            { error: "Failed to fetch case studies" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await requireAuth(PERMISSIONS.CASE_STUDIES.CREATE);

        const body = await request.json();

        // Sanitize payload
        const payload = {
            ...body,
            heroImage: body.heroImage || "",
            heroImageAlt: body.heroImageAlt || "",
            heroVideo: body.heroVideo || "",
            metaDescription: body.metaDescription || "",
            carouselData: body.carouselData || "",
        };

        const caseStudy = await prisma.caseStudy.create({
            data: payload,
        });

        revalidatePath("/case-studies");
        if (payload.showInHome) {
            revalidatePath("/");
        }

        return NextResponse.json(caseStudy);
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error.message === "Forbidden") {
            return NextResponse.json(
                { error: "Forbidden: Insufficient permissions" },
                { status: 403 }
            );
        }
        console.error("Error creating case study:", error);
        return NextResponse.json(
            { error: `Failed to create case study: ${error.message}` },
            { status: 500 }
        );
    }
}
