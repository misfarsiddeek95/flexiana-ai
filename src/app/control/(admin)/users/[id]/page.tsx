import { prisma } from "@/lib/prisma";
import { UserForm } from "@/components/cms/UserForm";
import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";
import { PermissionDenied } from "@/components/cms/PermissionDenied";

export default async function UserEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const isNew = id === "new";

    // Check permissions
    const userPermissions = await getUserPermissions();
    if (isNew) {
        if (!hasPermission(userPermissions, PERMISSIONS.USERS.CREATE)) {
            return <PermissionDenied />;
        }
    } else {
        if (!hasPermission(userPermissions, PERMISSIONS.USERS.EDIT)) {
            return <PermissionDenied />;
        }
    }

    let user = null;
    if (!isNew) {
        user = await prisma.systemUser.findUnique({
            where: { id },
        });
    }

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
                {isNew ? "Create New User" : "Edit User"}
            </h1>
            <UserForm initialData={user} isNew={isNew} />
        </div>
    );
}
