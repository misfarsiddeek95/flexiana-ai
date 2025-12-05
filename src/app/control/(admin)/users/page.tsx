import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Edit } from "lucide-react";
import { DeleteButton } from "@/components/cms/DeleteButton";
import { ViewButton } from "@/components/cms/ViewButton";
import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";

export default async function UsersPage() {
    const users = await prisma.systemUser.findMany({
        include: {
            userType: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Get current user's permissions server-side
    const userPermissions = await getUserPermissions();
    const canCreate = hasPermission(userPermissions, PERMISSIONS.USERS.CREATE);
    const canEdit = hasPermission(userPermissions, PERMISSIONS.USERS.EDIT);
    const canDelete = hasPermission(userPermissions, PERMISSIONS.USERS.DELETE);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">System Users</h1>
                {canCreate && (
                    <Link
                        href="/control/users/new"
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Add New User
                    </Link>
                )}
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Type
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {/* @ts-ignore - Prisma infers types automatically */}
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {user.name}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {user.email}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {user.userType.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${user.active
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {user.active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex justify-end gap-4">
                                        <ViewButton href={`/control/users/${user.id}/view`} />
                                        {canEdit && (
                                            <Link
                                                href={`/control/users/${user.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        )}
                                        {canDelete && (
                                            <DeleteButton
                                                id={user.id}
                                                endpoint="/api/control/users"
                                                itemType="user"
                                            />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
