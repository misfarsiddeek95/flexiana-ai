import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Get user permissions from session - fetches fresh from database
 */
export async function getUserPermissions(): Promise<string[]> {
    const session = await getServerSession(authOptions);
    if (!session) return [];

    // Fetch fresh permissions from database in real-time
    const userId = (session.user as any)?.id;
    if (!userId) return [];

    const user = await prisma.systemUser.findUnique({
        where: { id: userId },
        include: { userType: true },
    });

    if (!user) return [];

    return JSON.parse(user.userType.permissions || "[]");
}

/**
 * Check if current user has required permission
 * Throws error if unauthorized
 * Fetches fresh permissions from database for real-time updates
 */
export async function requireAuth(permission?: string | string[]) {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized");
    }

    if (permission) {
        // Fetch fresh permissions from database instead of using cached session
        const userPermissions = await getUserPermissions();
        const required = Array.isArray(permission) ? permission : [permission];

        const hasPermission = required.some(perm => userPermissions.includes(perm));

        if (!hasPermission) {
            throw new Error("Forbidden");
        }
    }

    return session;
}

/**
 * Wrap API handler with auth check
 */
export function withAuth(
    handler: (req: Request, context?: any) => Promise<Response>,
    permission?: string | string[]
) {
    return async (req: Request, context?: any) => {
        try {
            await requireAuth(permission);
            return handler(req, context);
        } catch (error: any) {
            if (error.message === "Unauthorized") {
                return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 401 }
                );
            }
            if (error.message === "Forbidden") {
                return NextResponse.json(
                    { error: "Forbidden: Insufficient permissions" },
                    { status: 403 }
                );
            }
            throw error;
        }
    };
}
