import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { requireAuth } from "@/lib/auth-helpers";
import { PERMISSIONS } from "@/lib/permissions";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth(PERMISSIONS.USERS.EDIT);
        const { id } = await params;
        const body = await request.json();
        const { name, email, password, userTypeId, active } = body;

        const data: any = {
            name,
            email,
            userTypeId,
            active,
        };

        if (password) {
            data.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.systemUser.update({
            where: { id },
            data,
        });

        return NextResponse.json(user);
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
            { error: "Failed to update user" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth(PERMISSIONS.USERS.DELETE);
        const { id } = await params;

        const session = await requireAuth();
        // @ts-ignore
        if (session?.user?.id === id) {
            return NextResponse.json(
                { error: "You cannot delete your own account" },
                { status: 403 }
            );
        }

        await prisma.systemUser.delete({
            where: { id },
        });
        return NextResponse.json({ message: "User deleted" });
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
            { error: "Failed to delete user" },
            { status: 500 }
        );
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth(PERMISSIONS.USERS.VIEW);
        const { id } = await params;
        const user = await prisma.systemUser.findUnique({
            where: { id },
            include: { userType: true },
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
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
            { error: "Failed to fetch user" },
            { status: 500 }
        );
    }
}
