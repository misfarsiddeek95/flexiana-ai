import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { notFound } from "next/navigation";

import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";
import { PermissionDenied } from "@/components/cms/PermissionDenied";

export default async function UserTypeViewPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Check view permission
    const userPermissions = await getUserPermissions();
    if (!hasPermission(userPermissions, PERMISSIONS.USER_TYPES.VIEW)) {
        return <PermissionDenied />;
    }

    const canEdit = hasPermission(userPermissions, PERMISSIONS.USER_TYPES.EDIT);

    const userType = await prisma.systemUserType.findUnique({
        where: { id },
    });

    if (!userType) {
        notFound();
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/control/user-types"
                        className="rounded-full bg-white p-2 text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">View User Type</h1>
                </div>
                {canEdit && (
                    <Link
                        href={`/control/user-types/${userType.id}`}
                        className="flex items-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User Type
                    </Link>
                )}
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                    User Type Details
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">
                            Name
                        </label>
                        <div className="mt-1 text-gray-900">{userType.name}</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500">
                            Status
                        </label>
                        <div className="mt-1">
                            <span
                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${userType.active
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {userType.active ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
