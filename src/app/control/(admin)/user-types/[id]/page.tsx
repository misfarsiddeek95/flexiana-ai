import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserTypeForm } from "@/components/cms/UserTypeForm";
import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";
import { PermissionDenied } from "@/components/cms/PermissionDenied";

export default async function EditUserTypePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Check edit permission
    const userPermissions = await getUserPermissions();
    if (!hasPermission(userPermissions, PERMISSIONS.USER_TYPES.EDIT)) {
        return <PermissionDenied />;
    }

    const userType = await prisma.systemUserType.findUnique({
        where: { id },
    });

    if (!userType) {
        notFound();
    }

    return (
        <div>
            <div className="mb-6">
                <Link
                    href="/control/user-types"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to User Types
                </Link>
            </div>

            <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Edit User Type
            </h1>

            <UserTypeForm initialData={userType} />
        </div>
    );
}
