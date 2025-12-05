import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { PERMISSIONS } from "@/lib/permissions";

export async function GET() {
    try {
        await requireAuth(PERMISSIONS.USER_TYPES.VIEW);

        const userTypes = await prisma.systemUserType.findMany();
        return NextResponse.json(userTypes);
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
            { error: "Failed to fetch user types" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await requireAuth(PERMISSIONS.USER_TYPES.CREATE);

        const data = await request.json();
        const userType = await prisma.systemUserType.create({
            data: {
                name: data.name,
                permissions: data.permissions || "[]",
                active: data.active ?? true,
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
            { error: "Failed to create user type" },
            { status: 500 }
        );
    }
}
