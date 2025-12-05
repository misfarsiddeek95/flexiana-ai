"use client";

import { useSession } from "next-auth/react";
import { hasPermission } from "@/lib/permissions";

interface PermissionGateProps {
    permission: string | string[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

/**
 * Component that only renders children if user has required permission
 * Use this to hide UI elements that require specific permissions
 */
export function PermissionGate({ permission, children, fallback = null }: PermissionGateProps) {
    const { data: session } = useSession();
    const userPermissions = (session?.user as any)?.permissions || [];

    if (!hasPermission(userPermissions, permission)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
