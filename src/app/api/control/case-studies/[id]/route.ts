import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { PERMISSIONS } from "@/lib/permissions";
import { revalidatePath } from "next/cache";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth(PERMISSIONS.CASE_STUDIES.VIEW);
        const { id } = await params;
        const caseStudy = await prisma.caseStudy.findUnique({
            where: { id },
        });
        if (!caseStudy) {
            return NextResponse.json(
                { error: "Case study not found" },
                { status: 404 }
            );
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
        return NextResponse.json(
            { error: "Failed to fetch case study" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth(PERMISSIONS.CASE_STUDIES.EDIT);
        const { id } = await params;
        const body = await request.json();
        const caseStudy = await prisma.caseStudy.update({
            where: { id },
            data: body,
        });

        revalidatePath("/case-studies");
        revalidatePath(`/case-studies/${caseStudy.slug}`);
        if (caseStudy.showInHome) {
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
        console.error("Error updating case study:", error);
        return NextResponse.json(
            { error: `Failed to update case study: ${error.message}` },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth(PERMISSIONS.CASE_STUDIES.DELETE);
        const { id } = await params;
        const caseStudy = await prisma.caseStudy.delete({
            where: { id },
        });

        revalidatePath("/case-studies");
        revalidatePath(`/case-studies/${caseStudy.slug}`);
        if (caseStudy.showInHome) {
            revalidatePath("/");
        }

        return NextResponse.json({ message: "Case study deleted" });
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
            { error: "Failed to delete case study" },
            { status: 500 }
        );
    }
}
