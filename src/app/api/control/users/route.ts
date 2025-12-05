import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { requireAuth } from "@/lib/auth-helpers";
import { PERMISSIONS } from "@/lib/permissions";

export async function GET() {
    try {
        await requireAuth(PERMISSIONS.USERS.VIEW);

        const users = await prisma.systemUser.findMany({
            include: {
                userType: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(users);
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
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await requireAuth(PERMISSIONS.USERS.CREATE);

        const body = await request.json();
        const { name, email, password, userTypeId, active } = body;

        const existingUser = await prisma.systemUser.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.systemUser.create({
            data: {
                name,
                email,
                password: hashedPassword,
                userTypeId,
                active: active ?? true,
            },
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
            { error: "Failed to create user" },
            { status: 500 }
        );
    }
}
