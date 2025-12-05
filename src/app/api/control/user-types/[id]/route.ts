import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { PERMISSIONS } from "@/lib/permissions";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth(PERMISSIONS.USER_TYPES.VIEW);
        const { id } = await params;
        const userType = await prisma.systemUserType.findUnique({
            where: { id },
        });
        if (!userType) {
            return NextResponse.json(
                { error: "User type not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(userType);
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
            { error: "Failed to fetch user type" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth(PERMISSIONS.USER_TYPES.EDIT);
        const { id } = await params;
        const data = await request.json();
        const userType = await prisma.systemUserType.update({
            where: { id },
            data: {
                name: data.name,
                permissions: data.permissions,
                active: data.active,
            },
        });
        return NextResponse.json(userType);
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
            { error: "Failed to update user type" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await requireAuth(PERMISSIONS.USER_TYPES.DELETE);
        const { id } = await params;

        // Check if user is trying to delete their own user type
        // @ts-ignore
        const currentUserId = session?.user?.id;
        if (currentUserId) {
            const currentUser = await prisma.systemUser.findUnique({
                where: { id: currentUserId },
                select: { userTypeId: true },
            });

            if (currentUser?.userTypeId === id) {
                return NextResponse.json(
                    { error: "You cannot delete your own user type" },
                    { status: 403 }
                );
            }
        }

        await prisma.systemUserType.delete({
            where: { id },
        });
        return NextResponse.json({ message: "User type deleted" });
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
            { error: "Failed to delete user type" },
            { status: 500 }
        );
    }
}
