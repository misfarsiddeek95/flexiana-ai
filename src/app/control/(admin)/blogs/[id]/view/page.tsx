import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { notFound } from "next/navigation";
import { PERMISSIONS } from "@/lib/permissions";
import { getUserPermissions } from "@/lib/auth-helpers";
import { hasPermission } from "@/lib/permissions";
import { PermissionDenied } from "@/components/cms/PermissionDenied";

export default async function BlogViewPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Check view permission
    const userPermissions = await getUserPermissions();
    if (!hasPermission(userPermissions, PERMISSIONS.BLOGS.VIEW)) {
        return <PermissionDenied />;
    }

    const canEdit = hasPermission(userPermissions, PERMISSIONS.BLOGS.EDIT);

    const blog = await prisma.blog.findUnique({
        where: { id },
    });

    if (!blog) {
        notFound();
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/control/blogs"
                        className="rounded-full bg-white p-2 text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">View Blog Post</h1>
                </div>
                {canEdit && (
                    <Link
                        href={`/control/blogs/${blog.id}`}
                        className="flex items-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Blog
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column: Main Content */}
                <div className="space-y-8 lg:col-span-2">
                    {/* Basic Info Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Basic Information
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Title
                                </label>
                                <div className="mt-1 text-gray-900">{blog.title}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Slug
                                </label>
                                <div className="mt-1 text-gray-900">{blog.slug}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Subtitle
                                </label>
                                <div className="mt-1 text-gray-900">
                                    {blog.subtitle || "-"}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Status
                                </label>
                                <div className="mt-1">
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${blog.active
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {blog.active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Show in Home
                                </label>
                                <div className="mt-1">
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${blog.showInHome
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {blog.showInHome ? "Yes" : "No"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Content
                        </h2>
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
                        />
                    </div>
                </div>

                {/* Right Column: Sidebar Settings */}
                <div className="space-y-8">
                    {/* Publishing Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Publishing
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Author
                                </label>
                                <div className="mt-1 text-gray-900">{blog.author}</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Publish Date
                                </label>
                                <div className="mt-1 text-gray-900">
                                    {format(new Date(blog.publishDate), "PPP")}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Read Time
                                </label>
                                <div className="mt-1 text-gray-900">
                                    {blog.readTime || "-"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Media Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            Media
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Image URL
                                </label>
                                <div className="mt-1 break-all text-gray-900">
                                    {blog.imageUrl || "-"}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Image Alt
                                </label>
                                <div className="mt-1 text-gray-900">
                                    {blog.imageAlt || "-"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SEO & Tags */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 border-b pb-4">
                            SEO & Tags
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Tags
                                </label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {blog.tags ? (
                                        JSON.parse(blog.tags).map((tag: string, index: number) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                                            >
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">-</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Meta Description
                                </label>
                                <div className="mt-1 text-gray-900">
                                    {blog.metaDescription || "-"}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Meta Keywords
                                </label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {blog.metaKeywords ? (
                                        JSON.parse(blog.metaKeywords).map(
                                            (keyword: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                                                >
                                                    {keyword}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <span className="text-gray-500">-</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
