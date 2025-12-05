import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserTypeForm } from "@/components/cms/UserTypeForm";
import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";
import { PermissionDenied } from "@/components/cms/PermissionDenied";

export default async function NewUserTypePage() {
    // Check create permission
    const userPermissions = await getUserPermissions();
    if (!hasPermission(userPermissions, PERMISSIONS.USER_TYPES.CREATE)) {
        return <PermissionDenied />;
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
                Create New User Type
            </h1>

            <UserTypeForm />
        </div>
    );
}
