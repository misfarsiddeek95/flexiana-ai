import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { DeleteButton } from "@/components/cms/DeleteButton";
import { ViewButton } from "@/components/cms/ViewButton";

import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";

export default async function BlogsPage() {
    const blogs = await prisma.blog.findMany({
        orderBy: {
            publishDate: "desc",
        },
    });

    // Get current user's permissions server-side
    const userPermissions = await getUserPermissions();
    const canCreate = hasPermission(userPermissions, PERMISSIONS.BLOGS.CREATE);
    const canEdit = hasPermission(userPermissions, PERMISSIONS.BLOGS.EDIT);
    const canDelete = hasPermission(userPermissions, PERMISSIONS.BLOGS.DELETE);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
                {canCreate && (
                    <Link
                        href="/control/blogs/new"
                        className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create New
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
                                Title
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Author
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Publish Date
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Show in Home
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
                        {blogs.map((blog) => (
                            <tr key={blog.id}>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {blog.title}
                                    </div>
                                    <div className="text-sm text-gray-500">{blog.slug}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {blog.author}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {format(new Date(blog.publishDate), "MMM d, yyyy")}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${blog.active
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {blog.active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {blog.showInHome ? (
                                        <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                                            Yes
                                        </span>
                                    ) : (
                                        <span className="text-sm text-gray-500">No</span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex justify-end">
                                        <ViewButton href={`/control/blogs/${blog.id}/view`} />
                                        {canEdit && (
                                            <Link
                                                href={`/control/blogs/${blog.id}`}
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        )}
                                        {canDelete && (
                                            <DeleteButton
                                                id={blog.id}
                                                endpoint="/api/control/blogs"
                                                itemType="blog"
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
